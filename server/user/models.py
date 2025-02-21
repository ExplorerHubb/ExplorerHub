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


