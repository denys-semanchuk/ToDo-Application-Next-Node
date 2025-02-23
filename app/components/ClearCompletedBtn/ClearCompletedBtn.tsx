import React from 'react'
import { useDispatch } from 'react-redux'
import { clearCompleted } from 'store/thunks/taskThunks'
import { Task } from '../../../types'
import { toast } from 'react-hot-toast'
import { motion } from 'framer-motion'
import { AppDispatch } from '../../../pages/login'

type Props = {
  tasks: Task[]
}

export const ClearCompletedBtn: React.FC<Props> = ({ tasks }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleClearCompleted = async () => {
    if (window.confirm('Are you sure you want to clear completed tasks?')) {
      try {
        await dispatch(clearCompleted()).unwrap();
        toast.success('Completed tasks cleared successfully', {
          duration: 3000,
          position: 'bottom-right',
        });
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : 'Failed to clear completed tasks',
          {
            duration: 4000,
            position: 'bottom-right',
          }
        );
      }
    }
  };
  
  const completedCount = tasks.filter(task => task.completed).length;
  
  return (
    <>
      {completedCount > 0 && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          onClick={handleClearCompleted}
          className="mt-4 px-6 py-2.5 text-sm font-medium text-red-600 
            hover:text-red-700 bg-red-50 hover:bg-red-100
            rounded-lg transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
            active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!completedCount}
        >
          Clear completed tasks
          <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs">
            {completedCount}
          </span>
        </motion.button>
      )}
    </>
  )
}