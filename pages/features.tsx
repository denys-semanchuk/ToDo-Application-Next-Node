'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaListUl, 
  FaFilter, 
  FaSort, 
  FaClock, 
  FaUserFriends, 
  FaLock, 
  FaArrowsAlt
} from 'react-icons/fa';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const features = [
  {
    icon: <FaListUl className="text-3xl text-blue-500" />,
    title: 'Task Management',
    description: 'Create, edit, and organize your tasks with ease. Keep track of everything you need to do in one place.'
  },
  {
    icon: <FaArrowsAlt className="text-3xl text-green-500" />,
    title: 'Drag & Drop',
    description: 'Intuitive drag and drop interface for easy task reordering and prioritization.'
  },
  {
    icon: <FaFilter className="text-3xl text-purple-500" />,
    title: 'Smart Filtering',
    description: 'Filter tasks by status, priority, or tags to focus on what matters most.'
  },
  {
    icon: <FaSort className="text-3xl text-yellow-500" />,
    title: 'Multiple Sort Options',
    description: 'Sort your tasks by date, priority, or custom order to stay organized.'
  },
  {
    icon: <FaClock className="text-3xl text-red-500" />,
    title: 'Real-time Updates',
    description: 'Changes sync instantly across all your devices, keeping you up to date.'
  },
  {
    icon: <FaUserFriends className="text-3xl text-indigo-500" />,
    title: 'Collaboration',
    description: 'Share tasks and collaborate with team members seamlessly.'
  },
  {
    icon: <FaLock className="text-3xl text-gray-500" />,
    title: 'Secure',
    description: 'Your data is encrypted and protected with industry-standard security.'
  }
];

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <motion.div 
        initial="initial"
        animate="animate"
        exit="exit"
        className="max-w-7xl mx-auto px-4 py-16"
      >
        <motion.div 
          variants={fadeIn}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Powerful Features
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600"
            variants={fadeIn}
          >
            Everything you need to stay productive and organized
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
              }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          variants={fadeIn}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started Free
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}