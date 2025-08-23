import React from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../../assets/logo.jpg'

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* NAVBAR */}
      <header className="flex justify-between items-center px-8 py-6 shadow-sm bg-white">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Global Vacations" className="h-10 w-auto" />
          <span className="text-xl font-bold text-gray-800">Global Vacations</span>
        </div>
        <nav className="hidden md:flex space-x-8 text-sm">
          <a href="#features" className="hover:text-blue-600 transition">Features</a>
          <a href="#how-it-works" className="hover:text-blue-600 transition">How It Works</a>
          <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
        </nav>
        <div className="space-x-4">
          <button
            onClick={handleLogin}
            className="text-sm text-gray-800 hover:text-blue-600 transition"
          >
            Login
          </button>
          <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-700 transition">
            Get Started
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative bg-cover bg-center h-[90vh]" style={{ backgroundImage: "url('/hero-luxury.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 max-w-6xl mx-auto h-full flex items-center px-8">
          <div className="text-white max-w-xl">
            <h1 className="text-5xl font-semibold leading-tight mb-4">
              Craft Elite Travel Experiences
            </h1>
            <p className="text-lg mb-6">
              Tailored itinerary solutions for high-end travel agencies serving VIP clients globally.
            </p>
            <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition">
              Build Itinerary Now
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 bg-gray-50 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Luxury-Level Features</h2>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <img src="/icons/itinerary.svg" alt="Itinerary Builder" className="mx-auto h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Elegant Itinerary Builder</h3>
              <p className="text-gray-600">Design sleek, premium itineraries your clients will remember.</p>
            </div>
            <div>
              <img src="/icons/dashboard.svg" alt="Admin Dashboard" className="mx-auto h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">VIP-Level Management</h3>
              <p className="text-gray-600">Advanced dashboard to manage your elite clientele effortlessly.</p>
            </div>
            <div>
              <img src="/icons/multi.svg" alt="Multi-Destination" className="mx-auto h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Multi-Destination Journeys</h3>
              <p className="text-gray-600">Craft multi-leg luxury escapes with precision and style.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl text-blue-600 font-bold mb-2">1</div>
              <h4 className="font-semibold text-lg mb-2">Register Your Agency</h4>
              <p className="text-gray-600">Secure onboarding for high-profile travel professionals.</p>
            </div>
            <div>
              <div className="text-4xl text-blue-600 font-bold mb-2">2</div>
              <h4 className="font-semibold text-lg mb-2">Design Itinerary</h4>
              <p className="text-gray-600">Use our luxury-focused builder to curate unforgettable trips.</p>
            </div>
            <div>
              <div className="text-4xl text-blue-600 font-bold mb-2">3</div>
              <h4 className="font-semibold text-lg mb-2">Deliver in Style</h4>
              <p className="text-gray-600">Export or share custom itineraries with your VIP clients instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 py-16 text-white text-center">
        <h2 className="text-3xl font-semibold mb-4">Impress Your Clients with Global Vacations</h2>
        <p className="mb-6 text-lg">Join the elite agencies redefining premium travel.</p>
        <button className="bg-white text-blue-700 font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition">
          Request Demo
        </button>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-gray-900 text-white py-10 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start">
          <div className="mb-6 md:mb-0">
            <img src="/logo.png" alt="Global Vacations" className="h-10 mb-3" />
            <p className="text-gray-400 text-sm">© 2025 Global Vacations. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
