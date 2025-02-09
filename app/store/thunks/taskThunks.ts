import { createAsyncThunk } from '@reduxjs/toolkit'
import { taskApi } from '../../services/taskApi'
import { CreateTaskDto, Priority, Task } from '../../../types/tasksTypes'
import { isApiError } from 'utils/isApiError'
import { setPriority } from 'store/slices/taskSlice'

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const tasks = await taskApi.getTasks()
      return tasks
    } catch (error) {
      if (isApiError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to create task')
      }
      return rejectWithValue('An unexpected error occurred')
    }
  }
)

export const createTask = createAsyncThunk<Task, { text: string; important?: boolean, _id: number }>(
  'tasks/createTask',
  async (task: CreateTaskDto, { rejectWithValue }) => {
    try {
      const newTask = await taskApi.createTask(task)
      return newTask
    } catch (error) {
      if (isApiError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to create task')
      }
      return rejectWithValue('An unexpected error occurred')
    }
  }
)

export const updateTaskText = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, text }: { id: number; text: string }, { rejectWithValue }) => {
    try {
      const updatedTask = await taskApi.updateTask(id, text)
      return updatedTask
    } catch (error) {
      if (isApiError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to update task')
      }
      return rejectWithValue('An unexpected error occurred')
    }
  }
)

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: number, { rejectWithValue }) => {
    try {
      await taskApi.deleteTask(id)
      return id
    } catch (error) {
      if (isApiError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to create task')
      }
      return rejectWithValue('An unexpected error occurred')
    }
  }
)

export const toggleImportant = createAsyncThunk(
  'tasks/toggleImportant',
  async (id: number, { rejectWithValue }) => {
    try {
      await taskApi.toggleImportant(id)
      return id
    } catch (error) {
      if (isApiError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to load task')
      }
      return rejectWithValue('An unexpected error occurred')
    }
  }
)

export const toggleCompleted= createAsyncThunk(
  'tasks/toggleCompleted',
  async (id: number, { rejectWithValue }) => {
    try {
      await taskApi.toggleCompleted(id)
      return id
    } catch (error) {
      if (isApiError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to toggle task\'s important')
      }
      return rejectWithValue('An unexpected error occurred')
    }
  }
)

export const togglePriority = createAsyncThunk(
  'tasks/togglePriority',
  async ({ _id, priority }: { _id: number; priority: Priority}, { dispatch }) => {
    try {
      const updatedTask = await taskApi.togglePriority(_id, priority);
      dispatch(setPriority({ _id, priority }));
      return updatedTask;
    } catch (error) {
      throw error;
    }
  }
);