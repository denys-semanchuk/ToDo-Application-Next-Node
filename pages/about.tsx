import React from 'react';
import { motion } from 'framer-motion'
import { Header } from 'components/Header/Header';

export default function AboutPage() {

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              About TaskMaster
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              Your ultimate task management solution
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
              <ul className="space-y-4 text-gray-600">
                <li>✓ Task Organization</li>
                <li>✓ Priority Management</li>
                <li>✓ Team Collaboration</li>
                <li>✓ Progress Tracking</li>
              </ul>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600">
                We strive to make task management simple and efficient, helping teams and individuals achieve their goals with less stress and better organization.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <div className="text-gray-600">
                <p>Email: support@taskmaster.com</p>
                <p>Phone: (555) 123-4567</p>
                <p>Address: 123 Task Street</p>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  )
}