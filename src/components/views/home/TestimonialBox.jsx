const TestimonialBox = ({ name, feedback, role }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <p className="text-gray-700 italic mb-4">"{feedback}"</p>
      <p className="text-gray-900 font-bold text-lg">{name}</p>
      <p className="text-gray-500 text-sm">{role}</p>
    </div>
  );
};

export default TestimonialBox;