import { createAction } from "@reduxjs/toolkit";

export const addTask = createAction('tasks/addTask')
export const toggleTaskStatus = createAction('tasks/toggleTaskStatus')
export const deleteTask = createAction('tasks/deleteTask')
export const updateTask = createAction('tasks/updateTask')
// export const initTaskFromLocalStorage = createAction('tasks/initTaskFromLocalStorage')