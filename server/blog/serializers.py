from rest_framework import serializers
from .models import Blog,Comment,Notification
from cities.models import City
from django.contrib.auth import get_user_model
User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

class BlogSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    class Meta:
        model = Blog
        fields ='__all__'
        extra_kwargs = {'author':{'read_only':True}}

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields ='__all__'
        extra_kwargs = {'author':{'read_only':True}}

class BlogCommentSerializer(serializers.ModelSerializer):
    blog_comments = CommentSerializer(many=True,read_only=True)
    class Meta:
        model = Blog
        fields = ['blog_comments']

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['message']

    