import React from 'react';

const SupervisorHighlights = () => {
  const highlights = [
    {
      id: 1,
      name: 'Dr. John Doe',
      expertise: 'Artificial Intelligence',
      description: 'Expert in AI and Machine Learning with 10+ years of experience.',
      email: 'johndoe@example.com',
      availability: 'Available for new projects',
    },
    {
      id: 2,
      name: 'Dr. Jane Smith',
      expertise: 'Web Development',
      description: 'Specializes in modern web technologies and frameworks.',
      email: 'janesmith@example.com',
      availability: 'Currently mentoring 2 students',
    },
    {
      id: 3,
      name: 'Dr. Emily Davis',
      expertise: 'Data Science',
      description: 'Experienced in data analysis, visualization, and big data.',
      email: 'emilydavis@example.com',
      availability: 'Available for consultation',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Supervisor Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((highlight) => (
            <div key={highlight.id} className="p-6 border rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">{highlight.name}</h3>
              <p className="text-blue-600 font-semibold mb-2">{highlight.expertise}</p>
              <p className="text-gray-700 mb-4">{highlight.description}</p>
              <p className="text-gray-500 mb-2">
                <span className="font-semibold">Email:</span> {highlight.email}
              </p>
              <p className="text-green-600 font-semibold">{highlight.availability}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupervisorHighlights;
