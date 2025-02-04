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

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  timestamp: number;
  important: boolean;
  priority: Priority;
}

export interface RootState {
  tasks: {
    tasks: Task[];
    filter: FilterType;
    sort: SortType;
  },
  auth: AuthState
}

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  createdAt: Date;
}

export interface UserDTO {
  username: string;
  password: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}