from rest_framework import serializers
from .models import Experience

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

class Experience1Serializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['category']


