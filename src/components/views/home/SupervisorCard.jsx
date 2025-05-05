const SupervisorCard = ({ name, expertise, description, email, availability }) => {
  return (
    <div className="p-6 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-blue-600 font-semibold mb-2">{expertise}</p>
      <p className="text-gray-700 mb-4">{description}</p>
      <p className="text-gray-500 mb-2">
        <span className="font-semibold">Email:</span> {email}
      </p>
      <p className="text-green-600 font-semibold">{availability}</p>
    </div>
  );
};

export default SupervisorCard;