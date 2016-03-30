from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://project2:project2@localhost/projectdb"
#app.config['SQLALCHEMY_DATABASE_URI'] = 
db = SQLAlchemy(app)
db.create_all()

from app import views,models