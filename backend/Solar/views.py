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
@method_decorator(csrf_exempt, name='dispatch')
class Say(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        return Response({'message': 'Hello, world!'}, status=status.HTTP_200_OK)


@method_decorator(csrf_exempt, name="dispatch")
class PredictSolar(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            # Get JSON data
            data = json.loads(request.body)

            # Define the required features (in order)
            feature_names = [
                "temperature_2_m_above_gnd",
                "relative_humidity_2_m_above_gnd",
                "mean_sea_level_pressure_MSL",
                "total_precipitation_sfc",
                "snowfall_amount_sfc",
                "total_cloud_cover_sfc",
                "high_cloud_cover_high_cld_lay",
                "medium_cloud_cover_mid_cld_lay",
                "low_cloud_cover_low_cld_lay",
                "shortwave_radiation_backwards_sfc",
                "wind_speed_10_m_above_gnd",
                "wind_direction_10_m_above_gnd",
                "wind_speed_80_m_above_gnd",
                "wind_direction_80_m_above_gnd",
                "wind_speed_900_mb",
                "wind_direction_900_mb",
                "wind_gust_10_m_above_gnd",
                "angle_of_incidence",
                "zenith",
                "azimuth"
            ]

            # Extract features in order
            input_data = [data[feature] for feature in feature_names]
            input_array = np.array(input_data).reshape(1, -1)

            # Get absolute path to the scaler and model
            SCALER_PATH = os.path.join(settings.BASE_DIR, "Solar", "solar_scaler.save")
            MODEL_PATH = os.path.join(settings.BASE_DIR, "Solar", "solar_power_model.h5")

            # Load scaler and model
            scaler = joblib.load(SCALER_PATH)
            model = tf.keras.models.load_model(MODEL_PATH)
            # Preprocess and predict
            input_scaled = scaler.transform(input_array)
            prediction = model.predict(input_scaled)[0][0]

            return Response({
                "status": "success",
                "predicted_power_kw": float(prediction)
            }, status.HTTP_202_ACCEPTED)

        except Exception as e:
            return Response({
                "status": "error",
                "message": str(e)
            }, status.HTTP_500_INTERNAL_SERVER_ERROR)
