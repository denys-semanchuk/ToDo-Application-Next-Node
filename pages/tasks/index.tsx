"use client";
import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import { useSelector } from "react-redux";
import { RootState } from "../../types/index";
import { FilterButtons } from "components/FilterButtons/FilterButtons";
import { TaskForm } from "components/TaskForm/TaskForm";
import { TaskList } from "components/TaskList/TaskList";
import { SortButtons } from "components/SortButtons/SortButtons";

const animations = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  stagger: {
    animate: {
      transition: { staggerChildren: 0.1 },
    },
  },
};

const Tasks: FC = () => {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      if (mounted && !isAuthenticated && !user && !loading) {
        router.push("/register");
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, [isAuthenticated, user, loading, router]);

  if (loading) {
    return (
      <motion.div
        {...animations.fadeIn}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 rounded-full border-t-transparent" />
      </motion.div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <>
      <Head>
        <title>My Tasks | Todo App</title>
        <meta name="description" content="Manage and organize your tasks" />
      </Head>
      <AnimatePresence mode="wait">
        <motion.div {...animations.fadeIn} className="min-h-screen bg-gray-100">
          <motion.div
            variants={animations.stagger}
            initial="initial"
            animate="animate"
            className="w-full max-w-6xl mx-auto px-2 sm:px-6 py-4 sm:py-8"
          >
            <motion.div
              variants={animations.fadeIn}
              className="text-center mb-3 sm:mb-8"
            >
              <motion.h1
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="text-xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2"
              >
                Todo App
              </motion.h1>
              <motion.p
                variants={animations.fadeIn}
                className="text-sm sm:text-base text-gray-600"
              >
                Manage your tasks efficiently
              </motion.p>
            </motion.div>

            <motion.div
              variants={animations.fadeIn}
              className="bg-white rounded-lg shadow-lg p-2 sm:p-4"
              whileHover={{
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                translateY: -5,
              }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <motion.div variants={animations.fadeIn}>
                <TaskForm />
              </motion.div>

              <motion.div
                variants={animations.fadeIn}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mt-3 sm:mt-6"
              >
                <FilterButtons />
                <SortButtons />
              </motion.div>

              <motion.div variants={animations.fadeIn} className="mt-3 sm:mt-6">
                <TaskList />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Tasks;
