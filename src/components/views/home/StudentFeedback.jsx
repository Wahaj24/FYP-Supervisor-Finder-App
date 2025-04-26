import React from "react";

const WhatStudentsSay = () => {
  const quotes = [
    "This platform is amazing for finding supervisors!",
    "I was able to connect with the perfect supervisor for my project.",
    "Highly recommended for final-year students!",
  ];

  return (
    <div className="bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-4">What Students Say</h2>
      <ul className="space-y-4">
        {quotes.map((quote, index) => (
          <li key={index} className="text-gray-700 italic">
            "{quote}"
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhatStudentsSay;