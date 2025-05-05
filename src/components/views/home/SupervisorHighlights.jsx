import React from 'react';
import SupervisorCard from './SupervisorCard';
import SectionContainer from "../../layouts/SectionContainer";
import CardLayout from "../../layouts/CardLayout";

const SupervisorHighlights = () => {
  const highlights = [
    {
      id: 1,
      name: 'Dr. John Doe',
      expertise: 'Artificial Intelligence',
      description: 'Expert in AI and Machine Learning with 10+ years of experience.',
      email: 'johndoe@university.edu',
      availability: 'Available for new projects',
    },
    {
      id: 2,
      name: 'Dr. Jane Smith',
      expertise: 'Web Development',
      description: 'Specializes in modern web technologies and frameworks.',
      email: 'janesmith@techuniversity.edu',
      availability: 'Currently mentoring 2 students',
    },
    {
      id: 3,
      name: 'Dr. Emily Davis',
      expertise: 'Data Science',
      description: 'Experienced in data analysis, visualization, and big data.',
      email: 'emily.davis@datasciencehub.org',
      availability: 'Available for consultation',
    },
    {
      id: 4,
      name: 'Dr. Michael Brown',
      expertise: 'Cybersecurity',
      description: 'Specialist in network security and ethical hacking.',
      email: 'michael.brown@cybersecure.edu',
      availability: 'Available for research collaborations',
    },
    {
      id: 5,
      name: 'Dr. Sarah Wilson',
      expertise: 'Cloud Computing',
      description: 'Expert in cloud architecture and distributed systems.',
      email: 'sarah.wilson@cloudtech.edu',
      availability: 'Currently mentoring 3 students',
    },
    {
      id: 6,
      name: 'Dr. David Lee',
      expertise: 'Blockchain Technology',
      description: 'Researcher in blockchain and decentralized systems.',
      email: 'david.lee@blockchainresearch.org',
      availability: 'Available for new projects',
    },
  ];

  return (
    <SectionContainer className="bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-center">Supervisor Highlights</h2>
      <CardLayout>
        {highlights.map((highlight) => (
          <SupervisorCard
            key={highlight.id}
            name={highlight.name}
            expertise={highlight.expertise}
            description={highlight.description}
            email={highlight.email}
            availability={highlight.availability}
          />
        ))}
      </CardLayout>
    </SectionContainer>
  );
};

export default SupervisorHighlights;
