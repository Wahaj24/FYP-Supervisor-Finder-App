import React from 'react';

const Features = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold mb-8">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg shadow-lg">
            <h4 className="text-xl font-bold mb-2">Search Supervisors</h4>
            <p className="text-gray-600">
              Find supervisors based on their expertise, research domains, or availability.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow-lg">
            <h4 className="text-xl font-bold mb-2">View Profiles</h4>
            <p className="text-gray-600">
              Access detailed profiles of supervisors, including their qualifications and research interests.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow-lg">
            <h4 className="text-xl font-bold mb-2">Request Supervision</h4>
            <p className="text-gray-600">
              Send supervision requests directly to supervisors and start collaborating.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow-lg">
            <h4 className="text-xl font-bold mb-2">Book Consultation Slots</h4>
            <p className="text-gray-600">
              Schedule meetings with supervisors for guidance on your project.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow-lg">
            <h4 className="text-xl font-bold mb-2">Bookmark Supervisors</h4>
            <p className="text-gray-600">
              Save your favorite supervisors for quick access later.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow-lg">
            <h4 className="text-xl font-bold mb-2">Filter Supervisors</h4>
            <p className="text-gray-600">
              Narrow down supervisors based on expertise, availability, or research domains.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;