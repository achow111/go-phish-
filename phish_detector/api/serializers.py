# serializers.py
from rest_framework import serializers
from .models import Employee
from rest_framework.permissions import IsAuthenticated, AllowAny

class EmployeeSerializer(serializers.ModelSerializer):
    score = serializers.ReadOnlyField()

    class Meta:
        model = Employee
        fields = ['id', 'username', 'email', 'password', 'organization', 'fish', 'score']