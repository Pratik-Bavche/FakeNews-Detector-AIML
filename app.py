from flask import Flask, render_template, request
import joblib
import re
import string
import pandas as pd
import os

app = Flask(__name__)   #initialize Flask app // __name__ represents where is the webpage related files are stored

BASE_DIR = os.path.dirname(os.path.abspath(__file__))       #get current directory path
model_path = os.path.join(BASE_DIR, "model.pkl")            #combine current directory path with model file name

print("Full Path:", model_path)

#Load the model
try:
    Model = joblib.load(model_path)
    print("Model loaded successfully!")
except Exception as e:
    print("Error loading model:", e)