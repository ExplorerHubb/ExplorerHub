from rest_framework import serializers
from .models import Favorite
from packages.models import PackagePlace

class PackagePlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackagePlace
        fields = '__all__'






class FavoriteSerializer(serializers.ModelSerializer):
    places = PackagePlaceSerializer(many=True,read_only=True)
    class Meta:
        model = Favorite
        fields = '__all__'