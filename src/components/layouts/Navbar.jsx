
  
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-gray-900 text-gray-100 shadow-md sticky top-0 z-50">
      {/* Top thin accent line */}
      <div className="h-1 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>

      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo and Title - Left side */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="bg-pink-500 rounded-full p-2 shadow-lg hover:scale-110 transition-transform duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <span className="text-2xl font-extrabold tracking-widest select-none text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-yellow-400 font-mono">
            FYP SUPERVISOR
          </span>
        </Link>

        {/* Desktop Menu - Centered */}
        <nav className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-1 font-semibold">
            {[
              { to: '/', label: 'Dashboard' },
              { to: '/Admin', label: 'Admin' },
              { to: '/Faculty', label: 'Faculty' },
              { to: '/Student', label: 'Student' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="relative px-5 py-2 group overflow-hidden"
              >
                <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors duration-300 font-mono">
                  {label}
                </span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-600 to-yellow-500 rounded-md transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-in-out"></span>
                <span className="absolute inset-0 w-full h-full border border-pink-500 rounded-md transform scale-95 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Login Button - Right side */}
        <div className="hidden md:block">
          <Link
            to="/Login"
            className="relative inline-flex items-center px-6 py-2 overflow-hidden font-medium text-pink-600 transition-all duration-500 rounded-full group"
          >
            <span className="absolute top-0 left-0 w-full h-full -mt-1 -ml-1 bg-pink-600 rounded-full opacity-30 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-150"></span>
            <span className="absolute inset-0 w-full h-full -mt-1 -ml-1 bg-gradient-to-r from-pink-600 to-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-150"></span>
            <span className="absolute inset-0 w-full h-full -mt-1 -ml-1 bg-white rounded-full opacity-0 group-hover:opacity-30 transition-all duration-500 transform group-hover:scale-150"></span>
            <span className="relative z-10 flex items-center space-x-2 text-white group-hover:text-white transition-colors duration-300">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span className="font-mono">LOGIN</span>
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          <svg
            className="w-8 h-8 text-gray-300"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gray-800 text-gray-200 overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? 'max-h-screen py-4' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col space-y-3 px-5">
          {[
            { to: '/', label: 'Dashboard' },
            { to: '/Admin', label: 'Admin' },
            { to: '/Faculty', label: 'Faculty' },
            { to: '/Student', label: 'Student' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 rounded-md hover:bg-gradient-to-r from-pink-600 to-yellow-500 hover:text-white transition-all duration-300 font-mono text-lg"
            >
              {label}
            </Link>
          ))}

          <Link
            to="/Login"
            onClick={() => setMenuOpen(false)}
            className="mt-4 block bg-gradient-to-r from-pink-600 to-yellow-500 text-white px-6 py-3 rounded-full font-mono font-bold text-center shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center justify-center space-x-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>LOGIN</span>
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
