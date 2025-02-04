from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken,BlacklistedToken

class RegisterSerializer(serializers.ModelSerializer):
    ## for security to prevent returning the password through the api
    password = serializers.CharField(write_only=True,min_length=8)

    class Meta:
        model = User
        fields = ['id','username','email','password']

## override the function create in order to make the password hashed
    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True)


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self,data):
        self.token = data['refresh']
        return data

    def save(self,**kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except:
            pass

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email']

class AccountUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email','password']
    def update(self,instance,validated_data):
        
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
            validated_data.pop('password')  # Remove from validated_data since it's already set
        
        # Update the rest of the fields
        return super().update(instance, validated_data)
    