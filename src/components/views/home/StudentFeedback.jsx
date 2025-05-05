import React from "react";

const WhatStudentsSay = () => {
  const quotes = [
    "This platform is amazing for finding supervisors!",
    "I was able to connect with the perfect supervisor for my project.",
    "Highly recommended for final-year students!",
  ];

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">What Students Say</h2>
      <ul className="space-y-4">
        {quotes.map((quote, index) => (
          <li key={index} className="text-gray-700 italic text-center">
            "{quote}"
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhatStudentsSay;