from django.db import models

import pickle
import os

# Define the path to the model pickle file
model_file_path = os.path.join(os.path.dirname(__file__), 'model_with_vectorizer_and_encoder.pkl')

# Load the model, vectorizer, and label encoder from the pickle file
with open(model_file_path, 'rb') as f:
    model_dict = pickle.load(f)

# Extract components from the dictionary
model = model_dict['model']
tfidf = model_dict['vectorizer']
label_encoder = model_dict['encoder']

def predict_email(email_content):
    """
    Predict the classification for the given email content.
    """
    # Transform the email content using the TF-IDF vectorizer
    X_new = tfidf.transform([email_content])
    probabilities = model.predict_proba(X_new)
    predicted_class_index = model.predict(X_new)[0]
    predicted_department= label_encoder.inverse_transform([predicted_class_index])[0]

    probability = probabilities[0][predicted_class_index]

    # Make the prediction using the trained model
    prediction = model.predict(X_new)

    # Convert the prediction back to the original label (department name)
    predicted_label = label_encoder.inverse_transform(prediction)

    return probability