import React from "react";
import TestimonialBox from "./TestimonialBox";
import SectionContainer from "../../layouts/SectionContainer";
import CardLayout from "../../layouts/CardLayout"; // Corrected import path

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
    <SectionContainer className="bg-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Testimonials</h2>
      <CardLayout>
        {testimonials.map((testimonial, index) => (
          <TestimonialBox
            key={index}
            name={testimonial.name}
            feedback={testimonial.feedback}
            role={testimonial.role}
          />
        ))}
      </CardLayout>
    </SectionContainer>
  );
};

export default Testimonials;