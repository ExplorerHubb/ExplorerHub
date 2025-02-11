from rest_framework import serializers
from .models import PackagePlace

class PlacesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackagePlace
        fields = '__all__'