import React from "react";

const HowItWorks = () => {
  return (
    <section className="p-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-bold">Step 1: Search</h3>
          <p>Find supervisors based on their research domains and availability.</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-bold">Step 2: Book</h3>
          <p>Book consultation slots with your preferred supervisor.</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-bold">Step 3: Collaborate</h3>
          <p>Work with your supervisor to achieve your academic goals.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;