import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../features/reducers";


 const store = configureStore({
    reducer: rootReducer,
})

export default store