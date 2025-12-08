import { configureStore } from "@reduxjs/toolkit";
import { MeetingModel } from "../Models/MeetingModel";
import { meetingSlice } from "./MeetingSlice";

// The entire application global state (all slices data):
export type AppState = {
    meetings: MeetingModel[]
};

// Store - the main redux object handling it all:
export const store = configureStore<AppState>({
    reducer: {
        meetings: meetingSlice.reducer
    }
});
