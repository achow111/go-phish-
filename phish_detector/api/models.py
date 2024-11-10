from django.db import models
from django.contrib.auth.models import User

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


class Employee(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    organization = models.CharField(max_length=100,blank=True, null=True)
    fish = models.JSONField(default=default_fish)
    
    def __str__(self):
        return self.user.username

    @property
    def score(self):
        result = 0
        
        for k, v in self.fish.items():
            rarity = point_system[fish_rarity[k]] * v  # Check both dictionaries for missing keys
            result += rarity

        return result

    @property
    def fish_rarity(self):
        return fish_rarity
    
