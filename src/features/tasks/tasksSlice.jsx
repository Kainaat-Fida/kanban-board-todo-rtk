import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "kanban_board.tasks.v1";

const initialState = {
  tasks: [], 
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {

    addTask: {
      reducer(state, action) {
       
        state.tasks.unshift(action.payload);
      },
      prepare({ title, description, date }) {
        const id = `${Date.now().toString(36)}_${Math.random()
          .toString(36)
          .slice(2, 6)}`;
        return {
          payload: {
            id,
            title: (title ?? "").trim(),
            description: (description ?? "").trim(),
            date: date ?? "",
            status: "todo",
          },
        };
      },
    },


    updateTask(state, action) {
      const { id, updates } = action.payload;
      const t = state.tasks.find((x) => x.id === id);
      if (t) {
        Object.assign(t, updates);
      }
    },


    deleteTask(state, action) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },


    moveTask(state, action) {
      const { id, status } = action.payload;
      const t = state.tasks.find((x) => x.id === id);
      if (t) t.status = status;
    },

    
    setTasks(state, action) {
      state.tasks = action.payload || [];
    },
  },
});

export const { addTask, updateTask, deleteTask, moveTask, setTasks } =
  tasksSlice.actions;

export default tasksSlice.reducer;

// Selectors
export const selectAllTasks = (state) => state.tasks.tasks;
export const selectTasksByStatus =
  (status) =>
  (state) =>
    state.tasks.tasks.filter((t) => t.status === status);
