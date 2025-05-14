from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
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


@method_decorator(csrf_exempt, name="dispatch")
class PredictWind(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            # Parse JSON input
            data = json.loads(request.body)

            # Required features in correct order (excluding Time and Power)
            feature_names = [
                "temperature_2m",
                "relativehumidity_2m",
                "dewpoint_2m",
                "windspeed_10m",
                "windspeed_100m",
                "winddirection_10m",
                "winddirection_100m",
                "windgusts_10m"
            ]

            # Extract features
            input_data = [data[feature] for feature in feature_names]
            input_array = np.array(input_data).reshape(1, -1)

            # Get absolute path to the scaler and model
            SCALER_PATH = os.path.join(settings.BASE_DIR, "Wind", "wind_scaler.save")
            MODEL_PATH = os.path.join(settings.BASE_DIR, "Wind", "wind_power_model.h5")

            # Load scaler and model
            scaler = joblib.load(SCALER_PATH)
            model = tf.keras.models.load_model(MODEL_PATH)

            # Preprocess and predict
            input_scaled = scaler.transform(input_array)
            prediction = model.predict(input_scaled)[0][0]

            return Response({
                "status": "success",
                "predicted_power_kw": float(prediction)
            },status.HTTP_202_ACCEPTED)

        except Exception as e:
            return Response({
                "status": "error",
                "message": str(e)
            }, status.HTTP_500_INTERNAL_SERVER_ERROR)