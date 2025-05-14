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
from tensorflow.keras.models import load_model
from scipy.optimize import differential_evolution
import os

# Load model and scaler
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'wind_power_model.h5')
SCALER_PATH = os.path.join(BASE_DIR, 'wind_scaler.save')

model = load_model(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

# Feature order
FEATURE_NAMES = [
    "temperature_2m", "relativehumidity_2m", "dewpoint_2m", "windspeed_10m",
    "windspeed_100m", "winddirection_10m", "winddirection_100m", "windgusts_10m"
]

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
        

@method_decorator(csrf_exempt, name='dispatch')
class WindOptimize(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            data = request.data

            # Extract current generation and consumption
            current_generation = float(data.get("current_generation", 0))
            consumption = float(data.get("consumption", 0))

            if (current_generation - consumption) >= 0:
                return Response({
                    "status": "ok",
                    "message": "No optimization needed. Power generation is already sufficient.",
                    "power_difference": current_generation - consumption
                })

            # Extract features
            initial_values = [float(data.get(feature, 0)) for feature in FEATURE_NAMES]

            def predict_power(x):
                scaled = scaler.transform([x])
                pred = model.predict(scaled, verbose=0)[0][0]
                return -pred  # minimize negative => maximize prediction

            # Bounds for each parameter (keep realistic)
            bounds = [
                (20, 50),     # temperature_2m
                (10, 100),    # relativehumidity_2m
                (0, 30),      # dewpoint_2m
                (0, 20),      # windspeed_10m
                (0, 30),      # windspeed_100m
                (0, 360),     # winddirection_10m
                (0, 360),     # winddirection_100m
                (0, 25),      # windgusts_10m
            ]

            # Run optimization starting from current values
            result = differential_evolution(predict_power, bounds, seed=42)

            # Final best prediction
            best_input = result.x
            best_scaled = scaler.transform([best_input])
            predicted_power = model.predict(best_scaled, verbose=0)[0][0]

            return Response({
                "status": "ok",
                "optimized_parameters": dict(zip(FEATURE_NAMES, best_input)),
                "predicted_generation": predicted_power,
                "consumption": consumption,
                "power_difference": predicted_power - consumption
            })

        except Exception as e:
            return Response({
                "status": "error",
                "message": str(e)
            })

# Create your views here.