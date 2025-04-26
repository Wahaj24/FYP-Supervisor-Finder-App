import React from 'react';

const InfoSection = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-3xl font-bold mb-8">Why Choose FYP Finder?</h3>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-12 items-center">
          {/* Right Side: Information */}
          <div className="text-left">
            <h4 className="text-2xl font-bold mb-4 text-blue-600">Simplify Your FYP Journey</h4>
            <p className="text-gray-600 mb-4">
              FYP Finder is designed to make your final year project journey easier by connecting you with experienced supervisors who match your research interests.
            </p>
            <h4 className="text-2xl font-bold mb-4 text-blue-600">Key Benefits</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Find supervisors based on expertise and availability.</li>
              <li>Access detailed supervisor profiles with research interests.</li>
              <li>Send supervision requests and collaborate seamlessly.</li>
              <li>Save time and focus on your project goals.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;