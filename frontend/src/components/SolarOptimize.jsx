import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const initialFormDataState = {
  temperature_2_m_above_gnd: null,
  relative_humidity_2_m_above_gnd: null,
  mean_sea_level_pressure_MSL: null,
  total_precipitation_sfc: null,
  snowfall_amount_sfc: null,
  total_cloud_cover_sfc: null,
  high_cloud_cover_high_cld_lay: null,
  medium_cloud_cover_mid_cld_lay: null,
  low_cloud_cover_low_cld_lay: null,
  shortwave_radiation_backwards_sfc: null,
  wind_speed_10_m_above_gnd: null,
  wind_direction_10_m_above_gnd: null,
  wind_speed_80_m_above_gnd: null,
  wind_direction_80_m_above_gnd: null,
  wind_speed_900_mb: null,
  wind_direction_900_mb: null,
  wind_gust_10_m_above_gnd: null,
  angle_of_incidence: null,
  zenith: null,
  azimuth: null,
  current_generation: null,
  consumption: null
};

const SolarOptimize = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialFormDataState);
  const [response, setResponse] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = [
    { id: 'temperature_2_m_above_gnd', question: 'Temperature 2m above ground (°C)', type: 'number', placeholder: 'Enter temperature' },
    { id: 'relative_humidity_2_m_above_gnd', question: 'Relative Humidity 2m above ground (%)', type: 'number', placeholder: 'Enter humidity' },
    { id: 'mean_sea_level_pressure_MSL', question: 'Mean Sea Level Pressure (hPa)', type: 'number', placeholder: 'Enter pressure' },
    { id: 'total_precipitation_sfc', question: 'Total Precipitation (mm)', type: 'number', placeholder: 'Enter precipitation' },
    { id: 'snowfall_amount_sfc', question: 'Snowfall Amount (mm)', type: 'number', placeholder: 'Enter snowfall' },
    { id: 'total_cloud_cover_sfc', question: 'Total Cloud Cover (%)', type: 'number', placeholder: 'Enter cloud cover' },
    { id: 'high_cloud_cover_high_cld_lay', question: 'High Cloud Cover (%)', type: 'number', placeholder: 'Enter high cloud cover' },
    { id: 'medium_cloud_cover_mid_cld_lay', question: 'Medium Cloud Cover (%)', type: 'number', placeholder: 'Enter medium cloud cover' },
    { id: 'low_cloud_cover_low_cld_lay', question: 'Low Cloud Cover (%)', type: 'number', placeholder: 'Enter low cloud cover' },
    { id: 'shortwave_radiation_backwards_sfc', question: 'Shortwave Radiation Backwards (W/m²)', type: 'number', placeholder: 'Enter radiation' },
    { id: 'wind_speed_10_m_above_gnd', question: 'Wind Speed 10m above ground (m/s)', type: 'number', placeholder: 'Enter wind speed' },
    { id: 'wind_direction_10_m_above_gnd', question: 'Wind Direction 10m above ground (°)', type: 'number', placeholder: 'Enter wind direction' },
    { id: 'wind_speed_80_m_above_gnd', question: 'Wind Speed 80m above ground (m/s)', type: 'number', placeholder: 'Enter wind speed' },
    { id: 'wind_direction_80_m_above_gnd', question: 'Wind Direction 80m above ground (°)', type: 'number', placeholder: 'Enter wind direction' },
    { id: 'wind_speed_900_mb', question: 'Wind Speed 900mb (m/s)', type: 'number', placeholder: 'Enter wind speed' },
    { id: 'wind_direction_900_mb', question: 'Wind Direction 900mb (°)', type: 'number', placeholder: 'Enter wind direction' },
    { id: 'wind_gust_10_m_above_gnd', question: 'Wind Gust 10m above ground (m/s)', type: 'number', placeholder: 'Enter wind gust' },
    { id: 'angle_of_incidence', question: 'Angle of Incidence (°)', type: 'number', placeholder: 'Enter angle' },
    { id: 'zenith', question: 'Zenith (°)', type: 'number', placeholder: 'Enter zenith' },
    { id: 'azimuth', question: 'Azimuth (°)', type: 'number', placeholder: 'Enter azimuth' },
    { id: 'current_generation', question: 'Current Generation (kW)', type: 'number', placeholder: 'Enter current generation' },
    { id: 'consumption', question: 'Consumption (kW)', type: 'number', placeholder: 'Enter consumption' }
  ];

  const variants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (value) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentQuestionId = questions[questions.length - 1].id;
    if (!formData[currentQuestionId] && String(formData[currentQuestionId]).trim() === '') {
        setErrors({
            ...errors,
            [currentQuestionId]: 'Please enter the value, this field is required.'
        });
        return;
    }

    try {
      const res = await axios.post('http://localhost:8000/solar/optimize', formData);
      setResponse(res.data);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form', error);
      setErrors({ ...errors, submit: 'Failed to submit the form. Please try again.' });
    }
  };

  const nextStep = () => {
    const currentQuestion = questions[step];
    if (!formData[currentQuestion.id]) {
      setErrors({
        ...errors,
        [currentQuestion.id]: 'Please enter the value, all values are required.'
      });
      return;
    }
    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const isCurrentFieldFilled = () => {
    const currentQuestion = questions[step];
    return Boolean(formData[currentQuestion.id]);
  };

  const renderField = (question) => {
    return (
      <div>
        <input
          type={question.type}
          name={question.id}
          value={formData[question.id] || ''}
          onChange={handleChange}
          placeholder={question.placeholder}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
        {errors[question.id] && <p className="text-red-500 text-sm mt-1">{errors[question.id]}</p>}
      </div>
    );
  };

  const handleMakeAnotherPrediction = () => {
    setIsSubmitted(false);
    setStep(0);
    setFormData(initialFormDataState);
    setResponse(null);
    setErrors({});
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl">
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30, transition: { duration: 0.3 } }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
              <div className="text-right text-sm text-gray-500 mt-2">
                Question {step + 1} of {questions.length}
              </div>
            </div>

            <div className="min-h-[200px] flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.4 }}
                  className="flex-1"
                >
                  <h3 className="text-xl font-semibold mb-4 text-gray-800">
                    {questions[step].question}
                  </h3>
                  {renderField(questions[step])}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                className={`px-4 py-2 rounded-md ${
                  step === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                disabled={step === 0}
              >
                Back
              </button>
              
              {step === questions.length - 1 ? (
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-md ${
                    isCurrentFieldFilled()
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                      : 'bg-emerald-300 text-white cursor-not-allowed'
                  }`}
                  disabled={!isCurrentFieldFilled()}
                >
                  Submit
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  className={`px-4 py-2 rounded-md ${
                    isCurrentFieldFilled()
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                      : 'bg-emerald-300 text-white cursor-not-allowed'
                  }`}
                  disabled={!isCurrentFieldFilled()}
                >
                  Next
                </button>
              )}
            </div>
             {errors.submit && <p className="text-red-500 text-sm mt-2 text-center">{errors.submit}</p>}
          </motion.form>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            className="text-gray-700"
          >
            <h2 className="text-2xl font-bold mb-6 text-emerald-600 text-center">Optimization Details</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Submitted Information:</h3>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm max-h-60 overflow-y-auto">
                <ul className="space-y-2">
                  {Object.entries(formData).map(([key, value]) => {
                    if (value === null || String(value).trim() === '') return null;
                    const questionLabel = questions.find(q => q.id === key)?.question || key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                    return (
                      <li key={key} className="flex justify-between">
                        <span className="font-medium text-gray-600">{questionLabel}:</span>
                        <span className="text-gray-800">{String(value)}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {response && (
              <>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Optimization Result:</h3>
                  <div className="p-4 border border-emerald-500 rounded-lg bg-emerald-50 shadow-sm space-y-2">
                    <p className="flex justify-between"><span className="font-medium">Status:</span> <span className="text-emerald-700">{response.status}</span></p>
                    <p className="flex justify-between"><span className="font-medium">Message:</span> <span className="text-gray-700 text-sm">{response.message}</span></p>
                    {response.predicted_generation !== undefined && (
                      <p className="flex justify-between"><span className="font-medium">Predicted Generation (kW):</span> <span className="text-emerald-700 font-semibold">{response.predicted_generation.toFixed(2)}</span></p>
                    )}
                    {response.optimized_deficit !== undefined && (
                      <p className="flex justify-between"><span className="font-medium">Optimized Deficit (kW):</span> <span className="text-emerald-700 font-semibold">{response.optimized_deficit.toFixed(2)}</span></p>
                    )}
                  </div>
                </div>

                {response.optimized_parameters && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Optimized Parameters:</h3>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-sm max-h-60 overflow-y-auto">
                      <ul className="space-y-2">
                        {Object.entries(response.optimized_parameters).map(([key, value]) => {
                          const questionLabel = questions.find(q => q.id === key)?.question || key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                          return (
                            <li key={key} className="flex justify-between">
                              <span className="font-medium text-gray-600">{questionLabel}:</span>
                              <span className="text-gray-800">{String(value)}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                )}
              </>
            )}
            {errors.submit && !response && <p className="text-red-500 text-sm mt-2 mb-4 text-center">{errors.submit}</p>}


            <button
              type="button"
              onClick={handleMakeAnotherPrediction}
              className="w-full px-6 py-3 rounded-md bg-emerald-500 text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 transition-colors duration-150"
            >
              Make Another Prediction
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SolarOptimize; 