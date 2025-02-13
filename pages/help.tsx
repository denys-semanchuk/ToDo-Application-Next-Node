'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import {
  FaEnvelope,
  FaChevronDown,
  FaSearch,
  FaArrowRight
} from 'react-icons/fa';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const faqs = [
  {
    question: 'How do I create a new task?',
    answer: 'Click the "Add Task" button at the top of your task list, enter the task details, and press Enter or click the submit button.'
  },
  {
    question: 'Can I organize tasks by priority?',
    answer: 'Yes, you can set priority levels (Low, Medium, High) for each task using the priority dropdown menu.'
  },
  {
    question: 'How do I share tasks with others?',
    answer: 'Currently, task sharing is in development and will be available in a future update.'
  },
  {
    question: 'Is there a limit to the number of tasks?',
    answer: 'No, you can create unlimited tasks in your account.'
  }
];

const guides = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of using our task management app',
    link: '/guides/getting-started'
  },
  {
    title: 'Task Organization',
    description: 'Best practices for organizing your tasks efficiently',
    link: '/guides/organization'
  },
  {
    title: 'Keyboard Shortcuts',
    description: 'Boost your productivity with keyboard shortcuts',
    link: '/guides/shortcuts'
  }
];

export default function HelpCenter() {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Head>
        <title>Help | Todo App</title>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
            <p className="text-xl text-gray-600 mb-8">Find answers to your questions</p>

            <div className="relative max-w-2xl mx-auto">
              <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-black w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <button
                    onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: activeQuestion === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaChevronDown className="text-gray-500" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {activeQuestion === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 py-4 bg-gray-50"
                      >
                        <p className="text-gray-600">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Helpful Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guides.map((guide, index) => (
                <motion.a
                  key={index}
                  href={guide.link}
                  variants={fadeIn}
                  whileHover={{ scale: 1.03 }}
                  className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                    {guide.title}
                    <FaArrowRight className="ml-2 text-blue-500" />
                  </h3>
                  <p className="text-gray-600">{guide.description}</p>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
            <p className="text-gray-600 mb-6">Our support team is here to help you</p>
            <motion.a
              href="mailto:support@example.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaEnvelope className="mr-2" />
              Contact Support
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}