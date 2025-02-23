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
  _id: number;
  text: string;
  completed: boolean;
  timestamp: number;
  important: boolean;
  priority: Priority;
}

export interface CreateTaskDto {
  id?:number;
  text?: string;
  important?: boolean;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  important?: boolean;
  completed?: boolean;
}

export interface TaskState {
  tasks: Task[];
  filter: FilterType;
  sort: SortType;
  loading: boolean;
  error: string | null;
  timeSort: SortType;
  prioritySort: SortType;
  completedTasksBackup?: Task[];
}