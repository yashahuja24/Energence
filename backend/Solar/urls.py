from django.urls import path
from .views import Say, PredictSolar, SolarOptimize
urlpatterns = [
    path('', Say.as_view(), name='say'),
    path('predict', PredictSolar.as_view()),
    path('optimize',SolarOptimize.as_view()),

]
     