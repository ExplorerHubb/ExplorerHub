from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken,BlacklistedToken
User = get_user_model()
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
    username = serializers.CharField(max_length = 150,required=False)
    email = serializers.EmailField(required=False)
    password = serializers.CharField(max_length = 100)
    gender = serializers.CharField(max_length = 20,required = False,allow_null=True)
    image = serializers.ImageField(required = False,allow_null=True)
    phone_no = serializers.CharField(max_length=15,required = False,allow_null=True)
    country = serializers.CharField(max_length=100,required = False,allow_null=True)

    
    def validate(self,data):
        
        username = data.get('username', '').strip()
        email = data.get('email', '').strip()
        password = data.get('password')

        if not (username or email):
            raise serializers.ValidationError('Username or email must be provided.')

        if not password:
            raise serializers.ValidationError('Password must be provided.')

        return data

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
        fields = ['id','username','email','phone_no','gender','country','image','first_name','last_name'] ##
        
class AccountUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email','phone_no','gender','country','image','first_name','last_name']
        extra_kwargs = {
            'username': {'required': False},
            'email': {'required': False},
            'phone_no': {'required': False},  
            'gender': {'required': False},
            'country': {'required': False},
            'image': {'required': False},
            'first_name': {'required': False},
            'last_name': {'required': False}
        }
    def update(self,instance,validated_data):
        
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
            validated_data.pop('password')  
        
        return super().update(instance,validated_data)