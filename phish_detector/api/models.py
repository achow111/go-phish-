from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Employee(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    organization = models.CharField(max_length=100,blank=True, null=True)
    fish = models.JSONField(default=dict(common=0, rare=0, mythic=0, legendary=0))

    def __str__(self):
        return self.user.username


