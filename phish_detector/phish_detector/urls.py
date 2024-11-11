from django.contrib import admin
from django.urls import path, include
from . import views  # Import your views (if necessary)

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', include('api.urls')),
    path('predictor/', views.predict_email, name='predict_email'),
]
