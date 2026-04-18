import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addFeed: (state, action) => {return action.payload},
        removeFeed: (state, action) => {
            console.log(state)
            const newfeed = state.filter(f=> f._id !== action.payload);
            return newfeed;
        },
    },
});

export const { addFeed, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;