from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'Historical', views.HistoricalPlacesView, basename='Historical_places')
router.register(r'Natural',views.NaturalPlacesView,basename='Natural_places')
router.register(r'Beach',views.BeachPlacesView,basename='Beach_places')
router.register(r'Religon',views.ReligonPlacesView,basename='Religon_places')
router.register(r'Modern',views.ModernPlacesView,basename='Modern_places')
router.register(r'Desert',views.DessertPlacesView,basename='Dessert_places')
urlpatterns = [
    path('api/', include(router.urls)),
   
]