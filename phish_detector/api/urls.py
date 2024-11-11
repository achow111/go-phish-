# urls.py
from django.urls import path, include
from .views import EmployeeListCreate, EmployeeDetail, register, check_credentials, update_barrel, update_fish

urlpatterns = [
    # List all employees or create a new employee (GET, POST)
    path('api/employees/', EmployeeListCreate.as_view(), name='employee-list-create'),
    
    # Retrieve, update, or delete a specific employee (GET, PUT, PATCH, DELETE)
    path('api/employees/<int:pk>/', EmployeeDetail.as_view(), name='employee-detail'),
    path('api/register/', register, name='register'),
    path('api/check_credentials/', check_credentials, name='check_credentials'),
    path('api/update_barrel/', update_barrel, name='update_barrel'),
    path('api/update-fish/', update_fish, name='update fish'),
    path('api/', include('predictor.urls'))
]
