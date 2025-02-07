import { createAsyncThunk } from '@reduxjs/toolkit'
import { taskApi } from '../../services/taskApi'
import { CreateTaskDto, Task, UpdateTaskDto } from '../../types/tasksTypes'
import { isApiError } from 'utils/isApiError'

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

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, task }: { id: string; task: UpdateTaskDto }, { rejectWithValue }) => {
    try {
      const updatedTask = await taskApi.updateTask(id, task)
      return updatedTask
    } catch (error) {
      if (isApiError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to create task')
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