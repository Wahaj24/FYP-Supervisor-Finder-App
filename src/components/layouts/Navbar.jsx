import React from "react";

const Navbar = () => (
  <nav className="bg-blue-600 text-white p-4 fixed top-0 w-full z-10 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-xl font-bold">FYP Finder</h1>
      <div className="hidden md:flex space-x-6">
        {/* Anchor links with updated names */}
        <a href="#hero" className="hover:text-gray-200">
          Welcome
        </a>
        <a href="#how-it-works" className="hover:text-gray-200">
          Process
        </a>
        <a href="#features" className="hover:text-gray-200">
          Benefits
        </a>
        <a href="#supervisor-highlights" className="hover:text-gray-200">
          Supervisors
        </a>
        <a href="#testimonials" className="hover:text-gray-200">
          Reviews
        </a>
        <a href="#call-to-action" className="hover:text-gray-200">
          Join Us
        </a>
        <a href="#student-feedback" className="hover:text-gray-200">
          Student Voices
        </a>
        <a href="#info-section" className="hover:text-gray-200">
          More Info
        </a>
      </div>
      {/* Mobile Menu Button */}
      <button className="md:hidden bg-white text-blue-600 px-4 py-2 rounded-lg">
        Menu
      </button>
    </div>
  </nav>
);

export default Navbar;