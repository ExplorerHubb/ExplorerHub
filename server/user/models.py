from django.db import models
from django.core.validators import EmailValidator
from django.contrib.auth.models import AbstractUser
# Create your models here


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True,null=False,blank=False)

# with connection.cursor() as cursor:
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




# with connection.cursor() as cursor:

#     cursor.execute("DROP TABLE IF EXISTS token_blacklist_blacklistedtoken;")


# with connection.cursor() as cursor:

#     cursor.execute("DROP TABLE IF EXISTS django_admin_log;")







from django.db import connection

with connection.cursor() as cursor:
    cursor.execute("DELETE FROM django_migrations WHERE app IN ('token_blacklist');")


