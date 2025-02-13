import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaQuestionCircle, FaUserFriends, FaLock, FaRocket } from 'react-icons/fa';
import Head from 'next/head';

const Pricing: React.FC = () => {
  const features = [
    { icon: <FaCheckCircle />, title: 'Task Management', description: 'Create, organize, and track your tasks efficiently' },
    { icon: <FaUserFriends />, title: 'Collaboration', description: 'Work together with your team seamlessly' },
    { icon: <FaRocket />, title: 'Performance', description: 'Lightning-fast performance and real-time updates' },
    { icon: <FaLock />, title: 'Security', description: 'Your data is encrypted and secure' },
  ];

  const faqItems = [
    {
      question: 'Is the app really free?',
      answer: 'Yes, our app is completely free to use with all features included. No hidden charges or premium features.',
    },
    {
      question: 'Do I need to create an account?',
      answer: 'Yes, a free account is required to save your tasks and access them from any device.',
    },
    {
      question: 'Is my data secure?',
      answer: 'We use industry-standard encryption to protect your data. Your privacy is our top priority.',
    },
    {
      question: 'Can I share tasks with others?',
      answer: 'Yes, you can collaborate with team members and share tasks easily.',
    },
    {
      question: 'Is there a limit to the number of tasks?',
      answer: 'No, you can create unlimited tasks and organize them however you want.',
    },
  ];

  return (
    <>
      <Head>
        <title>Pricing | Todo App</title>
        <meta name="description" content="Simple pricing plans for Todo App" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 px-4"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Simple Pricing, Powerful Features</h1>
          <p className="text-xl text-gray-600 mb-8">Everything you need to stay organized and productive</p>
          <div className="inline-block bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Free Forever</h2>
            <p className="text-gray-600 mb-6">No credit card required</p>
            <ul className="text-left space-y-4 mb-8">
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                <span className="text-gray-900">Unlimited tasks</span>
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                <span className="text-gray-900">Task prioritization</span>
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                <span className="text-gray-900">Drag & drop organization</span>
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                <span className="text-gray-900">Real-time collaboration</span>
              </li>
            </ul>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Get Started Free
            </button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Our App?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="text-blue-600 text-2xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center">
                  <FaQuestionCircle className="text-blue-600 mr-2" />
                  {item.question}
                </h3>
                <p className="text-gray-600">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white text-center py-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Join thousands of users who trust our app</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            Create Free Account
          </button>
        </div>
      </div>
    </>
  );
};

export default Pricing;