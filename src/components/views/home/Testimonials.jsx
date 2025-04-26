import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      feedback: "This platform made finding a supervisor so much easier!",
      role: "Final Year Student",
    },
    {
      name: "Jane Smith",
      feedback: "I found the perfect supervisor for my project in no time!",
      role: "Computer Science Student",
    },
    {
      name: "Ali Khan",
      feedback: "Highly recommended for students looking for guidance.",
      role: "Software Engineering Student",
    },
  ];

  return (
    <div className="bg-white p-6 shadow-md">
      <h2 className="text-3xl font-bold mb-4">Testimonials</h2>
      <div className="space-y-4">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded shadow-md border border-gray-200"
          >
            <p className="text-gray-700 italic">"{testimonial.feedback}"</p>
            <p className="text-gray-900 font-bold mt-2">{testimonial.name}</p>
            <p className="text-gray-500 text-sm">{testimonial.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;