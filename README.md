# 📰 Fake News Detection Using Machine Learning & NLP

This project is designed to detect Fake News using Natural Language Processing (NLP) and Machine Learning techniques.
By analyzing the text content of news headlines or articles, the system predicts whether a news piece is REAL or FAKE.

Once the model is trained, it is deployed using a Flask web application, providing a clean and simple interface for testing news content.

# 🚀 Project Overview

The Fake News Detection system uses machine learning models trained on multiple real and fake news datasets.
The goal is to:

Apply NLP preprocessing
Train a reliable ML classifier
Save the trained model
Deploy it using Flask
Allow users to test news using text, voice input, or image-based headlines

The final ML model is saved as model.pkl and used by the Flask application to perform real-time predictions.

# 🔧 Features
✔ Text Preprocessing

Before training, the text data undergoes multiple cleaning steps:
Lowercasing
Removing URLs
Removing HTML tags
Removing punctuation
Removing numbers
Removing special characters
Removing extra whitespace

✔ Machine Learning Pipeline
The fake news classifier uses:
CountVectorizer (Bag-of-Words)
TF-IDF Transformer (feature weighting)
Logistic Regression (classification model)

✔ Model Saving

The trained model is saved to a .pkl file:
joblib.dump(model, "model.pkl")
This file is loaded in the Flask app for prediction.

✔ Web App Functionalities
Text input for prediction
Voice input (speech-to-text)
Image upload (OCR-based headline extraction)

Displays final prediction: Real News or Fake News

# 📦 Required Python Libraries

Install all required packages:

pip install sklearn
pip install numpy
pip install pandas
pip install matplotlib
pip install seaborn
pip install nltk
pip install joblib
pip install flask

# 📁 Project Structure
Fake-News-Detection/
│
├── app.py                 # Flask application file
├── model.pkl              # Trained Machine Learning model
├── index.html             # Web page interface
├── static/                # (Optional) images/CSS/JS files
└── datasets/              # Datasets used for training (not included here)

# 🧠 Model Training

Model training was done using a Jupyter Notebook (modeltrainpratik.ipynb file).
Multiple datasets (real + fake news) were combined and preprocessed before training.
Although the model may not provide 100% accuracy, it performs well on general text inputs and responds correctly in most cases.

# ▶️ How to Run the Project
1. Open a terminal inside the project folder:
cd Fake-News-Detection

2. Run the Flask server:
python app.py

3. Open the application in your browser:
http://localhost:5000/

