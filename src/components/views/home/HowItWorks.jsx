import React from "react";
import SectionContainer from "../../layouts/SectionContainer";

const HowItWorks = () => {
  return (
    <SectionContainer className="bg-white">
      <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Step 1: Search</h3>
          <p className="text-gray-600">
            Find supervisors based on their research domains and availability.
          </p>
        </div>
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Step 2: Book</h3>
          <p className="text-gray-600">
            Book consultation slots with your preferred supervisor.
          </p>
        </div>
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Step 3: Collaborate</h3>
          <p className="text-gray-600">
            Work with your supervisor to achieve your academic goals.
          </p>
        </div>
      </div>
    </SectionContainer>
  );
};

export default HowItWorks;