from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://project2:project2@localhost/projectdb"
# app.config['SQLALCHEMY_DATABASE_URI'] = "postgres://qvufzfhjnrzrne:PWKGvd6x1FghXkr90I4MXo3kUG@ec2-54-225-112-119.compute-1.amazonaws.com:5432/d4fgu381smcp9t"
db = SQLAlchemy(app)
db.create_all()

from app import views,models