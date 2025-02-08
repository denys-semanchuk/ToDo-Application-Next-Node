import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaUserSecret, FaDatabase, FaCookie, FaUserLock } from 'react-icons/fa';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const sections = [
  {
    icon: <FaUserSecret className="text-3xl text-blue-500" />,
    title: 'Information We Collect',
    content: [
      'Email address and basic profile information',
      'Task data and user preferences',
      'Usage statistics and interaction data',
      'Device and browser information'
    ]
  },
  {
    icon: <FaDatabase className="text-3xl text-green-500" />,
    title: 'How We Use Your Data',
    content: [
      'To provide and improve our services',
      'To personalize your experience',
      'To communicate important updates',
      'To analyze usage patterns and optimize performance'
    ]
  },
  {
    icon: <FaCookie className="text-3xl text-yellow-500" />,
    title: 'Cookies & Tracking',
    content: [
      'Essential cookies for site functionality',
      'Analytics cookies to improve service',
      'Preference cookies to remember settings',
      'You can control cookie settings in your browser'
    ]
  },
  {
    icon: <FaUserLock className="text-3xl text-purple-500" />,
    title: 'Your Rights',
    content: [
      'Access your personal data',
      'Request data deletion',
      'Opt-out of communications',
      'Export your data'
    ]
  }
];

const lastUpdated = '2024-02-08';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        className="max-w-4xl mx-auto px-4 py-16"
      >
        <motion.div variants={fadeIn} className="text-center mb-12">
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <FaShieldAlt className="text-5xl text-blue-500" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">Protecting your privacy is our top priority</p>
          <p className="text-sm text-gray-500 mt-2">Last updated: {lastUpdated}</p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center mb-4">
                {section.icon}
                <h2 className="text-2xl font-bold text-gray-900 ml-3">{section.title}</h2>
              </div>
              <ul className="space-y-4">
                {section.content.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    variants={{
                      initial: { opacity: 0, x: -20 },
                      animate: { opacity: 1, x: 0 }
                    }}
                    transition={{ delay: itemIndex * 0.1 }}
                    className="flex items-start"
                  >
                    <span className="text-blue-500 mr-2">•</span>
                    <span className="text-gray-600">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div 
          variants={fadeIn}
          className="mt-12 text-center bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions or Concerns?</h2>
          <p className="text-gray-600 mb-4">
            We&apos;re here to help with any privacy-related questions you may have.
          </p>
          <a 
            href="mailto:privacy@example.com"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Privacy Team
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}