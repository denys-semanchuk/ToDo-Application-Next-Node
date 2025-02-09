import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Priority, SortType, Task, FilterType } from "../../../types";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTaskText,
  toggleImportant,
  toggleCompleted,
} from "store/thunks/taskThunks";
import { TaskState } from "../../../types/tasksTypes";

const STORAGE_KEY = "tasks";

const initialState: TaskState = {
  tasks: [],
  filter: FilterType.ALL,
  sort: SortType.ASC,
  loading: false,
  error: null,
  timeSort: SortType.ASC,
  prioritySort: SortType.ASC,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    reorderTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
    },
    addTask: (state, action: PayloadAction<string>) => {
      state.tasks.push({
        _id: state.tasks.length,
        text: action.payload,
        completed: false,
        important: false,
        priority: Priority.MEDIUM,
        timestamp: new Date().getTime(),
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
    },
    toggleImportant: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((task) => task._id === action.payload);
      if (task) {
        task.important = !task.important;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
      }
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((task) => task._id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
      }
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
    },
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },

    setSortingByTime: (state) => {
      if (state.sort === SortType.ASC) {
        state.sort = SortType.DESC;
      } else {
        state.sort = SortType.ASC;
      }
      state.tasks = state.tasks.sort((a, b) =>
        state.sort === SortType.ASC
          ? a.timestamp - b.timestamp
          : b.timestamp - a.timestamp
      );
    },

    updateTask: (
      state,
      action: PayloadAction<{ _id: number; text: string }>
    ) => {
      const task = state.tasks.find((task) => task._id === action.payload._id);
      if (!task) return;
      task.text = action.payload.text;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
    },

    clearCompleted: (state) => {
      state.tasks = state.tasks.filter((task) => !task.completed);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
    },

    setPriority: (
      state,
      action: PayloadAction<{ _id: number; priority: Priority }>
    ) => {
      const task = state.tasks.find((task) => task._id === action.payload._id);
      if (task) {
        task.priority = action.payload.priority;
      }
    },
    sortByPriority: (state) => {
      state.prioritySort =
        state.prioritySort === SortType.ASC ? SortType.DESC : SortType.ASC;
      const priorityOrder = {
        [Priority.HIGH]: 3,
        [Priority.MEDIUM]: 2,
        [Priority.LOW]: 1,
      };
      state.tasks = state.tasks.sort((a, b) => {
        return state.prioritySort === SortType.ASC
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
    });

    builder.addCase(createTask.pending, (state, action) => {
      const optimisticTask: Task = {
        _id: action.meta.arg._id,
        text: action.meta.arg.text || "",
        completed: false,
        important: action.meta.arg.important || false,
        timestamp: Date.now(),
        priority: Priority.LOW,
      };
      state.tasks.unshift(optimisticTask);
    });

    builder.addCase(createTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task._id !== action.meta.arg._id
      );
      state.tasks.unshift(action.payload);
    });

    builder.addCase(createTask.rejected, (state, action) => {
      state.loading = false;
      state.tasks = state.tasks.filter(
        (task) => task._id !== action.meta.arg._id
      );
      state.error = action.payload as string;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = false;
      state.tasks = state.tasks.splice(0, 1);
      state.error = action.payload as string;
    });

    builder.addCase(updateTaskText.pending, (state, action) => {
      const task = state.tasks.find((t) => t._id === action.meta.arg.id);
      if (task) {
        task.text = action.meta.arg.text;
      }
    });

    builder.addCase(updateTaskText.fulfilled, (state, action) => {
      const task = state.tasks.find((t) => t._id === action.meta.arg.id);
      if (task) {
        task.text = action.payload.text;
      }
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    });

    builder.addCase(toggleImportant.pending, (state, action) => {
      const task = state.tasks.find((t) => t._id === action.meta.arg);
      if (task) {
        task.important = !task.important;
      }
    });

    builder.addCase(toggleImportant.rejected, (state, action) => {
      const task = state.tasks.find((t) => t._id === action.meta.arg);
      if (task) {
        task.important = !task.important;
      }
      state.error = action.payload as string;
    });
    builder.addCase(toggleCompleted.pending, (state, action) => {
      const task = state.tasks.find((t) => t._id === action.meta.arg);
      if (task) {
        task.completed = !task.completed;
      }
    });

    builder.addCase(toggleCompleted.rejected, (state, action) => {
      const task = state.tasks.find((t) => t._id === action.meta.arg);
      if (task) {
        task.completed = !task.completed;
      }
      state.error = action.payload as string;
    });
  },
});
export const {
  addTask,
  removeTask,
  toggleTask,
  setFilter,
  setSortingByTime,
  reorderTasks,
  clearCompleted,
  setPriority,
  sortByPriority,
} = taskSlice.actions;

export default taskSlice.reducer;
