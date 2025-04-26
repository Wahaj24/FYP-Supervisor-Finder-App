import React from "react";
import Navbar from "./components/layouts/Navbar"; // Navbar component
import Footer from "./components/layouts/Footer"; // Footer component

// Home page components
import HeroSection from "./components/views/home/HeroSection";
import Features from "./components/views/home/Features";
import SupervisorHighlights from "./components/views/home/SupervisorHighlights";
import StudentFeedback from "./components/views/home/StudentFeedback";
import Testimonials from "./components/views/home/Testimonials";
import HowItWorks from "./components/views/home/HowItWorks";
import CallToAction from "./components/views/home/CallToAction";
import InfoSection from "./components/views/home/InfoSection";

const App = () => {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: "url('/src/assets/images/background.jpg')", // Path to your background image
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <section id="hero" className="p-4">
          <HeroSection />
        </section>

        <section id="how-it-works" className="p-4">
          <HowItWorks />
        </section>

        <section id="features" className="p-4">
          <Features />
        </section>

        <section id="supervisor-highlights" className="p-4">
          <SupervisorHighlights />
        </section>

        <section id="testimonials" className="p-4">
          <Testimonials />
        </section>

        <section id="call-to-action" className="p-4">
          <CallToAction />
        </section>

        <section id="student-feedback" className="p-4">
          <StudentFeedback />
        </section>

        <section id="info-section" className="p-4">
          <InfoSection />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
