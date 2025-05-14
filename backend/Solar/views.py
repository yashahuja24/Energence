from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from scipy.optimize import differential_evolution
import joblib
import json
import os
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load model and scaler
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'solar_power_model.h5')
SCALER_PATH = os.path.join(BASE_DIR, 'solar_scaler.save')

model = load_model(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)
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


@method_decorator(csrf_exempt, name='dispatch')
class SolarOptimize(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            logger.info("Received request for optimization.")
            print("Received request for solar optimization.")
            data = request.data
            print(f"Received data: {data}")

            # 1. Extract 20 features from frontend
            logger.debug("Extracting features from frontend data.")
            features = [
                float(data["temperature_2_m_above_gnd"]),
                float(data["relative_humidity_2_m_above_gnd"]),
                float(data["mean_sea_level_pressure_MSL"]),
                float(data["total_precipitation_sfc"]),
                float(data["snowfall_amount_sfc"]),
                float(data["total_cloud_cover_sfc"]),
                float(data["high_cloud_cover_high_cld_lay"]),
                float(data["medium_cloud_cover_mid_cld_lay"]),
                float(data["low_cloud_cover_low_cld_lay"]),
                float(data["shortwave_radiation_backwards_sfc"]),
                float(data["wind_speed_10_m_above_gnd"]),
                float(data["wind_direction_10_m_above_gnd"]),
                float(data["wind_speed_80_m_above_gnd"]),
                float(data["wind_direction_80_m_above_gnd"]),
                float(data["wind_speed_900_mb"]),
                float(data["wind_direction_900_mb"]),
                float(data["wind_gust_10_m_above_gnd"]),
                float(data["angle_of_incidence"]),
                float(data["zenith"]),
                float(data["azimuth"])
            ]
            print(f"Extracted features: {features}")

            current_generation = float(data["current_generation"])
            consumption = float(data["consumption"])
            print(f"Current generation: {current_generation}, Consumption: {consumption}")

            deficit = current_generation - consumption
            if deficit >= 0:
                logger.info(f"Power generation is sufficient: deficit is {deficit}.")
                print(f"Power generation is sufficient: deficit is {deficit}.")
                return Response({
                    "status": "sufficient",
                    "message": "Power generation already sufficient.",
                    "current_deficit": deficit
                })

            logger.info("Deficit detected, starting optimization process.")
            print("Deficit detected, starting optimization process.")

            # 2. Load model and scaler
            logger.debug("Loading model and scaler.")
            print("Loading model and scaler.")
            model = tf.keras.models.load_model(MODEL_PATH)
            scaler = joblib.load(SCALER_PATH)
            print("Model and scaler loaded.")

            # 3. Set optimization bounds (±20%)
            logger.debug("Setting optimization bounds based on features.")
            print("Setting optimization bounds based on features.")
            bounds = []
            for val in features:
                low = val * 0.8
                high = val * 1.2
                if low == high:
                    high += 1
                bounds.append((low, high))
            print(f"Optimization bounds: {bounds}")

            # 4. Optimization function
            logger.debug("Starting optimization with differential evolution.")
            print("Starting optimization with differential evolution.")
            def objective(x):
                print(f"Predicting for input: {x}")
                x_scaled = scaler.transform([x])
                pred = model.predict(x_scaled, verbose=0)[0][0]
                penalty = max(0, consumption - pred) * 100
                return -pred + penalty

            # Experiment with reducing maxiter here!
            result = differential_evolution(objective, bounds=bounds, seed=42, maxiter=50) # Changed maxiter to 50
            optimized_input = result.x
            optimized_scaled = scaler.transform([optimized_input])
            predicted_power = model.predict(optimized_scaled, verbose=0)[0][0]
            print(f"Differential evolution result: {result}")
            print(f"Optimized input: {optimized_input}, Predicted power after initial optimization: {predicted_power}")

            if predicted_power > consumption:
                logger.info(f"Predicted power {predicted_power} exceeds consumption {consumption}. Max power optimization starting.")
                print(f"Predicted power {predicted_power} exceeds consumption {consumption}. Max power optimization starting.")

                # 5. Maximize generation
                def max_power(x):
                    print(f"Max Power for input: {x}")
                    x_scaled = scaler.transform([x])
                    return -model.predict(x_scaled, verbose=0)[0][0]

                # Experiment with reducing maxiter here too!
                max_result = differential_evolution(max_power, bounds=bounds, seed=42, maxiter=50) # Changed maxiter to 50
                best_input = max_result.x
                best_scaled = scaler.transform([best_input])
                best_pred = model.predict(best_scaled, verbose=0)[0][0]
                print(f"Max power optimization result: {max_result}")
                print(f"Best input: {best_input}, Best predicted generation: {best_pred}")

                logger.info(f"Optimization successful. Best predicted generation: {best_pred}.")
                print(f"Optimization successful. Best predicted generation: {best_pred}.")

                return Response({
                    "status": "optimized",
                    "message": "Optimized parameters found to exceed consumption.",
                    "optimized_deficit": best_pred - consumption,
                    "predicted_generation": round(best_pred, 4),
                    "optimized_parameters": {
                        "temperature_2_m_above_gnd": round(best_input[0], 2),
                        "relative_humidity_2_m_above_gnd": round(best_input[1], 2),
                        "mean_sea_level_pressure_MSL": round(best_input[2], 2),
                        "total_precipitation_sfc": round(best_input[3], 2),
                        "snowfall_amount_sfc": round(best_input[4], 2),
                        "total_cloud_cover_sfc": round(best_input[5], 2),
                        "high_cloud_cover_high_cld_lay": round(best_input[6], 2),
                        "medium_cloud_cover_mid_cld_lay": round(best_input[7], 2),
                        "low_cloud_cover_low_cld_lay": round(best_input[8], 2),
                        "shortwave_radiation_backwards_sfc": round(best_input[9], 2),
                        "wind_speed_10_m_above_gnd": round(best_input[10], 2),
                        "wind_direction_10_m_above_gnd": round(best_input[11], 2),
                        "wind_speed_80_m_above_gnd": round(best_input[12], 2),
                        "wind_direction_80_m_above_gnd": round(best_input[13], 2),
                        "wind_speed_900_mb": round(best_input[14], 2),
                        "wind_direction_900_mb": round(best_input[15], 2),
                        "wind_gust_10_m_above_gnd": round(best_input[16], 2),
                        "angle_of_incidence": round(best_input[17], 2),
                        "zenith": round(best_input[18], 2),
                        "azimuth": round(best_input[19], 2),
                    }
                })
            else:
                logger.warning("Optimization completed, but predicted generation still below consumption.")
                print("Optimization completed, but predicted generation still below consumption.")
                return Response({
                    "status": "optimized_but_insufficient",
                    "message": "Optimization done, but predicted generation still below consumption.",
                    "predicted_generation": round(predicted_power, 4)
                }, status.HTTP_202_ACCEPTED)

        except Exception as e:
            logger.error(f"Error occurred: {str(e)}")
            print(f"Error occurred: {str(e)}")
            return Response({
                "status": "error",
                "message": str(e)
            }, status.HTTP_500_INTERNAL_SERVER_ERROR)