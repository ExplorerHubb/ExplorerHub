from django.shortcuts import render,get_object_or_404
from .models import City
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .serializers import CitySerializer,FamousFoodSerializer,CityCateringSerializer,CityEntertainmentSerializer
from rest_framework.response import Response
from rest_framework import status
# Create your views here.


class CityView(APIView):
    permission_classes=[AllowAny]
    def get(self, request, name):
        city = get_object_or_404(City, name=name)  
        
        city_data = CitySerializer(city)
        
        return Response(city_data.data, status=status.HTTP_200_OK)
    
class CityCateringView(APIView):
    permission_classes = [AllowAny]
    def get(self,request,name):
        city = get_object_or_404(City,name=name)
        city_data = CityCateringSerializer(city)
        return Response(city_data.data,status=status.HTTP_200_OK)

class CityEntertainmentView(APIView):
    permission_classes = [AllowAny]
    def get(self,request,name):
        city = get_object_or_404(City,name=name)
        city_data = CityEntertainmentSerializer(city)
        return Response(city_data.data, status=status.HTTP_200_OK)
