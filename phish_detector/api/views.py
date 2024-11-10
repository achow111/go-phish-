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
