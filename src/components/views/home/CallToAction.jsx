import React from 'react';

const CallToAction = () => {
  return (
    <section className="bg-blue-600 text-white py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
      <p className="text-lg mb-8">
        Join our platform and find the perfect supervisor for your project today!
      </p>
      <a
        href="#info-section"
        className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 shadow-md"
      >
        Get Started
      </a>
    </section>
  );
};

export default CallToAction;