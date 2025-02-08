'use client'
import { useSelector } from 'react-redux'
import { RootState } from 'types'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { CalendarIcon, ChartBarIcon, CheckCircleIcon, ClockIcon, FireIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.auth)
  const { tasks, loading: tasksLoading } = useSelector((state: RootState) => state.tasks)
  const router = useRouter()
  const [isFirstRender, setIsFirstRender] = useState(true);

  const completedTasks = tasks.filter(task => task.completed).length
  const pendingTasks = tasks.length - completedTasks
  const chartData = {
    labels: ['Completed', 'Pending'],
    datasets: [{
      data: [completedTasks, pendingTasks],
      backgroundColor: ['#10B981', '#FBBF24'],
      borderWidth: 0
    }]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const
      }
    }
  }

  useEffect(() => {
    if(isFirstRender) {
      setIsFirstRender(false)
    }
    if (!isAuthenticated && !loading && !isFirstRender) {
      router.push('/dashboard')
    }
  }, [isAuthenticated])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }
  return (
    <div className="min-h-screen bg-gray-50">

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.username}! 👋</h1>
          <p className="text-gray-600">Here&apos;s your productivity overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <ChartBarIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Tasks</p>
                <p className="text-xl font-semibold">{tasks.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-xl font-semibold">{completedTasks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <ClockIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-xl font-semibold">{pendingTasks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FireIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Productivity</p>
                <p className="text-xl font-semibold">{Math.round((completedTasks / tasks.length) * 100) || 0}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Task Progress</h2>
            <div className="h-64">
              <Doughnut
                data={chartData}
                options={chartOptions}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {tasksLoading ? <p>Loading...</p>: tasks.slice(-5).map(task => (
                <div key={task._id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                  <div className={`h-2 w-2 rounded-full ${task.completed ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  <p className="ml-3 text-sm text-gray-600 flex-1">{task.text}</p>
                  <span className="text-xs text-gray-400">
                    {new Date(task.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 text-left hover:bg-gray-50 rounded-lg">
              <CalendarIcon className="h-6 w-6 text-indigo-600 mb-2" />
              <h3 className="font-medium">Create Task</h3>
              <p className="text-sm text-gray-500">Add a new task to your list</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}