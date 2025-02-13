'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaUserLock, FaCookie } from 'react-icons/fa';
import Head from 'next/head';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const sections = [
  {
    title: 'Terms of Service',
    icon: <FaShieldAlt className="text-3xl text-blue-500" />,
    content: [
      'By accessing and using this application, you agree to these terms and conditions.',
      'You must be at least 13 years old to use this service.',
      'You are responsible for maintaining the security of your account.',
      'We reserve the right to modify or terminate the service for any reason.',
    ]
  },
  {
    title: 'Privacy Policy',
    icon: <FaUserLock className="text-3xl text-green-500" />,
    content: [
      'We collect minimal personal information necessary for the service.',
      'Your data is encrypted and stored securely.',
      'We never sell your personal information to third parties.',
      'You can request deletion of your account and data at any time.',
    ]
  },
  {
    title: 'Cookie Policy',
    icon: <FaCookie className="text-3xl text-yellow-500" />,
    content: [
      'We use essential cookies to maintain your session.',
      'Analytics cookies help us improve our service.',
      'You can disable non-essential cookies at any time.',
      'Cookie preferences can be updated in your account settings.',
    ]
  }
];

const lastUpdated = '2024-02-08';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms | Todo App</title>
        <meta name="description" content="Learn more about Todo App" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          className="max-w-4xl mx-auto px-4 py-16"
        >
          <motion.div variants={fadeIn} className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-xl text-gray-600">Last updated: {lastUpdated}</p>
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
                      <span className="text-gray-400 mr-2">•</span>
                      <span className="text-gray-600">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeIn}
            className="mt-12 text-center text-gray-500 text-sm"
          >
            <p>By using our service, you agree to these terms.</p>
            <p className="mt-2">
              Questions? Contact us at{' '}
              <a
                href="mailto:support@taskmaster.com"
                className="text-blue-500 hover:text-blue-600"
              >
                support@taskmaster.com
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}