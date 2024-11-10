# urls.py
from django.urls import path
from .views import EmployeeListCreate, EmployeeDetail, register, check_credentials

urlpatterns = [
    # List all employees or create a new employee (GET, POST)
    path('api/employees/', EmployeeListCreate.as_view(), name='employee-list-create'),
    
    # Retrieve, update, or delete a specific employee (GET, PUT, PATCH, DELETE)
    path('api/employees/<int:pk>/', EmployeeDetail.as_view(), name='employee-detail'),
    path('api/register/', register, name='register'),
    path('api/check_credentials/', check_credentials, name='check_credentials')
]
