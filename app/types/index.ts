import { AuthState } from "./authTypes";
import { FilterType, SortType, Task } from "./tasksTypes";

export type { Task } from "./tasksTypes";
export { FilterType, SortType, Priority } from "./tasksTypes";
export type {
  User,
  AuthState,
  LoginCredentials,
  RegisterCredentials,
} from "./authTypes";

export type RootState = {
  tasks: {
    tasks: Task[];
    filter: FilterType;
    sort: SortType;
  };
  auth: AuthState;
};
