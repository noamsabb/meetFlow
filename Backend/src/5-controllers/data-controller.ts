import express, { NextFunction, Request, Response } from "express";
import { dataService } from "../4-services/data-service";
import { MeetingModel } from "../3-models/meeting-model";
import { StatusCode } from "../3-models/enums";

class DataController {

    public readonly router = express.Router();

    public constructor() {
        this.router.get("/api/teams", this.getAllTeams);
        this.router.get("/api/meetings", this.getAllMeetings);
        this.router.get("/api/meetings-by-team/:teamId", this.getMeetingsByTeam);
        this.router.get("/api/meetings/:id", this.getOneMeeting);
        this.router.post("/api/meetings", this.addMeeting);
        this.router.delete("/api/meetings/:id", this.deleteMeeting);
    }

    private async getAllTeams(request: Request, response: Response, next: NextFunction) {
	   const teams = await dataService.getAllTeams();
	   response.json(teams);
    }
      private async getAllMeetings(request: Request,response: Response,) {
    const meetings = await dataService.getAllMeetings();
    response.json(meetings);
  }

      private async getMeetingsByTeam(request: Request,response: Response) {
    const teamId = +request.params.teamId;
    const meetings = await dataService.getMeetingsByTeam(teamId);
    response.json(meetings);
  }

     private async getOneMeeting(request: Request, response: Response) {
    const id = +request.params.id;
    const meeting = await dataService.getOneMeeting(id);
    response.json(meeting);
  }

    private async addMeeting(request: Request, response: Response) {
    const meeting = new MeetingModel(request.body);
    const dbMeeting = await dataService.addMeeting(meeting);
    response.status(StatusCode.Created).json(dbMeeting);
  }

   private async deleteMeeting(request: Request, response: Response) {
    const id = +request.params.id;
    await dataService.deleteMeeting(id);
    response.sendStatus(StatusCode.NoContent);
  }
}

export const dataController = new DataController();
