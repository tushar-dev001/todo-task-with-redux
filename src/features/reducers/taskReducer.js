import { createSlice } from "@reduxjs/toolkit";
import {
  addTask,
  deleteTask,
  toggleTaskStatus,
  updateTask,
} from "../../actions/taskActions";

// Load tasks from local storage
const loadTasksFromLocalStorage = () => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
};

// Initial state
const initialState = loadTasksFromLocalStorage();

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {}, // No local reducers defined as we use actions from taskActions
  extraReducers: (builder) => {
    builder
      .addCase(addTask, (state, action) => {
        // Add the new task to the state
        state.push(action.payload);
        // Save the updated state to local storage
        localStorage.setItem("tasks", JSON.stringify(state));
      })
      .addCase(toggleTaskStatus, (state, action) => {
        console.log(action.payload); // Log the payload for debugging
        // Find the task to toggle status
        const task = state.find((t) => t.id === action.payload);
        if (task) {
          // Toggle the status of the task
          task.status = task.status === "Incomplete" ? "Complete" : "Incomplete";
          // Save the updated state to local storage
          localStorage.setItem("tasks", JSON.stringify(state));
        }
      })
      .addCase(deleteTask, (state, action) => {
        // Filter out the task to be deleted
        const updatedState = state.filter((task) => task.id !== action.payload);
        // Save the updated state to local storage
        localStorage.setItem("tasks", JSON.stringify(updatedState));
        // Return the updated state
        return updatedState;
      })
      .addCase(updateTask, (state, action) => {
        console.log(action.payload); // Log the payload for debugging
        const { id, name, status, time } = action.payload;
        // Find the task to update
        const taskToUpdate = state.find((task) => task.id === id);
        if (taskToUpdate) {
          // Update task properties
          taskToUpdate.name = name;
          taskToUpdate.status = status;
          taskToUpdate.time = time;
          // Save the updated state to local storage
          localStorage.setItem("tasks", JSON.stringify(state));
        }
      });
  },
});

// Export the reducer to be used in the store
export default tasksSlice.reducer;
