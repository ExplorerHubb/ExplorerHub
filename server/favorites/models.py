from django.db import models
from django.contrib.auth import get_user_model
from packages.models import PackagePlace
User = get_user_model()

# Create your models here.
class Favorite(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='my_favorites')
    places = models.ManyToManyField(PackagePlace)