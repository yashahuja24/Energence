import React from 'react';
import backgroundImage from '../assets/heroimage.png';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div 
        id="home"
      className="relative bg-cover bg-center text-white py-20 px-4 md:px-10 lg:px-20 min-h-[calc(100vh-80px)] flex flex-col justify-center items-start"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-10"></div>

      <div className="relative z-10 max-w-3xl">

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Predict. Optimize. Energize.
        </h1>

        <p className="text-lg md:text-xl mb-10 max-w-xl">
        Energence combines advanced forecasting and smart optimization to help you take control of your energy. With powerful machine learning models, we predict usage patterns and optimize consumption saving energy, cutting costs, and building a more sustainable future.
        </p>

        <div className="flex flex-col space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4">
          <button
            onClick={() => navigate('/wind')}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-md text-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Predict Wind Energy Consumption
          </button>
          <button
            onClick={() => navigate('/windoptimize')}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-md text-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Optimize Wind Energy Consumption
          </button>
          <button
            onClick={() => navigate('/solar')}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-md text-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Predict Solar Energy Consumption
          </button>
          <button
            onClick={() => navigate('/solaroptimize')}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-8 rounded-md text-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Optimize Solar Energy Consumption
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
