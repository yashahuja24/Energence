import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes, FaLeaf } from 'react-icons/fa';

// Animated Leaf Component
const AnimatedLeaf = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const directionRef = useRef({ x: 1, y: 1 });
  const requestRef = useRef();
  
  const animate = () => {
    const container = document.querySelector('.nav-logo-container');
    if (!container) {
      requestRef.current = requestAnimationFrame(animate);
      return;
    }
    
    const containerRect = container.getBoundingClientRect();
    const maxX = containerRect.width - 20; // Leaf width
    const maxY = containerRect.height - 20; // Leaf height
    
    setPosition(prevPos => {
      let newX = prevPos.x + (directionRef.current.x * 0.5);
      let newY = prevPos.y + (directionRef.current.y * 0.5);
      
      if (newX >= maxX || newX <= 0) {
        directionRef.current.x = -directionRef.current.x;
      }
      if (newY >= maxY || newY <= 0) {
        directionRef.current.y = -directionRef.current.y;
      }
      
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));
      
      return { x: newX, y: newY };
    });
    
    requestRef.current = requestAnimationFrame(animate);
  };
  
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <FaLeaf
      className="text-teal-200 absolute transform -translate-y-1/2 transition-colors duration-300"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`w-full z-[100] transition-all duration-300 bg-teal-600 ${scrolled ? 'shadow-lg' : ''}`}>
      <div className="container mx-auto flex justify-between items-center p-3"> {/* Adjusted padding */}
        <div className="text-2xl font-bold nav-logo-container relative h-12 w-40">
          <a href="#home" className="text-white font-semibold flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
            <AnimatedLeaf />
            <span className="font-poppins">Energence</span>
          </a>
        </div>

        <div className="hidden md:flex space-x-6 items-center"> {/* Adjusted space between items */}
          {['Home', 'About', 'Values', 'Contact Us'].map((item) => (
            <a
            key={item}
            href={`#${item.toLowerCase().replace(' ', '-')}`}
            className="text-white relative group py-2 hover:scale-110 transition-transform duration-300" 
          >
            <span className="relative z-10 hover:text-teal-200 transition-colors duration-300">
              {item}
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-200 group-hover:w-full transition-all duration-300"></span>
          </a>
          ))}
        </div>

        <div className="hidden md:flex flex-col items-end group cursor-pointer">
          <span className="text-sm text-teal-200">Call Us</span>
          <span className="text-xl font-semibold text-white group-hover:text-teal-200 transition-colors duration-300">
            +91 70038 68040
          </span>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-teal-200 transition-colors duration-300 focus:outline-none"
          >
            {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="flex flex-col space-y-4 items-center p-4">
          {['Home', 'About', 'Values', 'Contact Us'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-white hover:text-teal-200 transition-colors duration-300 flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <FaLeaf className="text-teal-200" />
              <span>{item}</span>
            </a>
          ))}
          <div className="mt-4 text-center group cursor-pointer">
            <span className="text-sm block text-teal-200">Call Us</span>
            <span className="text-xl font-semibold block text-white group-hover:text-teal-200 transition-colors duration-300">
              +91 70038 68040
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;