import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SplitText from '../SplitText/SplitText';

// NavDots component for scroll indication
const NavDots = () => {
  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 space-y-4 z-50">
      {[0, 1, 2].map((_, i) => (
        <a
          key={i}
          href={`#section-${i}`}
          className="block w-4 h-4 rounded-full bg-white/50 hover:bg-white hover:scale-150 transition-all duration-300"
        />
      ))}
    </div>
  );
};

function Home() {
  const [currentTitle, setCurrentTitle] = useState('NotesNest');
  const [key, setKey] = useState(0); // Add key to force re-render

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle(prev => prev === 'NotesNest' ? 'Your Knowledge Hub' : 'NotesNest');
      setKey(prev => prev + 1); // Increment key to force re-animation
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll relative">
      {/* Global animated background */}
      <div className="fixed inset-0 transition-colors duration-700 ease-in-out bg-gradient-to-b from-blue-600 via-indigo-600 to-blue-800" 
           style={{backgroundPosition: '0% 0%', backgroundSize: '100% 300%'}}>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)] animate-float"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1)_0%,transparent_40%)] animate-float" style={{animationDelay: '-2s'}}></div>
        </div>
      </div>

      <NavDots />
      
      {/* Hero Section */}
      <section id="section-0" className="snap-start h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 via-indigo-600/50 to-blue-600/50 animate-gradient-shift backdrop-blur-sm"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)] animate-float"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1)_0%,transparent_40%)] animate-float" style={{animationDelay: '-2s'}}></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.1)_0%,transparent_40%)] animate-float" style={{animationDelay: '-4s'}}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-20">
          <div className="text-center animate-fade-in-up space-y-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.2] md:leading-[1.2] lg:leading-[1.2] tracking-tight">
              <span 
                className="block mb-8 text-white pb-2"
                style={{
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  filter: 'drop-shadow(0 2px 4px rgba(255,255,255,0.1))'
                }}
              >
                <SplitText
                  key={key} // Add key to force re-render
                  text={currentTitle}
                  delay={50}
                  className="text-white"
                  animationFrom={{ 
                    opacity: 0, 
                    transform: "translate3d(0,50px,0)",
                    rotateX: "45deg"
                  }}
                  animationTo={{ 
                    opacity: 1, 
                    transform: "translate3d(0,0,0)",
                    rotateX: "0deg"
                  }}
                  easing="cubic-bezier(0.68, -0.6, 0.32, 1.6)"
                />
              </span>
              <span className="block text-white text-4xl md:text-6xl lg:text-7xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.3)] pb-2">
                <SplitText
                  text="Share and Learn Together"
                  delay={100}
                  animationFrom={{ opacity: 0, transform: "translate3d(0,30px,0)" }}
                  animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                />
              </span>
            </h1>
            <p className="mt-8 max-w-3xl mx-auto text-xl md:text-2xl text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)] font-medium leading-relaxed">
              Create, share, and discover notes with a community of learners.
            </p>
            <div className="mt-12 max-w-md mx-auto sm:flex sm:justify-center">
              <div className="rounded-md shadow hover:scale-105 transition-transform duration-300">
                <Link to="/signup" className="w-full flex items-center justify-center px-10 py-4 text-xl font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="section-1" className="snap-start h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700/50 via-purple-600/50 to-indigo-700/50 animate-gradient-shift backdrop-blur-sm"></div>
        <div className="absolute inset-0">
          <div className="absolute w-full h-full bg-[linear-gradient(45deg,transparent_45%,rgba(255,255,255,0.1)_50%,transparent_55%)] bg-[length:200%_200%] animate-gradient-shift"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <span className="text-white text-lg font-semibold tracking-wide uppercase mb-3 block drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">Features</span>
            <h2 className="text-4xl md:text-6xl font-extrabold animate-fade-in-up text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
              Features that empower you
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
            {/* Enhanced Feature cards */}
            <div className="group relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 transform hover:scale-105 hover:-rotate-2 transition-all duration-300 animate-fade-in-up border border-white/10 hover:border-white/30" style={{animationDelay: '200ms'}}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="text-blue-300 mb-6 transform group-hover:scale-110 transition-transform">
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-md group-hover:text-blue-200 transition-colors">Easy Note Creation</h3>
                <p className="text-white/90 text-lg leading-relaxed">Create and format your notes with our intuitive editor.</p>
              </div>
            </div>
            
            <div className="group relative bg-black/30 backdrop-blur-xl rounded-2xl p-8 transform hover:scale-105 hover:rotate-2 transition-all duration-300 animate-fade-in-up border border-white/10 hover:border-white/30" style={{animationDelay: '400ms'}}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="text-purple-300 mb-6 transform group-hover:scale-110 transition-transform">
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-md group-hover:text-purple-200 transition-colors">Smart Organization</h3>
                <p className="text-white/90 text-lg leading-relaxed">Organize your notes with tags and categories.</p>
              </div>
            </div>

            <div className="group relative bg-black/30 backdrop-blur-xl rounded-2xl p-8 transform hover:scale-105 hover:-rotate-2 transition-all duration-300 animate-fade-in-up border border-white/10 hover:border-white/30" style={{animationDelay: '600ms'}}>
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-red-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="text-pink-300 mb-6 transform group-hover:scale-110 transition-transform">
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-md group-hover:text-pink-200 transition-colors">Collaboration</h3>
                <p className="text-white/90 text-lg leading-relaxed">Share and collaborate with other users.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="section-2" className="snap-start h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700/50 via-pink-600/50 to-purple-700/50 animate-gradient-shift backdrop-blur-sm"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1)_0%,transparent_60%)] animate-float"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.1)_0%,transparent_60%)] animate-float" style={{animationDelay: '-3s'}}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="animate-fade-in-up">
            <h2 className="text-5xl md:text-7xl font-extrabold mb-8 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
              Ready to Get Started?
            </h2>
            <p className="text-2xl text-white mb-12 max-w-3xl mx-auto font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">
              Join thousands of students and professionals who are already using NotesNest.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/signup" 
                className="px-10 py-4 text-xl border-2 border-white text-white rounded-lg hover:bg-white hover:text-pink-600 transition-all hover:scale-105 duration-300">
                Create Account
              </Link>
              <Link to="/notes" 
                className="px-10 py-4 text-xl bg-white text-pink-600 rounded-lg hover:bg-pink-100 transition-all hover:scale-105 duration-300">
                Browse Notes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
