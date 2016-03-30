"""
Flask Backend for Wish List Application
Justen Morgan - 620070138
"""
import os
from app import app, db
from datetime import *
from flask import render_template, request, redirect, url_for,jsonify,session,send_file

from app.models import User, Wish, Token

import json
import time
import requests
import BeautifulSoup
import bcrypt
import urlparse
import urllib

#Landing page
@app.route('/')
def index():
    """Render website's home page."""
    return app.send_static_file('index.html')
    
#Sign up page
@app.route('/signup', methods=['POST'])
def signup():
    json_data = json.loads(request.data)
    user = User(json_data.get('firstname'), json_data.get('lastname'), json_data.get('username'),bcrypt.hashpw(json_data.get('password').encode('utf-8'), bcrypt.gensalt()),json_data.get('email'),datetime.now())
    print user
    if user:
        db.session.add(user)
        db.session.commit()
        response = jsonify({'firstname':json_data.get('firstname'),'lastname':json_data.get('lastname'),'username':json_data.get('username'),'email':json_data.get('email')})
    else:   
        response = jsonify({'status':'not signed up'})
    return response

#Log in page for a registered user
@app.route('/login', methods=["POST"])
def login():
    json_data = json.loads(request.data)
    user = db.session.query(User).filter_by(username=json_data['username']).first()
    if user and user.password == bcrypt.hashpw(json_data.get('password').encode('utf-8'), user.password.decode().encode('utf-8')):
        token = Token(user.id)
        db.session.add(token)
        db.session.commit()
        response = jsonify({'id':user.id,'username':json_data.get('username'),'token':token.token,'status':'logged'})
    else:
        response = jsonify({'status':'not logged'})
    return response

#Log out a user
@app.route('/logout',methods=["POST"])
def logout():
    json_data = json.loads(request.data)
    token = db.session.query(Token).filter_by(token=json_data['token']).first()
    if token:
        db.session.delete(token)
        db.session.commit()
        response = jsonify({'status':'logged out'})
    else:
        response = jsonify({'status':'did not log out'})
    return response
    
#View a registered user page
@app.route('/user/<userid>',methods=["POST"])
def user(userid):
    user = db.session.query(User).filter_by(id=userid).first()
    if user:
        response = jsonify({'id':user.id,'firstname':user.first_name,'lastname':user.last_name,'username':user.username,'email':user.email,'addon':timeinfo(user.addon)})
    else:
        response = jsonify({'status':'did not retrieve user'})
    return response
    
#View all users page
@app.route('/users',methods=["POST"])
def users():
    users = db.session.query(User).all()
    userlist=[]
    for user in users:
        userlist.append({'id':user.id,'firstname':user.first_name,'lastname':user.last_name,'username':user.username,'email':user.email})
    response = jsonify(users=userlist)
    return response

#New Wish
@app.route('/wish/<userid>',methods=["POST"])
def new_wish(userid):
    user = db.session.query(User).filter_by(id=userid).first()
    json_data = json.loads(request.data)
    wish = Wish(user.id,json_data.get('url'),json_data.get('title'),json_data.get('description'),json_data.get('status'),datetime.now())
    if wish:
        db.session.add(wish)
        db.session.commit()
        response = jsonify({'userid':userid,'url':json_data.get('url'),'title':json_data.get('title'),'description':json_data.get('description')})
    else:
        response = jsonify({'status':'did not create wish'})
    return response
    
#View all wishes by a user
@app.route('/wishes/<userid>',methods=["POST"])
def wishes(userid):
    user = db.session.query(User).filter_by(id=userid).first()
    wishes = db.session.query(Wish).filter_by(userid=user.id).all()
    wishlist = []
    for wish in wishes:
        wishlist.append({'name':wish.name,'url':wish.url,'description':wish.description,'status':wish.status,'addon':timeinfo(wish.addon)})
    response = jsonify(wishes=wishlist)
    return response

#Used in image search on new wishes
@app.route('/api/thumbnail/process', methods=['POST'])
def get_images():
    json_data = json.loads(request.data)
    url = json_data.get('url')
    soup = BeautifulSoup.BeautifulSoup(requests.get(url).text)
    images = BeautifulSoup.BeautifulSoup(requests.get(url).text).findAll("img")
    urllist = []
    og_image = (soup.find('meta', property='og:image') or soup.find('meta', attrs={'name': 'og:image'}))
    if og_image and og_image['content']:
        urllist.append(urlparse.urljoin(url, og_image['content']))
    thumbnail_spec = soup.find('link', rel='image_src')
    if thumbnail_spec and thumbnail_spec['href']:
        urllist.append(urlparse.urljoin(url, thumbnail_spec['href']))
    for image in images:
        if "sprite" not in image["src"]:
            urllist.append(urlparse.urljoin(url, image["src"]))
    print urllist
    if(len(urllist)>0):
        response = jsonify({'error':'null', "data":{"thumbnails":urllist},"message":"Success"})
    else:
        response = jsonify({'error':'1','data':{},'message':'Unable to extract thumbnails'})
    return response
            
#Used for time added on items
def timeinfo(entry):
    day = time.strftime("%a")
    date = time.strftime("%d")
    if (date <10):
        date = date.lstrip('0')
    month = time.strftime("%b")
    year = time.strftime("%Y")
    return day + ", " + date + " " + month + " " + year

#Runs application
if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0",port="8888")