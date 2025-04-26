import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* About Section */}
        <div>
          <h4 className="text-lg font-bold mb-4">About FYP Finder</h4>
          <p className="text-sm">
            FYP Finder helps students connect with experienced supervisors for their final year projects. Simplify your academic journey with our platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="#find" className="hover:underline">Find a Supervisor</a>
            </li>
            <li>
              <a href="#add" className="hover:underline">Add a Supervisor</a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="text-lg font-bold mb-4">Contact Us</h4>
          <p className="text-sm">Email: support@fypfinder.com</p>
          <p className="text-sm">Phone: +123-456-7890</p>
          <p className="text-sm">Address: 123 Academic Lane, University City</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-sm">&copy; 2025 FYP Supervisor Finder. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;