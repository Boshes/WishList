"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/

This file creates your application.
"""
import os
from app import app, db
from datetime import *
from flask import render_template, request, redirect, url_for,jsonify,session,send_file

from app.models import User, Wish

from werkzeug import secure_filename
import json
import time
import requests
import BeautifulSoup
import bcrypt
import urlparse
    
###
# Routing for your application.
###

#Landing page
@app.route('/')
def index():
    """Render website's home page."""
    return app.send_static_file('index.html')
    
#Sign up page
@app.route('/signup', methods=['POST'])
def signup():
    json_data = json.loads(request.data)
    uploadedfile = json_data.get('filepath')
    #get this working
    if uploadedfile:
        uploadedfilename = json_data.get('username') + '_' + secure_filename(uploadedfile.filename)
        filepath = os.path.join(os.getcwd() + '/app/static/useruploads/',uploadedfilename)
        uploadedfile.save(filepath)
    else:
        uploadedfilename = '/app/static/img/octocat.png'
    user = User(uploadedfilename,json_data.get('firstname'), json_data.get('lastname'), json_data.get('username'),bcrypt.hashpw(json_data.get('password').encode('utf-8'), bcrypt.gensalt()),json_data.get('email'),datetime.now())
    try:
        db.session.add(user)
        db.session.commit()
        status = "success"
    except:
        status = "This user already exists"
    return jsonify({'result':status})

#Log in page for a registered user
@app.route('/login', methods=["POST"])
def login():
    json_data = json.loads(request.data)
    user = User.query.filter_by(username=json_data['username']).first()
    print user
    if user and user.password == bcrypt.hashpw(json_data.get('username').encode('utf-8'), user.password.decode().encode('utf-8')):
        session['user'] = user.username
        status = True
    else:
        status = False
    print status
    return jsonify({'logged in': status})

#Log out a user
@app.route('/logout')
def logout():
    session.pop('logged_in',None)
    return jsonify({'success': 'logged out'})
    
#View a registered user page
@app.route('/user/<id>',methods=["GET","POST"])
def user(id):
    user = User.query.filter_by(id=id).first()
    image = '/static/useruploads/' + user.image
    if request.method == 'POST' or ('Content-Type' in request.headers and request.headers['Content-Type'] == 'application/json'):
        return jsonify(id=user.id, image=user.image,firstname = user.first_name, lastname = user.last_name, username=user.username, email = user.email,addon=user.addon)
    else:
        user = {'id':user.id,'image':user.image, 'firstname':user.first_name, 'lastname': user.last_name, 'username':user.username,'email': user.email,'addon':timeinfo(user.addon)}
        return render_template('userview.html', user=user)

#View all users page
@app.route('/users',methods=["POST","GET"])
def users():
    users = db.session.query(User).all()
    if request.method == "POST" or ('Content-Type' in request.headers and request.headers['Content-Type'] == 'application/json'):
        userlist=[]
        for user in users:
            userlist.append({'id':user.id,'username':user.username})
        return jsonify(users=userlist)
    else:
        return render_template('users.html', users=users)



@app.route('/wish/<id>',methods=["POST"])
def new_wish(id):
    json_data = json.loads(request.data)
    if request.method == 'POST':
        uploadedfile = request.files['thumbnail']
        if uploadedfile:
            uploadedfilename = '_' + secure_filename(uploadedfile.filename)
            filepath = os.path.join(os.getcwd() + '/app/static/wishuploads/',uploadedfilename)
            uploadedfile.save(filepath)
        elif not uploadedfile and form.url.data!="":
            return images(get_images(form.url.data))
            uploadedfilename = '_' + secure_filename(uploadedfile.filename)
            filepath = os.path.join(os.getcwd() + '/app/static/wishuploads/', uploadedfilename)
            uploadedfile.save(filepath)
        else:
            uploadedfile = ""
        wish = Wish(1,uploadedfilename,json_data.get('title'), json_data.get('description'),json_data.get('status'),datetime.now())
        db.session.add(wish)
        db.session.commit()
        # return images(get_images(form.url.data))
    else:
        return render_template('wishadd.html',form=form)
    
@app.route('/wishes/',methods=["POST","GET"])
def wishes():
    wishes = db.session.query(Wish).all()
    if request.method == "POST" or ('Content-Type' in request.headers and request.headers['Content-Type'] == 'application/json'):
        wishlist=[{'id':user.id}]
        for wish in wishes:
            wishlist.append({'title':wish.name,'description':wish.description})
        return jsonify(wishes=wishlist)
    else:
        return render_template('wishes.html', wishes=wishes)        

@app.route('/images', methods=['POST'])
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
    return jsonify(imagelist=urllist)
            





def timeinfo(entry):
    day = time.strftime("%a")
    date = time.strftime("%d")
    if (date <10):
        date = date.lstrip('0')
    month = time.strftime("%b")
    year = time.strftime("%Y")
    return day + ", " + date + " " + month + " " + year
###
# The functions below should be applicable to all Flask apps.
###
# @app.after_request
# def add_header(response):
#     """
#     Add headers to both force latest IE rendering engine or Chrome Frame,
#     and also to cache the rendered page for 10 minutes.
#     """
#     response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
#     response.headers['Cache-Control'] = 'public, max-age=600'
#     return response

@app.route('/status')
def status():
    if session.get('logged_in'):
        if session['logged_in']:
            return jsonify({'status': True})
    else:
        return jsonify({'status': False})

# @app.errorhandler(404)
# def page_not_found(error):
#     """Custom 404 page."""
#     return app.send_static_file('static/templates/404.html'), 404


if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0",port="8888")
