from django.db import models
from django.core.validators import EmailValidator
from django.contrib.auth.models import AbstractUser
# Create your models here
from cloudinary.models import CloudinaryField

def set_user_photo(gender):
    if gender == 'Male':
        return 'https://res.cloudinary.com/djibubqdg/image/upload/v1740158572/ykgj4f0pgggikqe5asgn.jpg'
    elif gender == 'Female':
        return 'https://res.cloudinary.com/djibubqdg/image/upload/v1740158482/dnfxdp1tv8uwebewsuxq.jpg'



class CustomUser(AbstractUser):
    choices = [('Female','Female'),('Male','Male')]
    email = models.EmailField(unique=True,null=False,blank=False)
    gender = models.CharField(max_length = 20,choices=choices)
    image = CloudinaryField('image')
    phone_no = models.CharField(max_length=15,unique=True)
    country = models.CharField(max_length=100)
    first_name = models.CharField(max_length=150,null=False)
    last_name = models.CharField(max_length=150,null=False)

    def save(self,*args,**kwargs):
        if not self.image:
            self.image = set_user_photo(self.gender)
        super().save(*args,**kwargs)

    def __str__(self):
        return self.username

    
