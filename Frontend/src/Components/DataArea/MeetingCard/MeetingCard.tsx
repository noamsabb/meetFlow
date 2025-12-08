import { useEffect, useState } from "react";
import { MeetingModel } from "../../../Models/MeetingModel";
import "./MeetingCard.css";
import { TeamModel } from "../../../Models/TeamModel";
import { dataService } from "../../../Services/DataService";
import { notify } from "../../../Utils/Notify";
import { useNavigate } from "react-router-dom";

type MeetingCardProps = {
  meeting: MeetingModel;
  status: "done" | "ongoing" | "upcoming";
};

export function MeetingCard(props: MeetingCardProps) {
  const [teams, setTeams] = useState<TeamModel[]>([]);
useEffect(() => {
    dataService
      .getAllTeams()
      .then((teams) => setTeams(teams))
      .catch((err) => notify.error(err));
  }, []);

  const navigate = useNavigate();
  const { meeting, status } = props;
  const start = new Date(meeting.startTime);
  const end = new Date(meeting.endTime);

  const date = start.toLocaleDateString();
  const startTime = start.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTime = end.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const durationMs = end.getTime() - start.getTime();
  const durationMin = Math.round(durationMs / (1000 * 60));
  const hours = Math.floor(durationMin / 60);
  const minutes = durationMin % 60;
  const durationText = hours > 0 ? `${hours}h ${minutes}min` : `${minutes}min`;

  function getTeamName(teamId: number) {
    const team = teams.find((t) => t.id === teamId);
    console.log(team);
    return team ? team.name : "";
  }

  async function deleteMeeting(productId: number){
    try {
      const sure = confirm("Are you sure ?");
      if(!sure)return;
      await dataService.deleteMeeting(productId);
      notify.success("Product has been deleted.");
        navigate("/home");
    } catch (err: any) {
      notify.error(err);
    }

  }

  
  return (
    <div className={`MeetingCard ${status}`}>
      <div className="meeting-header">
        <strong>{getTeamName(meeting.teamId)}</strong>
        <span>{date}</span>
      </div>

      <div className="meeting-time">
        <span>
          {startTime} - {endTime}
        </span>
        <span>({durationText})</span>
      </div>

      <div className="meeting-body">
        <p>{meeting.description}</p>
        <p>
          <strong>Room:</strong> {meeting.room}
        </p>
        <button onClick={() => deleteMeeting(meeting.id)}>❌</button>
      </div>
    </div>
  );
}
