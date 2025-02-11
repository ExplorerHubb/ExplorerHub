from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from .models import Experience
from .serializers import ExperienceSerializer,Experience1Serializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from packages.models import PackagePlace
from user.models import CustomUser
# Create your views here.


class AddExperience(CreateAPIView):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer

# class GetUserPlace(APIView):
#     # permission_classes=[IsAuthenticated]
#     def get(self,request):
#         user = request.user
#         # all_experiences = user.user_experiences.all()
#         all_experiences = user.user_experiences.values_list('category', flat=True)
#         # print(titles)
#         print(all_experiences)
#         serializer = ExperienceSerializer(all_experiences,many=True)
#         total_places=[]
#         for place in serializer.data:
#             print(place)
#             places =PackagePlace.objects.filter(type = place)
#             for place2 in places:
#                 print(place2)
#                 total_places.append({"experience":place,"places":{"Name": place2.name, "Description": place2.description, "City": place2.city}}) 
            
            
#         return Response(total_places)