from django.shortcuts import render,get_object_or_404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Favorite
from rest_framework.response import Response
from rest_framework import status
from packages.models import PackagePlace
from .serializer import FavoriteSerializer
# Create your views here.


class AddToFavorites(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request,place_id):
        place = get_object_or_404(PackagePlace,id= place_id)
        try:
            fav = Favorite.objects.get(user=request.user)
        except:
            fav = Favorite.objects.create(user=request.user)

        try:
            fav.places.get(id=place_id)
        except:
            fav.places.add(place)
            return Response({'message':'the place is added succussfully to your favorites'},status=status.HTTP_200_OK)
    
        return Response({'error':'you cannot add the same place multiple times in your favorites'},status=status.HTTP_400_BAD_REQUEST)
        
class RemoveFromFavorites(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self,request,place_id):
        place = get_object_or_404(PackagePlace,id= place_id)
        try:
            fav = Favorite.objects.get(user=request.user)
        except:
            fav = Favorite.objects.create(user=request.user)


        try:
            obj = fav.places.get(id=place_id)
        except:
            return Response({'error':'this place is not in your favorite list'},status=status.HTTP_400_BAD_REQUEST)
        
        
        fav.places.remove(place)
        return Response({'message':'the place is removed succussfully from your favorites'},status=status.HTTP_200_OK)
    

class MyFavorites(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        data = get_object_or_404(Favorite,user=request.user)
        serializer = FavoriteSerializer(data)
        return Response(serializer.data,status=status.HTTP_200_OK)
          
        
    
    

