import { createSlice } from "@reduxjs/toolkit";
import { addTask, deleteTask, toggleTaskStatus, updateTask } from "../../actions/taskActions";

const initialState = []

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder.addCase(addTask,(state, action)=>{
        console.log(state);
        console.log(action.payload);
        state.push(action.payload)
    })
    .addCase(toggleTaskStatus, (state, action) => {
        console.log(action.payload);
        const task = state.find((t) => t.id === action.payload);
        if (task) {
          task.status = task.status === 'Incomplete' ? 'Complete' : 'Incomplete';
        }
      })
    .addCase(deleteTask, (state, action)=>{
        console.log(action.payload);
        return state.filter(task => task.id !== action.payload)
    })
    .addCase(updateTask, (state, action)=>{
        console.log(action.payload);
        const {id, name, status, time} = action.payload;
        const taskToUpdate = state.find(task => task.id === id)

        if(taskToUpdate){
            taskToUpdate.name = name,
            taskToUpdate.status = status,
            taskToUpdate.time = time
        }
    })
  }


    // addToTask: (state, action) => {
    //   state.push(action.payload);
    // },

    // toggleTaskStatus: (state, action) => {
    //   const task = state.filter((t) => t.id === action.payload);
    //   if (task) {
    //     task.status === "Incomplete" ? "Complete" : "Incomplete";
    //   }
    // },

    // deleteTask: (state, action) => {
    //   const deleteTask = state.filter((task) => task.id !== action.payload);
    //   return deleteTask;
    // },
  
});

// export const { addToTask, toggleTaskStatus, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
