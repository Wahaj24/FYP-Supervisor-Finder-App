import React from 'react';
import SectionContainer from "../../layouts/SectionContainer";

const Features = () => {
  return (
    <SectionContainer className="bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Search Supervisors</h3>
          <p className="text-gray-600">
            Find supervisors based on their expertise, research domains, or availability.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">View Profiles</h3>
          <p className="text-gray-600">
            Access detailed profiles of supervisors, including their qualifications and research interests.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Request Supervision</h3>
          <p className="text-gray-600">
            Send supervision requests directly to supervisors and start collaborating.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Book Consultation Slots</h3>
          <p className="text-gray-600">
            Schedule meetings with supervisors to discuss your project.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Bookmark Supervisors</h3>
          <p className="text-gray-600">
            Save your favorite supervisors for quick access later.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Filter Supervisors</h3>
          <p className="text-gray-600">
            Narrow down supervisors based on your preferences and needs.
          </p>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Features;