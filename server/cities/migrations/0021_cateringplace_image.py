# Generated by Django 5.1.5 on 2025-02-20 11:39

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cities', '0020_city_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='cateringplace',
            name='image',
            field=cloudinary.models.CloudinaryField(default='catering_places/caf.jpg', max_length=255, verbose_name='image'),
        ),
    ]
