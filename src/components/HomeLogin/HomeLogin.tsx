import React from "react";
import { useNavigate } from "react-router-dom";

import logo from '../../assets/logo.jpg'

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleGetStarted = () => {
    navigate("/signup");
  };

  const handleRequestDemo = () => {
    alert("Demo request functionality coming soon!");
  };

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5 md:py-6">
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Global Vacations Logo"
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="text-2xl font-bold tracking-wide text-gray-800 select-none">
              Global Vacations
            </span>
          </div>

          <nav className="hidden md:flex space-x-10 text-sm font-medium">
            <a
              href="#features"
              className="text-gray-700 hover:text-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-700 hover:text-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
            >
              How It Works
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-6 text-sm">
            <button
              onClick={handleLogin}
              className="text-gray-800 hover:text-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
            >
              Login
            </button>
            <button
              onClick={handleGetStarted}
              className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        className="relative bg-cover bg-center h-[90vh] flex items-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/bf/48/2c/bf482cf0d29316b45f460de056b2dae0.jpg')",
        }}
        aria-label="Hero section with luxury travel image"
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative max-w-5xl mx-auto px-6 md:px-12 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold max-w-xl leading-tight mb-6 drop-shadow-lg">
            Craft Elite Travel Experiences
          </h1>
          <p className="text-lg md:text-xl max-w-md mb-8 drop-shadow-md">
            Tailored itinerary solutions for high-end travel agencies serving
            VIP clients globally.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition focus:outline-none focus:ring-4 focus:ring-blue-300"
            aria-label="Build Itinerary Now"
          >
            Build Itinerary Now
          </button>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        id="features"
        className="py-20 bg-gray-50 px-6 sm:px-12 lg:px-24"
        aria-labelledby="features-title"
      >
        <h2
          id="features-title"
          className="text-3xl font-bold text-center mb-16 tracking-tight text-gray-900"
        >
          Luxury-Level Features
        </h2>

        <div className="grid md:grid-cols-3 gap-14 max-w-6xl mx-auto text-center">
          <div className="space-y-4">
            <img
              src="https://i.pinimg.com/736x/ed/8f/52/ed8f52c386e50eb6db5eeff4127c6640.jpg"
              alt="Elegant Itinerary Builder"
              className="mx-auto h-40 w-40 object-cover rounded-lg shadow-md"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold text-gray-900">
              Elegant Itinerary Builder
            </h3>
            <p className="text-gray-600 max-w-xs mx-auto">
              Design sleek, premium itineraries your clients will remember.
            </p>
          </div>

          <div className="space-y-4">
            <img
              src="https://i.pinimg.com/736x/1b/8f/51/1b8f513d01fd3f762730befdf3003cc2.jpg"
              alt="VIP-Level Management"
              className="mx-auto h-40 w-40 object-cover rounded-lg shadow-md"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold text-gray-900">
              VIP-Level Management
            </h3>
            <p className="text-gray-600 max-w-xs mx-auto">
              Advanced dashboard to manage your elite clientele effortlessly.
            </p>
          </div>

          <div className="space-y-4">
            <img
              src="https://i.pinimg.com/736x/87/f8/05/87f8054d09556ff2361ee3b59bebd574.jpg"
              alt="Multi-Destination Journeys"
              className="mx-auto h-40 w-40 object-cover rounded-lg shadow-md"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold text-gray-900">
              Multi-Destination Journeys
            </h3>
            <p className="text-gray-600 max-w-xs mx-auto">
              Craft multi-leg luxury escapes with precision and style.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="py-20 px-6 sm:px-12 lg:px-24 max-w-5xl mx-auto text-center"
        aria-labelledby="how-it-works-title"
      >
        <h2
          id="how-it-works-title"
          className="text-3xl font-bold mb-16 tracking-tight text-gray-900"
        >
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-3">
            <div className="text-5xl font-bold text-blue-600">1</div>
            <h4 className="font-semibold text-lg text-gray-900">
              Register Your Agency
            </h4>
            <p className="text-gray-600 max-w-sm mx-auto">
              Secure onboarding for high-profile travel professionals.
            </p>
          </div>
          <div className="space-y-3">
            <div className="text-5xl font-bold text-blue-600">2</div>
            <h4 className="font-semibold text-lg text-gray-900">Design Itinerary</h4>
            <p className="text-gray-600 max-w-sm mx-auto">
              Use our luxury-focused builder to curate unforgettable trips.
            </p>
          </div>
          <div className="space-y-3">
            <div className="text-5xl font-bold text-blue-600">3</div>
            <h4 className="font-semibold text-lg text-gray-900">Deliver in Style</h4>
            <p className="text-gray-600 max-w-sm mx-auto">
              Export or share custom itineraries with your VIP clients instantly.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 py-16 text-white text-center px-6 sm:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl font-extrabold tracking-tight">
            Impress Your Clients with Global Vacations
          </h2>
          <p className="text-lg leading-relaxed">
            Join the elite agencies redefining premium travel.
          </p>

          <img
            src="https://i.pinimg.com/736x/76/3f/a1/763fa1edd0a02437dd17c0af5a0e35ae.jpg"
            alt="Impress Your Clients with luxury travel"
            className="mx-auto rounded-lg shadow-lg max-h-96 object-cover"
            loading="lazy"
          />

          <button
            onClick={handleRequestDemo}
            className="bg-white text-blue-700 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition focus:outline-none focus:ring-4 focus:ring-blue-300"
            aria-label="Request Demo"
          >
            Request Demo
          </button>
        </div>
      </section>

      {/* FOOTER / CONTACT */}
      <footer
        id="contact"
        className="bg-gray-800 text-gray-300 py-12 px-6 sm:px-12 lg:px-24 mt-auto"
        aria-label="Footer with contact and policies"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
          <div className="flex items-center space-x-4">
            <img
              src={logo}
              alt="Global Vacations Logo"
              className="h-12 w-12 rounded-full object-cover"
            />
            <p className="text-sm select-none text-gray-400">
              © 2025 Global Vacations. All rights reserved.
            </p>
          </div>

          <nav className="flex space-x-8 text-sm">
            <a
              href="#privacy"
              className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-white rounded"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-white rounded"
            >
              Terms of Service
            </a>
            <a
              href="#contact"
              className="hover:text-white transition focus:outline-none focus:ring-2 focus:ring-white rounded"
            >
              Contact
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
