import { useForm } from "react-hook-form";
import { MeetingModel } from "../../../Models/MeetingModel";
import { TeamModel } from "../../../Models/TeamModel";
import "./New.css";
import { useEffect, useState } from "react";
import { dataService } from "../../../Services/DataService";
import { notify } from "../../../Utils/Notify";

export function New() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<MeetingModel>();
  const [teams, setTeams] = useState<TeamModel[]>([]);
  useEffect(() => {
    dataService
      .getAllTeams()
      .then((teams) => setTeams(teams))
      .catch((err) => notify.error(err));
  }, []);

  async function send(meeting: MeetingModel) {
    try {
      await dataService.addMeeting(meeting);
      notify.success("Meeting has been added.");
      reset();
    } catch (err: any) {
      notify.error(err);
      
    }
  }

  return (
    <div className="New">
      <form onSubmit={handleSubmit(send)}>


<label>Category:</label>
        <select defaultValue="" {...register("teamId")} required>
          <option disabled value="">
            Select Team ...
          </option>
          {teams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <label>Start Time:</label>
        <input
          type="text"
          {...register("startTime", {
            required: true,
            pattern: {
              value: /^\d{4}-(1[0-2]|0[1-9])-(0[1-9]|[12][0-9]|3[01]) ([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
              message: "Date must be in YYYY-MM-DD HH:MM format",
            },
          })}
          placeholder="YYYY-MM-DD HH:MM"
        />
        {errors.startTime && <span>{errors.startTime.message}</span>}

        <label>End Time:</label>
        <input
          type="text"
          {...register("endTime", {
            required: true,
            pattern: {
              value: /^\d{4}-(1[0-2]|0[1-9])-(0[1-9]|[12][0-9]|3[01]) ([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
              message: "Date must be in YYYY-MM-DD HH:MM format",
            },
          })}
          placeholder="YYYY-MM-DD HH:MM"
        />
        {errors.endTime && <span>{errors.endTime.message}</span>}

        <label>Description:</label>
        <input
          type="text"
          {...register("description")}
          minLength={0}
          maxLength={100}
          required
        />
        <label>Room:</label>
        <input
          type="text"
          {...register("room")}
          minLength={0}
          maxLength={50}
          required
        />

        <button>Add</button>
      </form>
    </div>
  );
}
