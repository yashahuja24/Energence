import React from "react";
import globeImg from "../assets/about1.png";
import cardImg from "../assets/about2.png";
import greenBgImg from "../assets/about3.png";
import { useNavigate } from 'react-router-dom';
import LazyLoadSection from "./LazyLoading";

const About = () => {
  const navigate = useNavigate();
  return (
    <section id="about" className="bg-white">
        <LazyLoadSection className="bg-gray-100">
        <div className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Predict. Optimize. Energize.
            </h2>
            <p className="text-gray-600 mb-6 max-w-xl">
                At Energence, we are building the next generation of smart energy systems through advanced machine learning. Our platform uses a dual-model architecture - one model to predict future energy usage, and another to optimize consumption in real-time. By combining accurate forecasting with intelligent optimization, we help users make informed energy decisions, reduce costs, and support a more sustainable planet. Whether you're managing a home, building, or grid - Energence turns data into efficiency.
            </p>
            <ul className="space-y-2">
                <li><span className="text-green-500 font-semibold">01 /</span> Accurate forecasting of future energy usage</li>
                <li><span className="text-green-500 font-semibold">02 /</span> Real-time optimization to reduce energy waste</li>
                <li><span className="text-green-500 font-semibold">03 /</span> Dual-model architecture built with machine learning</li>
                <li><span className="text-green-500 font-semibold">04 /</span> Designed for homes, businesses, and smart grids</li>
            </ul>
            </div>

            <div className="relative w-full max-w-md mx-auto">
            <img
                src={globeImg}
                alt="Globe with solar panel"
                className="rounded-xl w-full"
            />
            <div className="absolute bottom-8 left-[-50px] w-52 sm:w-60 shadow-lg">
                <img
                src={cardImg}
                alt="Info card"
                className="rounded-md"
                />
            </div>
            </div>
        </div>
        </LazyLoadSection>
        <LazyLoadSection className="bg-gray-100">
      <div className="relative w-full">
        <img
          src={greenBgImg}
          alt="Green background with windmill"
          className="w-full object-cover"
        />

        <div className="absolute inset-0 flex flex-col justify-center px-6 lg:px-20 text-white max-w-4xl">
          <h3 className="text-2xl lg:text-3xl font-semibold mb-4">
            Energy that Doesn't Cost the Earth
          </h3>
          <p className="mb-6">
            To get started with the journey to a more sustainable future, click the button below to predict your energy consumption.
          </p>
          <button onClick={() => navigate('/wind')} className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-5 rounded-full w-fit">
            Predict Wind Energy Consumption
          </button>
          <button onClick={() => navigate('/solar')} className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-5 rounded-full w-fit mt-5">
            Predict Solar Energy Consumption
          </button>
        </div>
      </div>
      </LazyLoadSection>
    </section>
  );
};

export default About;
