from django.db import models

# Create your models here.



class City(models.Model):
 
    choices = [('coastal','Coastal'),('agricultural','Agricultural'),('industrial','Industrial'),('desert','Desert')]

    name = models.CharField(max_length=100)
    funfact = models.TextField()
    type = models.CharField(max_length=100,choices=choices)
    
    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class FamousFood(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    city = models.ManyToManyField(City,related_name='famous_food')

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
    

class CateringPlace(models.Model):

    name = models.CharField(max_length=200,null=True)
    country_code = models.CharField(max_length=10)
    city = models.ForeignKey(City,on_delete=models.CASCADE,related_name='city_place')
    district = models.TextField(null=True,blank=True)
    suburb = models.TextField(null=True,blank=True)
    street = models.TextField(null=True,blank=True)
    formatted = models.TextField(null=True,blank=True)
    categories = models.CharField(max_length=100)
    
    house_number = models.CharField(max_length=1000,null=True,blank=True)
    website = models.URLField(max_length=100,null=True,blank=True)
    opening_hours = models.CharField(max_length=200,null=True,blank=True)
    contact = models.CharField(max_length=100,null=True,blank=True)
    facilities = models.CharField(max_length=100,null=True,blank=True)
    catering = models.CharField(max_length=100,null=True,blank=True)
    phone = models.CharField(max_length=50,null=True,blank=True)
    email = models.EmailField(max_length=200,null=True,blank=True)

    def __str__(self):
        return self.name

class EntertainmentPlace(models.Model):
    name = models.CharField(max_length=200,null=True)
    country_code = models.CharField(max_length=10)
    city = models.ForeignKey(City,on_delete=models.CASCADE,related_name='entertainment_place')
    district = models.TextField(null=True,blank=True)
    suburb = models.TextField(null=True,blank=True)
    street = models.TextField(null=True,blank=True)
    formatted = models.TextField(null=True,blank=True)
    categories = models.CharField(max_length=100)
    
    house_number = models.CharField(max_length=1000,null=True,blank=True)
    website = models.URLField(max_length=100,null=True,blank=True)
    opening_hours = models.CharField(max_length=200,null=True,blank=True)
    contact = models.CharField(max_length=100,null=True,blank=True)
    facilities = models.CharField(max_length=100,null=True,blank=True)
    catering = models.CharField(max_length=100,null=True,blank=True)
    phone = models.CharField(max_length=50,null=True,blank=True)
    email = models.EmailField(max_length=200,null=True,blank=True)

    def __str__(self):
        return self.name
    
class ShoppingMallsPlace(models.Model):
    name = models.CharField(max_length=200,null=True)
    country_code = models.CharField(max_length=10)
    city = models.ForeignKey(City,on_delete=models.CASCADE,related_name='shopping_place')
    district = models.TextField(null=True,blank=True)
    suburb = models.TextField(null=True,blank=True)
    street = models.TextField(null=True,blank=True)
    formatted = models.TextField(null=True,blank=True)
    categories = models.CharField(max_length=100)
    
    house_number = models.CharField(max_length=1000,null=True,blank=True)
    website = models.URLField(max_length=100,null=True,blank=True)
    opening_hours = models.CharField(max_length=200,null=True,blank=True)
    contact = models.CharField(max_length=100,null=True,blank=True)
    facilities = models.CharField(max_length=100,null=True,blank=True)
   
    phone = models.CharField(max_length=50,null=True,blank=True)
    email = models.EmailField(max_length=200,null=True,blank=True)

    def __str__(self):
        return self.name
    

class Accommodation(models.Model):
    name = models.CharField(max_length=200,null=True)
    country_code = models.CharField(max_length=10)
    city = models.ForeignKey(City,on_delete=models.CASCADE,related_name='accommodation')
    district = models.TextField(null=True,blank=True)
    suburb = models.TextField(null=True,blank=True)
    street = models.TextField(null=True,blank=True)
    formatted = models.TextField(null=True,blank=True)
    categories = models.CharField(max_length=100)
    
    house_number = models.CharField(max_length=1000,null=True,blank=True)
    website = models.URLField(max_length=100,null=True,blank=True)
    opening_hours = models.CharField(max_length=200,null=True,blank=True)
    contact = models.CharField(max_length=100,null=True,blank=True)
    facilities = models.CharField(max_length=100,null=True,blank=True)
    phone = models.CharField(max_length=50,null=True,blank=True)
    email = models.EmailField(max_length=200,null=True,blank=True)

    # def __str__(self):
    #     return self.name