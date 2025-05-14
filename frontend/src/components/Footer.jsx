import React from 'react';
import { FaLeaf } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id="contact-us" className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Logo and top section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div className="mb-6 md:mb-0">
            {/* Placeholder for logo - replace with your actual logo */}
            <div className="w-36 h-16 bg-gray-700 flex items-center justify-center mb-2">
              <FaLeaf className="text-emerald-400 text-2xl mr-2" />
              <span className="text-xl font-bold">Energence</span>
            </div>
          </div>
          
          {/* Newsletter subscription */}
          <div className="w-full md:w-auto">
            <p className="text-sm mb-2">Need assistance?</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address..."
                className="bg-gray-700 text-white px-4 py-2 rounded-l-lg focus:outline-none w-full md:w-64"
              />
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-r-lg transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
        
        {/* Navigation links */}
        <div className="flex flex-wrap justify-start gap-8 mb-10">
          <a href="#" className="hover:text-emerald-400 transition-colors">Home</a>
          <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
          <a href="#values" className="hover:text-emerald-400 transition-colors">Values</a>
        </div>
        
        {/* Divider */}
        <hr className="border-gray-700 mb-8" />
        
        {/* Bottom section with legal links and copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <span className="hidden md:inline">|</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="hidden md:inline">|</span>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            <span className="hidden md:inline">|</span>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
          </div>
          <div>
            <p>Copyright 2023 - Energence AI Ltd</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;