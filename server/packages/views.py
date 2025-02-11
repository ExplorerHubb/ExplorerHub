from django.shortcuts import render
from .serializers import PlacesSerializer
from rest_framework.viewsets import ModelViewSet
from .models import PackagePlace
# Create your views here.


class HistoricalPlacesView(ModelViewSet):
    queryset = PackagePlace.objects.filter(type='Historical')
    serializer_class = PlacesSerializer

class NaturalPlacesView(ModelViewSet):
    queryset = PackagePlace.objects.filter(type ='Natural_Attrctions')
    serializer_class = PlacesSerializer

class BeachPlacesView(ModelViewSet):
    queryset = PackagePlace.objects.filter(type ='Beach')
    serializer_class = PlacesSerializer

class ReligonPlacesView(ModelViewSet):
    queryset = PackagePlace.objects.filter(type ='Religious_Attraction')
    serializer_class = PlacesSerializer

class ModernPlacesView(ModelViewSet):
    queryset = PackagePlace.objects.filter(type ='Modern_Attraction')
    serializer_class = PlacesSerializer

class DessertPlacesView(ModelViewSet):
    queryset = PackagePlace.objects.filter(type ='Dessert_Attraction')
    serializer_class = PlacesSerializer
