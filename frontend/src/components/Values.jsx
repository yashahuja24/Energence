import React, { useEffect, useState, useRef } from 'react';
// Import icons from react-icons
import { FaHandsHelping, FaTag, FaLeaf } from 'react-icons/fa';

// Animated Leaf Component
const AnimatedLeaf = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const directionRef = useRef({ x: 1, y: 1 });
  const requestRef = useRef();
  const containerRef = useRef(null);
  
  const animate = () => {
    const container = document.querySelector('.values-heading-container');
    if (!container) {
      requestRef.current = requestAnimationFrame(animate);
      return;
    }
    
    const containerRect = container.getBoundingClientRect();
    const maxX = containerRect.width - 30; // Leaf width
    const maxY = containerRect.height - 30; // Leaf height
    
    setPosition(prevPos => {
      // Calculate new position
      let newX = prevPos.x + (directionRef.current.x * 0.5);
      let newY = prevPos.y + (directionRef.current.y * 0.5);
      
      // Check boundaries and change direction if needed
      if (newX >= maxX || newX <= 0) {
        directionRef.current.x = -directionRef.current.x;
      }
      if (newY >= maxY || newY <= 0) {
        directionRef.current.y = -directionRef.current.y;
      }
      
      // Ensure position stays within bounds
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));
      
      return { x: newX, y: newY };
    });
    
    requestRef.current = requestAnimationFrame(animate);
  };
  
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    
    // Handle window resize
    const handleResize = () => {
      // Reset position on resize to avoid getting stuck
      setPosition({ x: 0, y: 0 });
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div 
      className="absolute text-emerald-500"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        animation: 'spin 20s linear infinite',
      }}
    >
      <FaLeaf size="1.5rem" />
    </div>
  );
};

// Updated PlaceholderIcon component to render actual React Icons
const PlaceholderIcon = ({ name }) => {
  let Icon;
  let iconSize = "3rem"; // You can adjust the size as needed

  // Select the icon based on the name prop
  if (name === "Customer Care") {
    Icon = FaHandsHelping;
  } else if (name === "Price") {
    Icon = FaTag;
  } else if (name === "Sustainability") {
    Icon = FaLeaf;
  } else {
    // Fallback for any other case
    return (
      <div className="w-20 h-20 mb-5 flex items-center justify-center text-emerald-600">
        <div className="w-16 h-16 p-2 border-2 border-dashed border-emerald-400 rounded-lg flex items-center justify-center text-center text-xs">
          {name} Icon
        </div>
      </div>
    );
  }

  return (
    <div className="w-20 h-20 mb-5 flex items-center justify-center text-emerald-600">
      <Icon size={iconSize} />
    </div>
  );
};

const Values = () => {
  const valuesData = [
    {
      iconName: "Customer Care",
      title: "Customer Care",
      description:
        "We're committed to guiding you at every step, from understanding your energy needs to helping you make smarter, greener choices. Reliable, responsive, and here for you always.",
    },
    {
      iconName: "Price",
      title: "Price",
      description:
        "Our AI energy tools are completely free. We believe in empowering everyone to contribute to a greener future NO CHARGES, just impact.",
    },
    {
      iconName: "Sustainability",
      title: "Sustainability",
      description:
        "We help optimize your energy usage using AI, reducing waste and supporting a cleaner planet. Smarter consumption, sustainable living.",
    },
  ];

  return (
    <section id="values" className="py-16 bg-white">
      <div className="px-4 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
        <div className="text-center mb-12 relative values-heading-container">
          <AnimatedLeaf />
          <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl font-sans">
            Our values
          </h2>
          <p className="mt-5 text-lg text-gray-600 font-sans">
            Guiding our actions, defining our purpose.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {valuesData.map((value, index) => (
            <div
              key={index}
              className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 shadow-md text-center flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <PlaceholderIcon name={value.iconName} />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3 font-sans">
                {value.title}
              </h3>
              <p className="text-base text-gray-700 leading-relaxed font-sans">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;