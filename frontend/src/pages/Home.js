"use client";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import Threads  from '../Backgrounds/threads';
const Home = () => {
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const sectionCount = 3; // Total number of sections
      
      // Calculate current section based on scroll position
      let section = Math.round(scrollPosition / windowHeight);
      section = Math.max(0, Math.min(section, sectionCount - 1));
      
      // If we're not at a section boundary, scroll to the nearest section
      if (Math.abs(scrollPosition - (section * windowHeight)) > 50) {
        window.scrollTo({
          top: section * windowHeight,
          behavior: 'smooth'
        });
      }
      
      setCurrentSection(section);
    };

    // Throttle the scroll event to improve performance
    let timeoutId;
    const throttledScroll = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 50);
      }
    };

    window.addEventListener('scroll', throttledScroll);
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const scrollTo = (section) => {
    const targetPosition = section * window.innerHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    setCurrentSection(section);
  };

  // Navigation dots
  const NavDots = () => (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
      {[0, 1, 2].map((dot) => (
        <button
          key={dot}
          onClick={() => scrollTo(dot)}
          className={`block w-3 h-3 my-2 rounded-full transition-all duration-300 ${currentSection === dot
              ? 'bg-blue-400 scale-125'
              : 'bg-gray-400 hover:bg-blue-300'
            }`}
          aria-label={`Scroll to section ${dot + 1}`}
        />
      ))}
    </div>
  );

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll bg-black text-white">
      <NavDots />

      {/* Hero Section */}
      <section className="snap-start h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 z-0">
          <Threads
            amplitude={1}
            distance={0}
            enableMouseInteraction={true}
          />
        </div>
        <div className="container mx-auto px-4 text-center">
          <animated.div
            style={useSpring({
              opacity: currentSection === 0 ? 1 : 0,
              transform: `translateY(${currentSection === 0 ? 0 : 30}px)`,
            })}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              NotesApp
            </h1>
            <p className="text-2xl md:text-3xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Transform your ideas into reality with our powerful note-taking platform
            </p>
            <div className="space-x-6">
              <Link
                to="/signup"
                className="inline-block bg-blue-500 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-600 transform hover:scale-105 transition-all duration-300"
              >
                Get Started
              </Link>
              <Link
                to="/notes"
                className="inline-block bg-slate-700 text-blue-100 px-8 py-3 rounded-full text-lg font-medium hover:bg-slate-600 transform hover:scale-105 transition-all duration-300"
              >
                Browse Notes
              </Link>
            </div>
          </animated.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="snap-start h-screen flex items-center justify-center bg-white text-black">
        <div className="container mx-auto px-4">
          <animated.div
            style={useSpring({
              opacity: currentSection === 1 ? 1 : 0,
              transform: `translateY(${currentSection === 1 ? 0 : 30}px)`,
            })}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              Features that empower you
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl border border-gray-200 hover:border-gray-400 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </animated.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="snap-start h-screen flex items-center justify-center bg-black">
        <div className="container mx-auto px-4 text-center">
          <animated.div
            style={useSpring({
              opacity: currentSection === 2 ? 1 : 0,
              transform: `translateY(${currentSection === 2 ? 0 : 30}px)`,
            })}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              Ready to get started?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Join thousands of users who have already transformed their note-taking experience
            </p>
            <Link
              to="/signup"
              className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-12 py-4 rounded-full text-xl font-medium hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            >
              Start for free
            </Link>
          </animated.div>
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    icon: "📝",
    title: "Smart Organization",
    description: "Organize your notes with intelligent categorization and tagging system"
  },
  {
    icon: "🔄",
    title: "Real-time Sync",
    description: "Access your notes across all devices with instant synchronization"
  },
  {
    icon: "🔒",
    title: "Secure Storage",
    description: "Your notes are encrypted and stored securely in the cloud"
  }
];

export default Home;