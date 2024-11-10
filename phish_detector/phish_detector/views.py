from django.shortcuts import render

from django.http import JsonResponse
from predictor.models import predict_email  # Import the prediction function

from django.views.decorators.csrf import csrf_exempt

@csrf_exempt 
def predict_email_view(request):
    # Get the email content from the POST request
    email_content = request.POST.get('emailContent')

    if not email_content:
        return JsonResponse({'error': 'No email content provided'}, status=400)

    # Get the prediction using the function defined in models.py
    predicted_department = predict_email(email_content)

    # Return the predicted department as a JSON response
    return JsonResponse({'predictedDepartment': predicted_department})

from django.shortcuts import render

# This view will render the homepage for the root URL
def home(request):
    return render(request, 'home.html')  # Create home.html in your templates directory