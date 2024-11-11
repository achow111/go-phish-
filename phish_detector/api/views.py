# views.py
from rest_framework import generics
from .models import Employee
from .serializers import EmployeeSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
import pickle
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny


# List all employees or create a new employee
class EmployeeListCreate(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

# Retrieve, update, or delete a specific employee
class EmployeeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


# Load the pipeline (model + vectorizer) from the .pkl file
model_path = '/Users/megh/Documents/GitHub/go-phish-/phish_detector/predictor/model_with_vectorizer_and_encoder.pkl'
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

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        username = request.data.get('userName')
        password = request.data.get('password')
        email = request.data.get('email')
        organization = request.data.get('organization')
            
        # Check if the user already exists
        if get_user_model().objects.filter(username=username).exists():
            return Response({"error": "Username already taken."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create the user
        user = get_user_model().objects.create(username=username, password=password, email=email, organization=organization)
        
        # Assuming `EmployeeSerializer` is set up correctly
        serializer = EmployeeSerializer(user)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def check_credentials(request):
    email = request.data.get("email")
    password = request.data.get("password")

    # Check if both email and password are provided
    if not email or not password:
        return Response({"error": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    # Use get_user_model to handle custom user model
    User = get_user_model()

    # Iterate through all users to check for matching credentials
    for user in User.objects.all():
        if user.email == email and user.password ==password:
            # If user is found and password matches, return the user data
            user_data = EmployeeSerializer(user)
            return Response(user_data.data, status=status.HTTP_200_OK)

    # If no matching user is found, return error
    return Response({"error": "Invalid email or password."}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def update_barrel(request):

    action = request.data.get('action')
    employee_id = request.data.get('id')
    
    if action == 'increment' and employee_id:
        employee = Employee.objects.filter(id=employee_id).first()
        employee.barrels += 1
        employee.save()
        return Response({"message": "Barrel incremented successfully."}, status=status.HTTP_200_OK)

    elif action == 'decrement' and employee_id:
        employee = Employee.objects.filter(id=employee_id).first()
        employee.barrels -= 1
        employee.save()
        return Response({"message": "Barrel decremented successfully."}, status=status.HTTP_200_OK)

    return Response({"error": "Invalid request."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def update_fish(request):
    fish = request.data.get('fishname')
    employee_id = request.data.get('id')
    print(fish, employee_id)
    if fish and employee_id:
        employee = Employee.objects.filter(id=employee_id).first()
        employee.fish[fish]+= 1
        employee.save()
        return Response({"message": "Fish incremented successfully."}, status=status.HTTP_200_OK)

    return Response({"error": "Invalid request."}, status=status.HTTP_400_BAD_REQUEST)