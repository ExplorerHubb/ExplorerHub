from rest_framework import serializers
from .models import Blog,Comment,Notification
from cities.models import City


class BlogSerializer(serializers.ModelSerializer):
    city = serializers.PrimaryKeyRelatedField(queryset=City.objects.all())  # Use ID instead of string
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

    