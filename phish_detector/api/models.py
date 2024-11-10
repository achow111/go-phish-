from django.db import models
from django.contrib.auth.models import User

# Create your models here.

point_system = {
    'common': 4,
    'rare': 7,
    'mythic': 10,
    'legendary': 18
}



class Employee(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    organization = models.CharField(max_length=100,blank=True, null=True)
    fish = models.JSONField(default=dict(common=0, rare=0, mythic=0, legendary=0))

    def __str__(self):
        return self.user.username

    @property
    def score(self):
        result = 0
        
        for k, v in self.fish.items():
            result += v * point_system[k]
            
        return result

