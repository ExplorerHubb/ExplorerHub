from django.contrib import admin
from .models import City,FamousFood,CateringPlace
from import_export.admin import ImportExportModelAdmin
# Register your models here.

admin.site.register(City)
admin.site.register(FamousFood)
admin.site.register(CateringPlace)

