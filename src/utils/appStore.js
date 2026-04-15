import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import feedSlice from "./feedSlice";

export const appStore = configureStore({
    reducer: {
        user: userSlice,
        feed: feedSlice
    }
})