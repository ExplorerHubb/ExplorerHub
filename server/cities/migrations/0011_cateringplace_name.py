# Generated by Django 5.1.1 on 2025-02-06 01:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cities', '0010_alter_cateringplace_city'),
    ]

    operations = [
        migrations.AddField(
            model_name='cateringplace',
            name='name',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
