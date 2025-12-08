

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MeetingModel } from "../Models/MeetingModel";

// Init products for the first time: 
function initMeetings(_currentState: MeetingModel[], action: PayloadAction<MeetingModel[]>): MeetingModel[] {

    const initialMeetings: MeetingModel[] = action.payload;

    const newState: MeetingModel[] = initialMeetings;

    return newState;
}

// Add new product: 
function addMeeting(currentState: MeetingModel[], action: PayloadAction<MeetingModel>): MeetingModel[] {
    
    const newState = [...currentState];

    const meetingToAdd = action.payload;

    newState.push(meetingToAdd);

    return newState;
}

// Delete existing product: 
function deleteMeeting(currentState: MeetingModel[], action: PayloadAction<number>): MeetingModel[] {

    const newState = [...currentState];

    const MeetingToDelete = action.payload;

    const indexToDelete = newState.findIndex(p => p.id === MeetingToDelete);
    newState.splice(indexToDelete, 1);

    return newState;
}

export const meetingSlice = createSlice({
    name: "meetingSlice", 
    initialState: [] as MeetingModel[], 
    reducers: { initMeetings, addMeeting, deleteMeeting }
});
