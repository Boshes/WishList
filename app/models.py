from . import db  
import random
class User(db.Model):     
    __tablename__ = 'persons'
    id = db.Column(db.Integer, primary_key=True)  
    first_name = db.Column(db.String(80))     
    last_name = db.Column(db.String(80))
    username = db.Column(db.String(80), unique=True)    
    password = db.Column(db.String(255), unique=True)
    email = db.Column(db.String(120), unique=True)
    addon = db.Column(db.DateTime,nullable=False)
    wishes = db.relationship('Wish',backref='user',lazy='dynamic')
    tokens = db.relationship('Token',backref='user',lazy='dynamic')
    
    def __init__(self,first_name,last_name,username,password,email,addon):
        self.first_name = first_name
        self.last_name = last_name
        self.username = username
        self.password = password
        self.email = email
        self.addon = addon
        
    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        try:
            return unicode(self.id)  # python 2 support
        except NameError:
            return str(self.id)  # python 3 support

    def __repr__(self):
        return '<User %r>' % (self.username)

class Wish(db.Model):
    __tablename__ = 'wishes'
    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey('persons.id'))
    url = db.Column(db.String(255))
    thumbnail = db.Column(db.String(255))
    name = db.Column(db.String(255))
    description = db.Column(db.String(255))
    addon = db.Column(db.DateTime,nullable=False)
    
    
    def __init__(self,userid,url,thumbnail,name,description,addon):
        self.userid = userid
        self.url = url
        self.thumbnail = thumbnail
        self.name = name
        self.description = description
        self.addon = addon
    
    def get_id(self):
        try:
            return unicode(self.id)  # python 2 support
        except NameError:
            return str(self.id)  # python 3 support

    def __repr__(self):
        return '<Wish %r>' % (self.name)
        
class Token(db.Model):
    __tablename__ = 'tokens'
    userid = db.Column(db.Integer, db.ForeignKey('persons.id'))
    token = db.Column(db.String(255), primary_key=True)
    
    def __init__(self,userid):
        self.userid = userid
        tokens = db.session.query(Token).all()
        tokens = map(lambda x:x.token,tokens)
        token = tokenGenerate()
        while token in tokens:
            token = tokenGenerate()
        self.token = token

def tokenGenerate():
    return ''.join(random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') for i in range (16))
    
    