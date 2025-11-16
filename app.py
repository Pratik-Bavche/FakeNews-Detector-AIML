from flask import Flask, render_template, request
import joblib
import re
import string
import pandas as pd
import os

app = Flask(__name__)   #initialize Flask app // __name__ represents where is the webpage related files are stored

#Set Model Path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))       #get current directory path
model_path = os.path.join(BASE_DIR, "model.pkl")            #combine current directory path with model file name

print("Full Path:", model_path)

#Load the model
try:
    Model = joblib.load(model_path)
    print("Model loaded successfully!")
except Exception as e:
    print("Error loading model:", e)


# convert to lowercase # remove URLs # remove punctuation # remove HTML tags # remove numbers # remove special characters
def wordpre(text):
    text = text.lower()
    text = re.sub(r'\[.*?\]', '', text)
    text = re.sub(r"https?://\S+|www\.\S+", "", text)
    text = re.sub('<.*?>+', '', text)
    text = re.sub("[%s]" % re.escape(string.punctuation), " ", text)
    text = re.sub("\n", " ", text)
    text = re.sub(r"\w*\d\w*", "", text)
    return text