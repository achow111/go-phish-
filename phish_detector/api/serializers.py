# serializers.py
from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)  # Add this line to include username
    score = serializers.ReadOnlyField()

    class Meta:
        model = Employee
        fields = ['id', 'username', 'organization', 'fish', 'score']  # Include username instead of user ID
