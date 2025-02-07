"use client"
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Notification } from '../Notification/Notification';
import { createTask } from 'store/thunks/taskThunks';
import { AppDispatch } from '../../../pages/login';

const MAX_LENGTH = 200;

export const TaskForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [taskText, setTaskText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!taskText.trim()) {
      setError('Task title is required')
      setTimeout(() => setError(null), 3000)
      return
    }

    try {
      setLoading(true)
      await dispatch(createTask({ text: taskText, important: false })).unwrap()
      setTaskText("")
    } catch (err) {
      setError(err as string)
      setTimeout(() => setError(null), 3000)
    } finally {
      setLoading(false)
    }
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTaskText(value);

    if (value.length >= MAX_LENGTH) {
      setError(`Task text must be ${MAX_LENGTH} characters maximum`);
    } else {
      setError(null);
    }
  };

  return (
    <>
      <form
        className="min-w-full flex flex-col gap-2 w-full max-w-md">
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={taskText}
          maxLength={MAX_LENGTH}
          type="text"
          onChange={handleChange} />
        {taskText.length > 0 &&
          <span className={`ml-auto text-sm ${taskText.length > MAX_LENGTH - 20
            ? 'text-red-500'
            : 'text-gray-500'
            }`}>
            {taskText.length}/{MAX_LENGTH}
          </span>}
        <button
          className={"w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-200"}
          type="submit"
          onClick={handleSubmit}>Add Task</button>
      </form>
      {error && <Notification message={error} type="error" />}
    </>
  )
}