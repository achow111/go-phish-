# views.py
from rest_framework import generics
from .models import Employee
from .serializers import EmployeeSerializer

# List all employees or create a new employee
class EmployeeListCreate(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

# Retrieve, update, or delete a specific employee
class EmployeeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

import pickle
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

# Load the pipeline (model + vectorizer) from the .pkl file
model_path = os.path.join('phish_detector/predictor/model_with_vectorizer_and_encoder.pkl')
with open(model_path, 'rb') as f:
    model_pipeline = pickle.load(f)

@csrf_exempt  # Exempt CSRF for testing, make sure to handle properly in production
@api_view(['POST'])  # This view will handle POST requests
@permission_classes([AllowAny])  # Allow any user (no authentication required)
def predict_email(request):
    if request.method == 'POST':
        try:
            # Get the email input from the POST request
            email = request.data.get('email', None)
            
            if email is None:
                return JsonResponse({'error': 'No email provided'}, status=400)

            # Use the pipeline to make a prediction (it handles both transformation and prediction)
            prediction = model_pipeline.predict([email])  # Pass email as a list
            
            # Return the result as a JSON response
            return JsonResponse({'prediction': prediction.tolist()})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)