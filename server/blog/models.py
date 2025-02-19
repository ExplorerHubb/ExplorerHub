from django.db import models
from django.contrib.auth import get_user_model
from cities.models import City
from cloudinary.models import CloudinaryField
# Create your models here.
User = get_user_model()

class Blog(models.Model):
    name = models.CharField(max_length=100)
    author = models.ForeignKey(User,on_delete=models.CASCADE,related_name="user_blogs")
    description = models.TextField()
    city = models.ForeignKey(City,on_delete=models.CASCADE,related_name="city_blogs")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    image = CloudinaryField('image',default = 'https://res.cloudinary.com/djibubqdg/image/upload/v1739908442/pvs4pbsiimdivm3qlzb8.jpg')

class Comment(models.Model):
    author = models.ForeignKey(User,on_delete=models.CASCADE,related_name="user_comments")
    blog = models.ForeignKey(Blog,on_delete=models.CASCADE,related_name='blog_comments')
    content = models.TextField()

class Like(models.Model):
    blog = models.ForeignKey(Blog,on_delete=models.CASCADE,related_name='blog_likes')
    author = models.ForeignKey(User,on_delete=models.CASCADE)
    

