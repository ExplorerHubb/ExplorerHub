from django.contrib import admin
from .models import City,FamousFood,CateringPlace,EntertainmentPlace,Accommodation,ShoppingMallsPlace
from import_export.admin import ImportExportModelAdmin
# Register your models here.

admin.site.register(City)
admin.site.register(FamousFood)
admin.site.register(CateringPlace)
admin.site.register(EntertainmentPlace)
admin.site.register(Accommodation)
admin.site.register(ShoppingMallsPlace)


