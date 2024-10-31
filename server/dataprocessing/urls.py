from django.urls import path
from . import views
urlpatterns = [
    path('hello/', views.hello),
    path('typeconvert/', views.type_inference)
    
]