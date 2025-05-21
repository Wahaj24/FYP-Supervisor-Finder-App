import React from "react";
import HeroSection from "../views/home/HeroSection";
import StudentFeedback from "../views/home/StudentFeedback";
import HowItWorks from "../views/home/HowItWorks";
import CallToAction from "../views/home/CallTOAction";
import CardLayout from "../layouts/CardLayout";
import SectionContainer from "../layouts/SectionContainer";

function Home() {
  const testimonials = [
    {
      quote: "I found my supervisor in just a few clicks!",
      name: "wahaj chaudhry",
      program: "Artificial Intelligence",
      rating: 5,
      color: "from-blue-100 to-indigo-100",
    },
    {
      quote: "good platform to find a supervisor.",
      name: "faizan shaukat",
      program: "Cybersecurity",
      rating: 5,
      color: "from-purple-100 to-blue-100",
    },
    {
      quote:
        "I was able to connect with a supervisor who specializes in my exact research area.",
      name: "Ali murtaza",
      program: "Computer Science",
      rating: 4,
      color: "from-indigo-100 to-purple-100",
    },
  ];

  return (
    <>
      <HeroSection />

      <SectionContainer title="Find your perfect supervisor in minutes">
        <HowItWorks />
      </SectionContainer>

      {/* <SectionContainer
        title="Student Feedback"
        subtitle="Hear from our satisfied users"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((testimonial, index) => (
            <CardLayout
              key={index}
              bgColor={`bg-gradient-to-br ${testimonial.color}`}
              hoverEffect={true}
            >
              <StudentFeedback {...testimonial} />
            </CardLayout>
          ))}
        </div>
      </SectionContainer> */}

      <CallToAction />
    </>
  );
}

export default Home;
