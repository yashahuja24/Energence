from django.urls import path
from .views import Say
urlpatterns = [
    path('', Say.as_view(), name='say'),

]
     