from django.urls import path
from . import views
urlpatterns = [
    path('user_experience/',views.AddExperience.as_view(),name='add_experience'),
    path('Recommended_places/',views.GetUserPlace.as_view(),name='Recommended_places'),
]