from django.shortcuts import render,get_object_or_404
from .models import City,CateringPlace,Accommodation,EntertainmentPlace
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .serializers import CitySerializer,FamousFoodSerializer,CityCateringSerializer,CityEntertainmentSerializer,CityShoppingSerializer,CityAccommodationSerializer,CitynamesSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ReadOnlyModelViewSet
from .serializers import CateringSerializer,AccommodationSerializer,EntertainmentSerializer

# Create your views here.

class CityNamesView(ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    queryset = City.objects.all().order_by('id')[:27]
    serializer_class = CitynamesSerializer


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

class ShoppingView(APIView):
    def get(self,request,name):
        city = get_object_or_404(City,name=name)
        city_data = CityShoppingSerializer(city)
        return Response(city_data.data,status=status.HTTP_200_OK)

class AccommodationView(APIView):
    def get(self,request,name):
        city = get_object_or_404(City,name=name)
        city_data = CityAccommodationSerializer(city)
        return Response(city_data.data,status=status.HTTP_200_OK)


class CateringCategoriesView(APIView):
    def get(self,request,city,type):
        categories = ['catering','restaurant','bar','cafe','fast_food','building.catering']
        if type not in categories:
            return Response({'error':'cannot find this type of category'},status=status.HTTP_400_BAD_REQUEST)
            
        if type == 'catering':
            data = CateringPlace.objects.filter(name=city)
        else:
            cityy = get_object_or_404(City,name=city)
            data = CateringPlace.objects.filter(city=cityy,categories__contains=type)
        
        serializer = CateringSerializer(data,many=True)
        
        return Response(serializer.data,status=status.HTTP_200_OK)

class AccomodationCategoriesView(APIView):
    def get(self,request,city,type):
        categories = ['accommodation','hotel','hostel','apartment','motel','guest_house','hut']
        if type not in categories:
            return Response({'error':'cannot find this type of category'},status=status.HTTP_400_BAD_REQUEST)
        if type == 'accommodation':
            data = Accommodation.objects.filter(name=city)
        else:
            cityy = get_object_or_404(City,name=city)
            data = Accommodation.objects.filter(city=cityy,categories__contains=type)
        
        serializer = AccommodationSerializer(data,many=True)
        
        return Response(serializer.data,status=status.HTTP_200_OK)


class EntertainmentCategoriesView(APIView):
    def get(self,request,type,city):
        categories = ['entertainment','museum','building','cinema','culture','tourism','theatre','zoo','building.historic','theme_park','golf','arts_centre']
        if type not in categories:
            return Response({'error':'cannot find this type of category'},status=status.HTTP_400_BAD_REQUEST)
        
        if type == 'entertainment':
            data = EntertainmentPlace.objects.filter(name=city)
        else:
            cityy = get_object_or_404(City,name=city)
            data = EntertainmentPlace.objects.filter(city=cityy,categories__contains=type)
        
        serializer = EntertainmentSerializer(data,many=True)
       
        return Response(serializer.data,status=status.HTTP_200_OK)
