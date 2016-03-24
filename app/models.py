from . import db  
class User(db.Model):     
    __tablename__ = 'persons'
    id = db.Column(db.Integer, primary_key=True)  
    image = db.Column(db.String(255))
    first_name = db.Column(db.String(80))     
    last_name = db.Column(db.String(80))
    username = db.Column(db.String(80), unique=True)    
    password = db.Column(db.String(255), unique=True)
    email = db.Column(db.String(120), unique=True)
    addon = db.Column(db.DateTime,nullable=False)
    wishes = db.relationship('Wish',backref='user',lazy='dynamic')
    
    def __init__(self,image,first_name,last_name,username,password,email,addon):
        self.image = image
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
    image = db.Column(db.String(255))
    name = db.Column(db.String(255))
    description = db.Column(db.String(255))
    status = db.Column(db.Boolean)
    addon = db.Column(db.DateTime,nullable=False)
    
    
    def __init__(self,userid,image,name,description,status,addon):
        self.userid = userid
        self.image = image
        self.name = name
        self.description = description
        self.status = status
        self.addon = addon
    
    def get_id(self):
        try:
            return unicode(self.id)  # python 2 support
        except NameError:
            return str(self.id)  # python 3 support

    def __repr__(self):
        return '<Wish %r>' % (self.name)
    
    