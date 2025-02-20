from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter
router = DefaultRouter()
router.register(r'city',views.CityNamesView,basename='cities_names')

urlpatterns=[
    path('city/<str:name>/',views.CityView.as_view(),name='city_details'),
    # path('city/<str:name>/catering/',views.CityCateringView.as_view(),name='city_catering_details'),
    # path('city/<str:name>/entertainment/',views.CityEntertainmentView.as_view(),name='city_entertainment_details'),
    path('city/<str:name>/shopping/',views.ShoppingView.as_view(),name='city_shopping_details'),
    # path('city/<str:name>/accommodation/',views.AccommodationView.as_view(),name='city_accommodation_details'),
    path('<int:city_id>/catering/<str:type>/',views.CateringCategoriesView.as_view(),name='catering_categories_filters'),
    path('<int:city_id>/accommodation/<str:type>/',views.AccomodationCategoriesView.as_view(),name='accommodation_categories_filters'),
    path('<int:city_id>/entertainment/<str:type>/',views.EntertainmentCategoriesView.as_view(),name='entertainment_categories_filters'),
    path('',include(router.urls)),  
        ]