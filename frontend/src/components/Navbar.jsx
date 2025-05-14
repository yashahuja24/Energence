import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-teal-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <a href="#home" className="text-gray-700 font-semibold flex items-center justify-center rounded p-2">
            Energence
          </a>
        </div>

        <div className="hidden md:flex space-x-6 items-center">
          <a href="#home" className="hover:text-teal-200">Home</a>
          <a href="#about" className="hover:text-teal-200">About</a>
          <a href="#values" className="hover:text-teal-200">Values</a>
          <a href="#contact" className="hover:text-teal-200">Contact Us</a>
        </div>

        <div className="hidden md:flex flex-col items-end">
          <span className="text-sm">Call Us</span>
          <span className="text-xl font-semibold">+91 70038 68040</span>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4">
          <div className="flex flex-col space-y-4 items-center">
            <a href="#home" className="hover:text-teal-200 block" onClick={() => setIsOpen(false)}>Home</a>
            <a href="#about" className="hover:text-teal-200 block" onClick={() => setIsOpen(false)}>About</a>
            <a href="#values" className="hover:text-teal-200 block" onClick={() => setIsOpen(false)}>Values</a>
            <a href="#contact" className="hover:text-teal-200 block" onClick={() => setIsOpen(false)}>Contact Us</a>
            <div className="mt-4 text-center">
              <span className="text-sm block">Call Us</span>
              <span className="text-xl font-semibold block">+91 70038 68040</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
