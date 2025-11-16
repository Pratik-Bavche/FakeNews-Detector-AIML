📰 Fake News Detection Using Machine Learning & NLP

This project focuses on identifying fake and real news articles using Natural Language Processing (NLP) and Machine Learning (ML) techniques.
The system analyzes the text content of a news headline or full article and predicts whether it is REAL or FAKE.

After training the model on multiple datasets, the final machine learning model is deployed using a Flask web application, allowing users to test any news headline or article through a simple browser interface.

🚀 Project Overview

The goal of this project is to build a reliable fake-news classifier using:

Text preprocessing

NLP feature extraction (Bag-of-Words, TF-IDF)

Machine Learning classification

Web deployment using Flask

The model is trained using multiple publicly available news datasets containing both real and fake articles. After development and evaluation, the trained model is exported as a model.pkl file using Joblib and integrated into the Flask application.

The web interface allows users to:

✔ Enter news text manually
✔ Provide voice input (convert speech to text)
✔ Upload an image containing a news headline (OCR extraction)
✔ Get a prediction: Real News or Fake News

🔧 Features
✔ Text Preprocessing

Before training, the following cleaning steps are applied:

Convert to lowercase

Remove URLs

Remove punctuation

Remove HTML tags

Remove numbers

Remove special characters

Remove unnecessary whitespace

Normalize text for ML processing

✔ Machine Learning Pipeline

The model uses:

CountVectorizer (Bag-of-Words)

TF-IDF Transformer

Logistic Regression classifier

✔ Saving the Model

The trained model is stored using:

joblib.dump(model, "model.pkl")


This file is later loaded by the Flask application for real-time predictions.

📦 Required Python Libraries

Install these packages before running the project:

pip install sklearn
pip install numpy
pip install pandas
pip install matplotlib
pip install seaborn
pip install nltk
pip install joblib
pip install flask

📁 Project Structure
Fake-News-Detection/
│
├── app.py                 # Flask application
├── model.pkl              # Trained ML model
├── index.html             # Web interface
├── static/                # (optional) CSS or JS files
└── datasets/              # Training datasets (not included in repo)

🧠 Model Training (Summary)

Model training was performed in a Jupyter Notebook (.ipynb file).
Multiple datasets were combined, cleaned, and used to train the classifier.

Although the model is not guaranteed to be 100% accurate, it performs well and produces reliable predictions based on the training data.

▶️ How to Run the Project
1. Open the project folder in your system
cd Fake-News-Detection

2. Run the Flask app
python app.py

3. Open browser

Go to:

http://localhost:5000/


You can now:

Enter text manually

Speak and convert to text

Upload images containing news text

Get REAL/FAKE prediction instantly
