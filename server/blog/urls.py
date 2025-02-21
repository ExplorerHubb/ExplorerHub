from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views


router = DefaultRouter()
router.register(r'Blog',views.CreateBlog,basename='create_blog')
router.register(r'Comment',views.CommentView,basename='create_comment')




urlpatterns = [
    path('',include(router.urls)),
    path('blog_comments/<int:id>/',views.BlogCommentsView.as_view(),name='blog_comments'),
    path('add_like/<int:id>/',views.AddLike.as_view(),name='add_like'),
    path('remove_like/<int:id>/',views.RemoveLike.as_view(),name='remove_like'),
    path('my_notifications/',views.MyNotifications.as_view(),name='my_notifications'),
    path('clear_notifications/',views.ClearNotifications.as_view(),name='clear_notifications'),
]