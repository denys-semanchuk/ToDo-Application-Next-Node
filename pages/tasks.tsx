'use client'
import { FilterButtons } from "components/FilterButtons/FilterButtons";
import { SortButton } from "components/SortButton/SortButton";
import { TaskForm } from "components/TaskForm/TaskForm";
import { TaskList } from "components/TaskList/TaskList";
import { useSelector } from "react-redux";
import { RootState } from '../app/types/index';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AnimatePresence, motion } from 'framer-motion';

export default function Tasks() {
  const { user, loading, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !user && !loading) {
      router.push('/register');
    }
  }, [isAuthenticated, user, loading, router]);

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen flex items-center justify-center"
      >
        <motion.div 
          animate={{ 
            rotate: 360 
          }} 
          transition={{ 
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
          className="h-32 w-32 border-b-2 border-gray-900"
        />
      </motion.div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gray-100"
      >
        <motion.div 
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="w-full max-w-2xl mx-auto px-2 py-8"
        >
          <motion.div 
            variants={fadeIn}
            className="text-center mb-8"
          >
            <motion.h1 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="text-3xl font-bold text-gray-800 mb-2"
            >
              Todo App
            </motion.h1>
            <motion.p 
              variants={fadeIn}
              className="text-gray-600"
            >
              Manage your tasks efficiently
            </motion.p>
          </motion.div>

          <motion.div 
            variants={fadeIn}
            className="bg-white rounded-lg shadow-lg p-4"
            whileHover={{ 
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              translateY: -5
            }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <motion.div variants={fadeIn}>
              <TaskForm />
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className='flex justify-between items-center mt-6'
            >
              <FilterButtons />
              <SortButton />
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="mt-6"
            >
              <TaskList />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
    </>
  );
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};