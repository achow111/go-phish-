from django.contrib import admin
<<<<<<< Updated upstream
from django.urls import path
from . import views  # Import your views (if necessary)

urlpatterns = [
    path('admin/', admin.site.urls),  # Admin route
    # Add other URL patterns here
=======
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include('api.urls')),
>>>>>>> Stashed changes
]
