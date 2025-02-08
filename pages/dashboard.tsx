'use client'
import Link from 'next/link'
import { CheckCircleIcon, StarIcon, FunnelIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  return (
    <>
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              Organize Your Tasks
              <span className="block">Like Never Before</span>
            </h2>
            <p className="mt-3 max-w-md mx-auto text-xl sm:text-2xl md:mt-5 md:max-w-3xl">
              The most intuitive task management solution for individuals and teams.
            </p>
            <div className="mt-10">
              <Link href="/register" className="bg-white text-indigo-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100">
                Start Free Today
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Everything you need to stay organized
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <CheckCircleIcon className="h-8 w-8 text-indigo-600" />
                <h3 className="ml-3 text-xl font-bold text-gray-900">Task Management</h3>
              </div>
              <p className="mt-2 text-gray-600">Create, organize, and track your tasks with ease.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <StarIcon className="h-8 w-8 text-indigo-600" />
                <h3 className="ml-3 text-xl font-bold text-gray-900">Priority Levels</h3>
              </div>
              <p className="mt-2 text-gray-600">Set priorities and focus on what matters most.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <FunnelIcon className="h-8 w-8 text-indigo-600" />
                <h3 className="ml-3 text-xl font-bold text-gray-900">Smart Filters</h3>
              </div>
              <p className="mt-2 text-gray-600">Find tasks quickly with powerful filtering options.</p>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}