from django.db import models
from cities.models  import City
# Create your models here.
from cloudinary.models import CloudinaryField

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
    image =CloudinaryField('image', default='places_images/')

    def __str__(self):
        return self.name







# from packages.models import PackagePlace  # Replace with your model
# from django.contrib.auth import get_user_model
# user=get_user_model()

# for obj in user.objects.all():
#     print(obj.image.url)  # This should print Cloudinary URLs






# import os
# from django.core.files import File
# from cloudinary.uploader import upload
# from packages.models import PackagePlace  # Change to your actual model


# for obj in PackagePlace.objects.all():
#     if obj.image:  # If an image exists
#         local_path = obj.image.path  # Get local file path

#         # Upload image to Cloudinary
#         result = upload(local_path)
#         cloudinary_url = result["url"]

#         # Update the model instance with the new Cloudinary URL
#         obj.image = cloudinary_url
#         obj.save()

#         # Optional: Delete local file after upload
#         os.remove(local_path)

# print("Migration complete! All images are now on Cloudinary.")