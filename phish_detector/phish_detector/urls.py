from django.contrib import admin
from django.urls import path
from . import views  # Import your views (if necessary)

urlpatterns = [
    path('admin/', admin.site.urls),  # Admin route
    # Add other URL patterns here
]
