from django.contrib import admin
from .models import Blog,Comment,Like,Notification
# Register your models here.


admin.site.register(Blog)
admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(Notification)