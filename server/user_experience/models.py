from django.db import models
from user.models import CustomUser
# Create your models here.

class Experience(models.Model):
    choices = [
        ('Historical','Historical'),
        ('Natural_Attrctions','Natural_Attrctions'),
        ('Beach','Beach'),
        ('Religious_Attraction','Religious_Attraction'),
        ('Modern_Attracation','Modern_Attracation'),
        ('Desert_Attraction','Desert_Attraction')
               ]
    category = models.CharField(max_length=50,choices=choices)
    user = models.ManyToManyField(CustomUser,related_name='user_experiences')