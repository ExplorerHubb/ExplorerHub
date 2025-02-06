# Generated by Django 5.1.1 on 2025-02-06 00:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cities', '0006_cateringplace_email_cateringplace_phone_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cateringplace',
            name='amenity',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='cateringplace',
            name='catering',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='cateringplace',
            name='contact',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='cateringplace',
            name='district',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='cateringplace',
            name='email',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='cateringplace',
            name='facilities',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='cateringplace',
            name='formatted',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='cateringplace',
            name='house_number',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='cateringplace',
            name='opening_hours',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='cateringplace',
            name='phone',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='cateringplace',
            name='street',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='cateringplace',
            name='suburb',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='cateringplace',
            name='website',
            field=models.URLField(blank=True, max_length=100, null=True),
        ),
    ]
