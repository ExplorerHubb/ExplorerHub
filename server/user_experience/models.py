from django.db import models
from django.contrib.auth import get_user_model
User=get_user_model()
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
    user = models.ManyToManyField(User,related_name='user_experiences')
