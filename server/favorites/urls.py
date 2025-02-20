from django.urls import path
from . import views
urlpatterns = [
    path('add_place/<int:place_id>/',views.AddToFavorites.as_view(),name='add to my favorites'),
    path('remove_place/<int:place_id>/',views.RemoveFromFavorites.as_view(),name='add to my favorites'),
    path('my_favorites/',views.MyFavorites.as_view(),name='my favorites'),
]