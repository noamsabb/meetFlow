import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import { MeetingModel } from "../3-models/meeting-model";
import { TeamModel } from "../3-models/team-model";
import { ResourceNotFound } from "../3-models/client-error";

class DataService {
  public async getAllTeams(): Promise<TeamModel[]> {
    const sql = "select * from teams";
    const teams = (await dal.execute(sql)) as TeamModel[];
    return teams;
  }

   public async getAllMeetings(): Promise<MeetingModel[]> {
    const sql = "select * from meetings ";
    const meetings = (await dal.execute(sql)) as MeetingModel[];
    return meetings;
  }

  public async getMeetingsByTeam(teamId: number): Promise<MeetingModel[]> {
    const sql = "select * from meetings where teamId = ? ";
    const values = [teamId];
    const meetings = (await dal.execute(sql, values)) as MeetingModel[];
    return meetings;
  }

  public async getOneMeeting(id: number): Promise<MeetingModel> {
    const sql = "select * from meetings where id = ?";

    const values = [id];

    const meetings = (await dal.execute(sql, values)) as MeetingModel[];
    const meeting = meetings[0];

    if (!meeting) throw new ResourceNotFound(id);

    return meeting;
  }

  public async addMeeting(meeting: MeetingModel): Promise<MeetingModel> {
    meeting.validate();
    const sql =
      "insert into meetings(teamId, startTime, endTime, description, room ) values (?, ?, ?, ?, ?)";
    const values = [
      meeting.teamId,
      meeting.startTime,
      meeting.endTime,
      meeting.description,
      meeting.room,
    ];
    const info: OkPacketParams = (await dal.execute(
      sql,
      values
    )) as OkPacketParams;

    const dbMeeting = await this.getOneMeeting(info.insertId!);

    return dbMeeting;
  }

  public async deleteMeeting(id: number): Promise<void> {
    const sql = "delete from meetings where id = ?";
    const values = [id];

    const info: OkPacketParams = (await dal.execute(
      sql,
      values
    )) as OkPacketParams;

    if (info.affectedRows === 0) throw new ResourceNotFound(id);
  }
}

export const dataService = new DataService();
