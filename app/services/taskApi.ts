import { api } from "services";
import { CreateTaskDto, UpdateTaskDto } from "../types/tasksTypes";

export const taskApi = {
  async getTasks() {
    const response = await api.get("/tasks");
    return response.data;
  },

  async createTask(task: CreateTaskDto) {
    const response = await api.post("/tasks", task);
    return response.data;
  },

  async updateTask(id: number, task: UpdateTaskDto) {
    const response = await api.put(`/tasks/${id}`, task);
    return response.data;
  },

  async deleteTask(id: number) {
    await api.delete(`/tasks/${id}`);
  },

  async toggleImportant(id: number) {
    const response = await api.patch(`/tasks/${id}/important`);
    return response.data;
  },

  async toggleCompleted(id: number) {
    const response = await api.patch(`/tasks/${id}/completed`);
    return response.data;
  },
};
