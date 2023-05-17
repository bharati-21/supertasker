import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "./features/tasks-slice";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer
    }
});