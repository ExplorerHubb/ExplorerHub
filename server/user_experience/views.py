from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from .models import Experience
from .serializers import ExperienceSerializer,Experience1Serializer,PackagePlaceSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from packages.models import PackagePlace
from user.models import CustomUser
from packages.models import PackagePlace
# Create your views here.


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