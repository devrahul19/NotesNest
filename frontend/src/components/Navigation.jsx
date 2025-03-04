import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className={`text-2xl font-bold transition-colors duration-300 ${
                scrolled 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent' 
                  : 'text-white'
              }`}>
                NotesNest
              </span>
            </Link>
          </div>
          
          <div className="hidden sm:flex sm:items-center sm:space-x-1">
            <NavLink scrolled={scrolled} to="/notes">Browse Notes</NavLink>
            <NavLink scrolled={scrolled} to="/dashboard">Dashboard</NavLink>
            <div className="ml-2">
              <Link
                to="/login"
                className="group relative inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
              >
                <span>Sign In</span>
                <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors ${
                scrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-gray-200'
              }`}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'max-h-60' : 'max-h-0'} sm:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white/90 backdrop-blur-md`}>
        <div className="px-4 pt-2 pb-3 space-y-1">
          <MobileNavLink to="/notes">Browse Notes</MobileNavLink>
          <MobileNavLink to="/dashboard">Dashboard</MobileNavLink>
          <MobileNavLink to="/login">Sign In</MobileNavLink>
        </div>
      </div>
    </nav>
  );
}

// Navigation link component with dynamic colors
const NavLink = ({ to, children, scrolled }) => (
  <Link
    to={to}
    className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 group ${
      scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-white'
    }`}
  >
    {children}
    <span className={`absolute inset-x-0 bottom-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
      scrolled ? 'bg-blue-600' : 'bg-white'
    }`} />
  </Link>
);

// Mobile navigation link component
const MobileNavLink = ({ to, children }) => (
  <Link
    to={to}
    className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-colors duration-300"
  >
    {children}
  </Link>
);

export default Navigation;
