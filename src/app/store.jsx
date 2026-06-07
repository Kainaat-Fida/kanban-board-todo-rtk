import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/tasksSlice";

const STORAGE_KEY = "kanban_board.tasks.v1";

function loadTasksFromLocalStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTasksToLocalStorage(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {}
}

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  // hydrate tasks slice from localStorage
  preloadedState: {
    tasks: { tasks: loadTasksFromLocalStorage() },
  },
});

// persist on every state change (simple approach)
store.subscribe(() => {
  try {
    const tasks = store.getState().tasks.tasks;
    saveTasksToLocalStorage(tasks);
  } catch {}
});
