from rest_framework import serializers
from .models import PackagePlace

class PlacesSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = PackagePlace
        fields = '__all__'

    def get_image_url(self,obj):
        if obj.image:
            return obj.image.url
        return None