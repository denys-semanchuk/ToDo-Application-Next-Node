import { AuthState } from "./authTypes";
import { TaskState } from "./tasksTypes";

export type { Task } from "./tasksTypes";
export { FilterType, SortType, Priority } from "./tasksTypes";
export type {
  User,
  AuthState,
  LoginCredentials,
  RegisterCredentials,
} from "./authTypes";

export type RootState = {
  tasks: TaskState
  auth: AuthState;
};
