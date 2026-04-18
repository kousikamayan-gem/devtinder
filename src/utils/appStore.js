import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import feedSlice from "./feedSlice";
import connectionSlice from './connectionSlice';
import requestSlice from './requestSlice'

export const appStore = configureStore({
    reducer: {
        user: userSlice,
        feed: feedSlice,
        connection: connectionSlice,
        request: requestSlice
    }
})