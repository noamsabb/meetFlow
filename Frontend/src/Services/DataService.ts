import axios from "axios";
import { TeamModel } from "../Models/TeamModel";
import { store } from "../Redux/Store";
import { appConfig } from "../Utils/AppConfig";
import { meetingSlice } from "../Redux/MeetingSlice";
import { MeetingModel } from "../Models/MeetingModel";

class DataService {
  public async getAllTeams(): Promise<TeamModel[]> {
    const response = await axios.get<TeamModel[]>(appConfig.teamsUrl);
    const teams = response.data;
    return teams;
  }

  public async getMeetingByTeam(teamId: number): Promise<MeetingModel[]> {
    const meetings = store
      .getState()
      .meetings.filter((m) => m.teamId === teamId);
    if (meetings) return meetings;

    const response = await axios.get<MeetingModel[]>(
      appConfig.meetingsByTeamUrl + teamId
    );
    const dbMeetings = response.data;
    store.dispatch(meetingSlice.actions.initMeetings(dbMeetings));
    return dbMeetings;
  }

  public async getAllMeetings(): Promise<MeetingModel[]> {
        if(store.getState().meetings.length >0) return store.getState().meetings;
        const response = await axios.get<MeetingModel[]>(appConfig.meetingsUrl);
        
        const meetings = response.data;
            
        store.dispatch(meetingSlice.actions.initMeetings(meetings));
        return meetings;
    }


 public async addMeeting(meeting: MeetingModel): Promise<void> {
        const response = await axios.post<MeetingModel>(appConfig.meetingsUrl, meeting);
        const dbMeeting = response.data;
        store.dispatch(meetingSlice.actions.addMeeting(dbMeeting));

    }

    public async deleteMeeting(meetingId: number): Promise<void>{
        await axios.delete(appConfig.meetingsUrl + meetingId);
        store.dispatch(meetingSlice.actions.deleteMeeting(meetingId));
    }



}

export const dataService = new DataService();
