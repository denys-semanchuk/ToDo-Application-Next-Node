export enum FilterType {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  IMPORTANT = 'IMPORTANT'
}

export enum SortType {
  ASC = 'ASC',
  DESC = 'DESC'
}

export enum Priority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export type Task = {
  id: number;
  text: string;
  completed: boolean;
  timestamp: number;
  important: boolean;
  priority: Priority;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  important?: boolean;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  important?: boolean;
  completed?: boolean;
}