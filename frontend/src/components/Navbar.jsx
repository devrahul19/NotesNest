import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white">
              NotesNest
            </Link>
          </div>
          <div className="hidden sm:block">
            <div className="flex space-x-8">
              <Link to="/about" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-lg font-medium transition-colors">
                About
              </Link>
              <Link to="/features" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-lg font-medium transition-colors">
                Features
              </Link>
              <Link to="/login" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-lg font-medium transition-colors">
                Login
              </Link>
              <Link to="/signup" className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md text-lg font-medium transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
