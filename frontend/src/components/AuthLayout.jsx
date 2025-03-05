import React from 'react';
import { motion } from 'framer-motion';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-[600px]"
      >
        <div className="mx-auto w-full max-w-md">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-10"
          >
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-gray-600">
                {subtitle}
              </p>
            )}
          </motion.div>
          {children}
        </div>
      </motion.div>

      {/* Right side - Image/Pattern */}
      <div className="hidden lg:block relative flex-1 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)] animate-float"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1)_0%,transparent_40%)] animate-float" style={{animationDelay: '-2s'}}></div>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-white text-center">
            <h3 className="text-4xl font-bold mb-4">Welcome to NotesNest</h3>
            <p className="text-xl">Your personal knowledge hub</p>
          </div>
        </motion.div>
        {/* Animated shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full -top-20 -right-20 animate-blob"></div>
          <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full top-1/2 -left-20 animate-blob animation-delay-2000"></div>
          <div className="absolute w-96 h-96 bg-indigo-500/20 rounded-full -bottom-20 right-1/2 animate-blob animation-delay-4000"></div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
