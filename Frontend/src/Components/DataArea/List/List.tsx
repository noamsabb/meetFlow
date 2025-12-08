import { ChangeEvent, useEffect, useState } from "react";
import "./List.css";
import { TeamModel } from "../../../Models/TeamModel";
import { dataService } from "../../../Services/DataService";
import { MeetingModel } from "../../../Models/MeetingModel";
import { notify } from "../../../Utils/Notify";
import { MeetingCard } from "../MeetingCard/MeetingCard";

export function List() {

  const [teams, setTeams] = useState<TeamModel[]>([]);
    const[meetings, setMeetings] = useState<MeetingModel[]>([]);
    const[selectedTeam, setSelectedTeam ] = useState<number | null>(null);;

useEffect(() => {
    dataService
      .getAllTeams()
      .then((teams) => setTeams(teams))
      .catch((err) => notify.error(err));
  }, []);

  function handleTeamChange(args: ChangeEvent<HTMLSelectElement>) {
    const teamId = +args.target.value;
    getMeetingsByTeam(teamId);
  }
  async function getMeetingsByTeam(teamId: number) {
    try {
      setSelectedTeam(teamId);
      if (teamId === 0) {
        const meetings = await dataService.getAllMeetings();
        setMeetings(meetings);
      } else {
        const meetings = await dataService.getMeetingByTeam(teamId);
        setMeetings(meetings);
      }
    } catch (err: any) {
      notify.error(err);
    }
  }

function getMeetingStatus(meeting: MeetingModel): "done" | "ongoing" | "upcoming" {
    const now = new Date();
    const start = new Date(meeting.startTime);
    const end = new Date(meeting.endTime);

    if (end < now) return "done";
    else if (start > now) return "upcoming";
    else return "ongoing";
}

  return (
    <div className="List">
      <select value={selectedTeam ?? ""} onChange={handleTeamChange}>
        <option disabled value="">
          Select Team ...
        </option>
        <option value={0}>All Teams</option>
        {teams.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>

<div className="MeetingGrid">
      {meetings.map(m => <MeetingCard key={m.id} meeting={m} status={getMeetingStatus(m)}       onMeetingDeleted={() => getMeetingsByTeam(selectedTeam || 0)}/>)}
    </div>
    </div>
  );
}
