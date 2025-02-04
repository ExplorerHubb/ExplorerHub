from django.urls import path
from . import views
urlpatterns = [
    path('register/',views.RegisterView.as_view(),name='Register'),
    path('login/',views.LoginView.as_view(),name='login'),
    path('logout/',views.LogoutView.as_view(),name='logout'),
    path('user/<int:pk>/',views.AccountList.as_view(),name='user_account'),
    path('update_user/<int:id>/',views.UpdateView.as_view(),name='update_account'),
]