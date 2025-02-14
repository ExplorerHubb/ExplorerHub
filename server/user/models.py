from django.db import models
from django.core.validators import EmailValidator
from django.contrib.auth.models import AbstractUser
# Create your models here
from cloudinary.models import CloudinaryField


class CustomUser(AbstractUser):
    choices = [('Female','Female'),('Male','Male')]
    email = models.EmailField(unique=True,null=False,blank=False)
    gender = models.CharField(max_length = 20,choices=choices,null=True,blank=True)
    image = CloudinaryField('image', default='http://res.cloudinary.com/djibubqdg/image/upload/v1739547762/g2kxssiifzsqbac9tar3.jpg',null=True,blank=True)
    phone_no = models.CharField(max_length=15,unique=True,null=True,blank=True)
    country = models.CharField(max_length=100,null=True,blank=True)
    

# # with connection.cursor() as cursor:
#     cursor.execute("DROP TABLE IF EXISTS auth_user;")
#     cursor.execute("DROP TABLE IF EXISTS auth_group;")
#     cursor.execute("DROP TABLE IF EXISTS auth_permission;")
#     cursor.execute("DROP TABLE IF EXISTS auth_group_permissions;")
#     cursor.execute("DROP TABLE IF EXISTS auth_user_groups;")
#     cursor.execute("DROP TABLE IF EXISTS auth_user_user_permissions;")
#     cursor.execute("DROP TABLE IF EXISTS django_admin_log;")
#     cursor.execute("DROP TABLE IF EXISTS token_blacklist_blacklistedtoken;")


# with connection.cursor() as cursor:

#     cursor.execute("DROP TABLE IF EXISTS token_blacklist_outstandingtoken;")
#     cursor.execute("DROP TABLE IF EXISTS token_blacklist_blacklistedtoken;")



# with connection.cursor() as cursor:

#     cursor.execute("DROP TABLE IF EXISTS token_blacklist_blacklistedtoken;")


# with connection.cursor() as cursor:

#     cursor.execute("DROP TABLE IF EXISTS django_admin_log;")







from django.db import connection

with connection.cursor() as cursor:
    cursor.execute("DELETE FROM django_migrations WHERE app IN ('token_blacklist');")


