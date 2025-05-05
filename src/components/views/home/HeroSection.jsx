import React from 'react';

const HeroSection = () => {
  return (
    <section
      className="text-center bg-gray-100 py-20 bg-cover bg-center"
      style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}
    >
      <h2 className="text-5xl font-extrabold mb-6 text-gray-800">
        Welcome to the FYP Supervisor Finder
      </h2>
      <p className="text-lg mb-8 text-gray-600 max-w-2xl mx-auto">
        Finding a supervisor for your Final Year Project (FYP) can be challenging. 
        Our platform simplifies this process by helping students connect with
        experienced supervisors across various research domains.
      </p>
      <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
        <a
          href="#features"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow-md transition-transform transform hover:scale-105"
          aria-label="Navigate to Features section"
        >
          Find a Supervisor
        </a>
        <a
          href="#call-to-action"
          className="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-600 shadow-md transition-transform transform hover:scale-105"
          aria-label="Navigate to Call to Action section"
        >
          Add Supervisor
        </a>
        <a
          href="#info-section"
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 shadow-md transition-transform transform hover:scale-105"
          aria-label="Navigate to Info section"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
};

export default HeroSection;