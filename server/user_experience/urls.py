from django.urls import path
from . import views
urlpatterns = [
    path('my_experience/',views.MyExperience.as_view(),name='my_experience'),
    path('Recommended_places/',views.GetUserPlace.as_view(),name='Recommended_places'),
    path('add_experience/<str:experience>/',views.AddExperience.as_view(),name='add_experience'),
    path('delete_experience/<str:experience>/',views.RemoveExperience.as_view(),name='remove_experience'),
]