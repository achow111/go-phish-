# serializers.py
from rest_framework import serializers
from .models import Employee
from rest_framework.permissions import IsAuthenticated, AllowAny

class EmployeeSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)  # Add this line to include username
    score = serializers.ReadOnlyField()
    permission_classes = [IsAuthenticated]

    class Meta:
        model = Employee
        fields = ['id', 'username', 'organization', 'fish', 'score', 'fish_rarity']
