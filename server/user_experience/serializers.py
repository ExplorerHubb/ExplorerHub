from rest_framework import serializers
from .models import Experience
from django.contrib.auth import get_user_model
from packages.models import PackagePlace
from cities.models import City
User  = get_user_model()

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'


class Experience2Serializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['category']



class Experience1Serializer(serializers.ModelSerializer):
    user_experiences = Experience2Serializer(many=True,read_only=True)
    class Meta:
        model = User
        fields = ['user_experiences']

class CitySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = City
        fields = '__all__'

    def get_image_url(self,obj):
        if obj.image:
            return obj.image.url


class PackagePlaceSerializer(serializers.ModelSerializer):
    city = CitySerializer(read_only= True)
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = PackagePlace
        fields = '__all__'
        
    def get_image_url(self,obj):
        if obj.image:
            return obj.image.url


