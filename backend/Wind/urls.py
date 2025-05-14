from django.urls import path
from .views import Say, PredictWind, WindOptimize
urlpatterns = [
    path('', Say.as_view(), name='say'),
    path('predict', PredictWind.as_view()),
    path('optimize',WindOptimize.as_view()),

]
     