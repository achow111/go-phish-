from django.urls import path
from phish_detector import views

urlpatterns = [
    path('predictor/', views.predict_email_view, name='predict_email'),
]
