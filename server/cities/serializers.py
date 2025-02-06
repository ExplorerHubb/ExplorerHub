from rest_framework import serializers
from .models import City,FamousFood,CateringPlace,EntertainmentPlace

class FamousFoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = FamousFood
        fields = ['id', 'name', 'description']

class CateringSerializer(serializers.ModelSerializer):
    class Meta:
        model = CateringPlace
        fields = ['name','country_code','city','district','suburb','street','formatted','categories','house_number','website','opening_hours','contact','facilities','catering','phone','email']

class EntertainmentSerializer(serializers.ModelSerializer):
    model =  EntertainmentPlace
    fields =   ['name','country_code','city','district','suburb','street','formatted','categories','house_number','website','opening_hours','contact','facilities','catering','phone','email']  

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