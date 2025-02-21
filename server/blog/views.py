from django.shortcuts import render,get_object_or_404
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework.viewsets import ModelViewSet
from .models import Blog,Comment,Like,Notification
from rest_framework.permissions import IsAuthenticated
from .serializers import BlogSerializer,CommentSerializer,BlogCommentSerializer,NotificationSerializer
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
    permission_classes = [IsAuthenticated]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    lookup_field = "id"

    def perform_create(self, serializer):
        blog_id = self.request.data.get('blog')
        owner = get_object_or_404(Blog,id=blog_id)
        Notification.objects.create(user=self.request.user,admin=owner.author,blog=owner,message=f'{self.request.user} has added a comment to your blog')
        return serializer.save(author=self.request.user)
    
    def perform_update(self, serializer):
        return serializer.save(author = self.request.user)
    
    def destroy(self, request, *args, **kwargs):
        comment_id = kwargs.get('id') #lookupfield
        blog_id = request.data.get("blog")
        blog = get_object_or_404(Blog,id=blog_id)
        comment = get_object_or_404(Comment,id=comment_id,blog = blog_id)
        notification = Notification.objects.get(user=self.request.user,admin=blog.author,blog=blog,message=f'{self.request.user} has added a comment to your blog')
        notification.delete()
        return super().destroy(comment)
    
class BlogCommentsView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request,id):
        blog = get_object_or_404(Blog,id=id)
        serializer = BlogCommentSerializer(blog)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
class AddLike(APIView):
    permission_classes = [IsAuthenticated]
    def post(self,request,id):
        blog = get_object_or_404(Blog,id=id)
        Notification.objects.create(user=self.request.user,admin=blog.author,blog=blog,message=f'{self.request.user} has liked your blog')
        record = Like.objects.filter(blog=blog,author=request.user).first()
        
        if record is not None:
            return Response({"Error":"you cannot make more than one like"},status=status.HTTP_403_FORBIDDEN)
        else:
            Like.objects.create(blog=blog,author=request.user)
            return Response(Like.objects.count(),status=status.HTTP_200_OK)

        
        
class RemoveLike(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self,request,id):
        blog = get_object_or_404(Blog,id=id)
        like = get_object_or_404(Like,blog=blog,author=request.user)
        notification = Notification.objects.get(user=self.request.user,admin=blog.author,blog=blog,message=f'{self.request.user} has liked your blog')
        notification.delete()
        
        like.delete()
        return Response(Like.objects.count(),status=status.HTTP_200_OK)
        
class MyNotifications(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        data = Notification.objects.filter(admin=request.user)
        serializer = NotificationSerializer(data,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

class ClearNotifications(APIView):
    def delete(self,request):
        my_notifiacations = Notification.objects.filter(admin=request.user)
        my_notifiacations.delete()
        return Response({'message':'all the notifications were deleted'})
        