import React from "react";
import globeImg from "../assets/about1.png";
import cardImg from "../assets/about2.png";
import greenBgImg from "../assets/about3.png";
import { useNavigate } from 'react-router-dom';
import LazyLoadSection from "../components/LazyLoading";

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
            <div className="absolute bottom-4 left-[-20px] xs:left-[-30px] sm:left-[-50px] w-40 xs:w-48 sm:w-60 shadow-lg">
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
                className="w-full object-cover h-[600px] sm:h-auto"
                />

                <div className="absolute inset-0 flex flex-col justify-center items-center text-center sm:items-start sm:text-left p-4 sm:p-6 md:px-12 lg:px-20 text-white">
                <div className="max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 sm:mb-4">
                    Energy that Doesn't Cost the Earth
                    </h3>
                    <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                    To get started with the journey to a more sustainable future, click the button below to predict your energy consumption.
                    </p>
                    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 items-center sm:items-start">
                    <button onClick={() => navigate('/wind')} className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 sm:px-5 rounded-full w-full sm:w-auto text-sm sm:text-base">
                        Predict Wind Energy
                    </button>
                    <button onClick={() => navigate('/solar')} className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 sm:px-5 rounded-full w-full sm:w-auto text-sm sm:text-base">
                        Predict Solar Energy
                    </button>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 mt-3 sm:mt-4 items-center sm:items-start">
                    <button onClick={() => navigate('/windoptimize')} className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 sm:px-5 rounded-full w-full sm:w-auto text-sm sm:text-base">
                        Optimize Wind Energy
                    </button>
                    <button onClick={() => navigate('/solaroptimize')} className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 sm:px-5 rounded-full w-full sm:w-auto text-sm sm:text-base">
                        Optimize Solar Energy
                    </button>
                    </div>
                </div>
                </div>
            </div>
      </LazyLoadSection>
    </section>
  );
};

export default About;
