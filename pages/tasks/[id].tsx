import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import Head from "next/head";
import { AutoResizeTextArea } from "../../app/components/AutoResizeTextarea/AutoResizeTextArea";
import { PrioritySelect } from "../../app/components/PrioritySelect/PrioritySelect";
import {
  updateTaskText,
  deleteTask,
  toggleCompleted,
  toggleImportant,
} from "../../app/store/thunks/taskThunks";
import { AppDispatch, RootState } from "../login";

const TaskDetailPage = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const taskId = router.query.id as string;

  const task = useSelector((state: RootState) =>
    taskId ? state.tasks.tasks.find((t) => String(t._id) === taskId) : null
  );

  const { tasks, loading } = useSelector((state: RootState) => state.tasks);

  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    if (task) {
      setTaskText(task.text);
    }
  }, [task]);

  useEffect(() => {
    if (tasks.length !== 0) {
      if (router.isReady && taskId && !task && !loading) {
        router.push("/tasks");
      }
    }
  }, [router.isReady, taskId, task]);

  if (!task) return null;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await dispatch(deleteTask(task._id)).unwrap();
        router.push("/tasks");
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };

  const handleUpdateText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setTaskText(newText);
    dispatch(updateTaskText({ id: task._id, text: newText }));
  };

  return (
    <>
      <Head>
        <title>
          {taskText ? `${taskText.slice(0, 30)}...` : "Task"} | Details
        </title>
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold text-gray-900">
                Task Details
              </h1>
              <button
                onClick={() => router.back()}
                className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => dispatch(toggleCompleted(task._id))}
                    className="h-5 w-5 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Completed</span>
                </label>

                <button
                  onClick={() => dispatch(toggleImportant(task._id))}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm
                    ${
                      task.important
                        ? "bg-amber-100 text-amber-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                >
                  <span>
                    {task.important ? "Important" : "Mark as Important"}
                  </span>
                </button>

                <PrioritySelect
                  currentPriority={task.priority}
                  taskId={task._id}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Description
                </label>
                <AutoResizeTextArea
                  value={taskText}
                  onChange={handleUpdateText}
                  className="w-full min-h-[100px] p-3 border rounded-lg"
                  maxLength={1000}
                />
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                  <div>
                    Created: {new Date(task.timestamp).toLocaleDateString()}
                  </div>
                  <div>
                    Updated: {new Date(task.timestamp).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg
                    hover:bg-red-100 transition-colors"
                >
                  Delete Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default TaskDetailPage;
