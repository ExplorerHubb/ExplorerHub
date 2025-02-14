from django.shortcuts import render
from rest_framework import generics,status
from rest_framework.permissions import AllowAny,IsAuthenticated
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer,LoginSerializer,LogoutSerializer,AccountSerializer,AccountUpdateSerializer
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import UpdateAPIView
# Create your views here.
User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self,request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data.get('username', '').strip()
        email = serializer.validated_data.get('email', '').strip()
        password = serializer.validated_data.get('password')
        
        user = None

        
        if username:
            user = authenticate(username=username, password=password)

        
        elif email:
            try:
                user_data = User.objects.get(email=email)  
                user = authenticate(username=user_data.username, password=password)
            except User.DoesNotExist:
                pass  

        
        if not user:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        refresh = RefreshToken.for_user(user)  # to refresh the JWT token
        return Response({"user":{"id":user.id,"username":user.username,"email":user.email},"refresh":str(refresh),"access":str(refresh.access_token)},status=status.HTTP_200_OK)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request):
        
        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'message':'logged out successfully'},status=status.HTTP_200_OK)
    

class AccountList(APIView):

    def get(self, request, pk=None):  
        if pk:
            try:
                account = User.objects.get(pk=pk)
                serializer = AccountSerializer(account)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({"error": "Account not found"}, status=status.HTTP_404_NOT_FOUND)
        

class UpdateView(UpdateAPIView):
    # print(AccountUpdateSerializer)
    queryset = User.objects.all()
    serializer_class = AccountUpdateSerializer
    permission_classes = [IsAuthenticated]
    lookup_field='id'
