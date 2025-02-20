from rest_framework import serializers
from .models import City,FamousFood,CateringPlace,EntertainmentPlace,ShoppingMallsPlace,Accommodation

class FamousFoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = FamousFood
        fields = ['id', 'name', 'description']

class CateringSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = CateringPlace
        fields = ['name','country_code','city','district','suburb','street','formatted','categories','house_number','website','opening_hours','contact','facilities','catering','phone','email','image_url']

    def get_image_url(self,obj):
        if obj.image:
            return obj.image.url
        return None
class EntertainmentSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    class Meta:
        model =  EntertainmentPlace
        fields = ['name','country_code','image_url','city','district','suburb','street','formatted','categories','house_number','website','opening_hours','contact','facilities','catering','phone','email']  
    def get_image_url(self,obj):
        if obj.image:
            return obj.image.url
        return None

class ShoppingSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = ShoppingMallsPlace
        fields = ['name','country_code','city','district','suburb','street','formatted','categories','house_number','website','opening_hours','contact','facilities','phone','email','image_url']  
    def get_image_url(self,obj):
        if obj.image:
            return obj.image.url
        return None

class CitynamesSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = City
        fields = ['name','type','image_url']

    def get_image_url(self,obj):
        if obj.image:
            return obj.image.url
        return None




class CitySerializer(serializers.ModelSerializer):
    famous_food = FamousFoodSerializer(many=True,read_only=True)
    
    class Meta:
    
        model = City
        fields = ['name','funfact','type','famous_food']
    
class CityCateringSerializer(serializers.ModelSerializer):
    city_place = CateringSerializer(many=True,read_only=True)
    class Meta:
        model = City
        fields = ['city_place']


class CityEntertainmentSerializer(serializers.ModelSerializer):
    entertainment_place = EntertainmentSerializer(many=True,read_only=True)
    class Meta:
        model = City
        fields = ['entertainment_place']


class CityShoppingSerializer(serializers.ModelSerializer):
    shopping_place = ShoppingSerializer(many=True,read_only=True)
    class Meta:
        model = City
        fields = ['shopping_place']

# shopping serialaizers

class AccommodationSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = Accommodation
        fields = ['name','country_code','city','district','suburb','street','formatted','categories','house_number','website','opening_hours','contact','facilities','phone','email','image_url']
    def get_image_url(self,obj):
        if obj.image:
            return obj.image.url
        return None


class CityAccommodationSerializer(serializers.ModelSerializer):
    accommodation = AccommodationSerializer(many=True,read_only=True)
    class Meta:
        model = City
        fields = ['accommodation']

