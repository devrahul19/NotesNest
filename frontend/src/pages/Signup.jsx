import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthLayout from '../components/AuthLayout';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
  };

  const formFields = [
    { id: 'name', label: 'Full name', type: 'text', placeholder: 'John Doe' },
    { id: 'email', label: 'Email address', type: 'email', placeholder: 'you@example.com' },
    { id: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
  ];

  return (
    <AuthLayout 
      title="Create your account" 
      subtitle="Start your journey with NotesNest today"
    >
      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {formFields.map((field, index) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 * (index + 1) }}
          >
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <div className="mt-1 relative">
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300 hover:border-blue-400"
                placeholder={field.placeholder}
                value={formData[field.id]}
                onChange={(e) => setFormData({...formData, [field.id]: e.target.value})}
              />
              <motion.div
                className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{ opacity: 0 }}
              />
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:scale-[1.02]"
          >
            Create account
          </button>
        </motion.div>
      </motion.form>

      <motion.p 
        className="mt-6 text-center text-sm text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1 }}
      >
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
          Sign in
        </Link>
      </motion.p>
    </AuthLayout>
  );
}

export default Signup;
