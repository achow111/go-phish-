from django.db import models
from django.contrib.auth.models import User, AbstractUser

# Create your models here.
def default_fish():
    return {
        'Cod': 0, 
        'Bass': 0, 
        'Trout': 0, 
        'Salmon': 0, 
        'Pufferfish': 0, 
        'Crab': 0, 
        'Squid': 0, 
        'Barracuda': 0, 
        'Purple Shark': 0
    }

point_system = {
    'Common': 4,
    'Rare': 7,
    'Mythic': 10,
    'Legendary': 18
}

fish_rarity = {
    'Cod': 'Common',
    'Bass': 'Common',
    'Trout': 'Common',
    'Salmon': 'Rare',
    'Pufferfish': 'Rare',
    'Crab': 'Rare',
    'Squid': 'Mythic',
    'Barracuda': 'Mythic',
    'Purple Shark': 'Legendary'
}


class Employee(AbstractUser):
    
    password = models.CharField(max_length=100, blank=False, null=False)
    email = models.CharField(max_length=100, blank=False, null=False)
    organization = models.CharField(max_length=100, blank=True, null=True)
    fish = models.JSONField(default={
        'Cod': 0, 
        'Bass': 0, 
        'Trout': 0, 
        'Salmon': 0, 
        'Pufferfish': 0, 
        'Crab': 0, 
        'Squid': 0, 
        'Barracuda': 0, 
        'Purple Shark': 0
    }, blank=True)
    
    def __str__(self):
        return self.username

    @property
    def score(self):
        result = 0
        for k, v in self.fish.items():
            rarity = point_system.get(fish_rarity.get(k)) * v  # Use .get() to avoid KeyErrors
            result += rarity
        return result