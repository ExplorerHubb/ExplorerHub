from django.shortcuts import render,get_object_or_404
from rest_framework.generics import CreateAPIView
from .models import Experience
from .serializers import ExperienceSerializer,Experience1Serializer,PackagePlaceSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from packages.models import PackagePlace
from user.models import CustomUser
from packages.models import PackagePlace
from rest_framework import status
from django.contrib.auth import get_user_model
# Create your views here.

User = get_user_model()


class AddExperience(CreateAPIView):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

class GetUserPlace(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        user = request.user
        serializer = Experience1Serializer(user)
        
        total_places2=[]
        total_places=serializer.data
        for item in total_places['user_experiences']:
            packages = PackagePlace.objects.filter(type=item['category'])
            serializer2 = PackagePlaceSerializer(packages,many=True)
            total_places2.append(serializer2.data)
        
        return Response(total_places2)
    
class AddExperience(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request,experience):
        list = ['Historical','Natural_Attrctions','Beach','Religious_Attraction','Modern_Attracation','Desert_Attraction']
        if experience not in list:
            return Response({"error":"Invalid choice"},status=status.HTTP_400_BAD_REQUEST)
        record, created = Experience.objects.get_or_create(category = experience)
        record.user.remove(request.user)  # Add experience to ManyToManyField
        return Response({"message":"the Experience was added succussfully"},status=status.HTTP_200_OK)
    
class RemoveExperience(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self,request,experience):
        list = ['Historical','Natural_Attrctions','Beach','Religious_Attraction','Modern_Attracation','Desert_Attraction']
        if experience not in list:
            return Response({"error":"Invalid choice"},status=status.HTTP_400_BAD_REQUEST)
        record = get_object_or_404(Experience,user=request.user,category = experience)
        record.user.remove(request.user)
        return Response({"message":"the Experience was deleted succussfully"},status=status.HTTP_200_OK)
    