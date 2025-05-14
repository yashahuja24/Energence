import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Values from '../components/Values';
import Footer from '../components/Footer';
import LazyLoadSection from '../components/LazyLoading';

const Home = () => {
  return (
    <>
      <Navbar />
      <LazyLoadSection className="bg-gray-100">
        <Hero />
      </LazyLoadSection>
      <LazyLoadSection className="bg-gray-100">
        <About />
      </LazyLoadSection>
      <LazyLoadSection className="bg-gray-100">
        <Values />
      </LazyLoadSection>
      <Footer />
    </>
  );
};

export default Home;