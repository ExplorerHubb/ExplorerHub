from django.db import models
from cities.models  import City
# Create your models here.


class PackagePlace(models.Model):
    choices = [
        ('Historical','Historical'),
        ('Natural_Attrctions','Natural_Attrctions'),
        ('Beach','Beach'),
        ('Religious_Attraction','Religious_Attraction'),
        ('Modern_Attracation','Modern_Attracation'),
        ('Desert_Attraction','Desert_Attraction')
               ]
    name = models.CharField(max_length=100)
    description = models.TextField()
    city = models.ForeignKey(City,on_delete=models.CASCADE)
    type = models.CharField(max_length=100,choices=choices)
    image = models.ImageField(upload_to='places_images/')

    def __str__(self):
        return self.name
