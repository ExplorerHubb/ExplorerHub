# Generated by Django 5.1.5 on 2025-02-20 19:55

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('favorites', '0001_initial'),
        ('packages', '0003_alter_packageplace_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='favorite',
            name='places',
        ),
        migrations.AddField(
            model_name='favorite',
            name='places',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='packages.packageplace'),
            preserve_default=False,
        ),
    ]
