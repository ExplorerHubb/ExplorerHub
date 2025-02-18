from django.shortcuts import render,get_object_or_404
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework.viewsets import ModelViewSet
from .models import Blog,Comment,Like
from rest_framework.permissions import IsAuthenticated
from .serializers import BlogSerializer,CommentSerializer,BlogCommentSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
# Create your views here.

User = get_user_model()

class CreateBlog(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    lookup_field = "id"

    #it is used in creating new instances
    def perform_create(self, serializer):
        return serializer.save(author=self.request.user)
    
    #it is used when updating  existing ones
    def perform_update(self, serializer):
        return serializer.save(author=self.request.user)
    
    def destroy(self, request, *args, **kwargs):
        blog_id = kwargs.get('id')
        blog = get_object_or_404(Blog,id=blog_id)
        if blog.author == request.user:
            return super().destroy(blog)
        return Response({"message":"the post was deleted successfully"},status=status.HTTP_200_OK)
        return Response({"Error":"you dont have access to delete this post"},status=status.HTTP_401_UNAUTHORIZED)
        
        
    
class CommentView(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    lookup_field = "id"

    def perform_create(self, serializer):
        return serializer.save(author=self.request.user)
    
    def perform_update(self, serializer):
        return serializer.save(author = self.request.user)
    
    def destroy(self, request, *args, **kwargs):
        comment_id = kwargs.get('id') #lookupfield
        blog_id = request.data.get("blog")
        comment = get_object_or_404(Comment,id=comment_id,blog = blog_id)
        return super().destroy(comment)
    
class BlogCommentsView(APIView):
    def get(self,request,id):
        blog = get_object_or_404(Blog,id=id)
        serializer = BlogCommentSerializer(blog)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
class AddLike(APIView):
    def post(self,request,id):
        blog = get_object_or_404(Blog,id=id)
        record = Like.objects.filter(blog=blog,author=request.user).first()
        if record is not None:
            return Response({"Error":"you cannot make more than one like"},status=status.HTTP_403_FORBIDDEN)
        else:
            Like.objects.create(blog=blog,author=request.user)
            return Response(Like.objects.count(),status=status.HTTP_200_OK)

        
        
class RemoveLike(APIView):
    def delete(self,request,id):
        blog = get_object_or_404(Blog,id=id)
        like = get_object_or_404(Like,blog=blog,author=request.user)
        
        like.delete()
        return Response(Like.objects.count(),status=status.HTTP_200_OK)
        