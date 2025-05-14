from django.urls import path
from .views import Say, PredictSolar
urlpatterns = [
    path('', Say.as_view(), name='say'),
    path('predict', PredictSolar.as_view() )

]
     