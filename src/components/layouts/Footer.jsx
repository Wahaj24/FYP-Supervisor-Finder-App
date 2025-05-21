
import React from 'react';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-teal-600 to-blue-800 text-white py-12 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
        {/* Brand Description */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">FYP Supervisor Finder</h2>
          <p className="text-white/80">
            Connecting students with expert supervisors for successful final year projects. 
            Find guidance, collaborate, and achieve academic excellence.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="text-white/80 hover:text-white transition">Home</a></li>
            <li><a href="/supervisors" className="text-white/80 hover:text-white transition">Find Supervisors</a></li>
            <li><a href="/projects" className="text-white/80 hover:text-white transition">Browse Projects</a></li>
            <li><a href="/login" className="text-white/80 hover:text-white transition">Login</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Contact</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:support@fypfinder.com" className="text-white/80 hover:text-white transition">
                support@fypfinder.com
              </a>
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+923001234567" className="text-white/80 hover:text-white transition">
                +92 300 1234567
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright and Social Links */}
      <div className="container mx-auto mt-12 pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
        <p className="text-white/70 mb-4 md:mb-0">
          © 2025 FYP Supervisor Finder. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <a href="https://facebook.com" className="text-white hover:text-blue-200 transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </a>
          <a href="https://twitter.com" className="text-white hover:text-blue-200 transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a href="https://linkedin.com" className="text-white hover:text-blue-200 transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;