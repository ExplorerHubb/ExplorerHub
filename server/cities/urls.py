from django.urls import path,include
from . import views
urlpatterns=[
    path('city/<str:name>/',views.CityView.as_view(),name='city_details'),
    path('city/<str:name>/catering/',views.CityCateringView.as_view(),name='city_catering_details'),
    path('city/<str:name>/entertainment/',views.CityEntertainmentView.as_view(),name='city_entertainment_details'),
    ]