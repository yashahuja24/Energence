from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import numpy as np
import tensorflow as tf
import joblib
import json
import os

# Create your views here.
# Create your views here.
@method_decorator(csrf_exempt, name='dispatch')
class Say(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        return Response({'message': 'Hello, world!'}, status=status.HTTP_200_OK)
