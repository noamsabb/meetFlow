import Joi from "joi";
import { ValidationError } from "./client-error";

export class MeetingModel {
  public id?: number;
  public teamId?: number;
  public startTime!: string;
  public endTime!: string;
  public description!: string;
  public room!: string;

  public constructor(meeting: MeetingModel) {
   this.id = meeting.id;
   this.teamId = meeting.teamId;
   this.startTime =meeting.startTime;
   this.endTime =meeting.endTime;
   this.description =meeting.description;
   this.room =meeting.room;
  }


  private static validationSchema = Joi.object({
    id: Joi.number().optional().positive(),
    teamId: Joi.number().optional().positive(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
    description: Joi.string().max(100),
    room: Joi.string().required().max(50)
  });

  
  public validate(): void{
    const result = MeetingModel.validationSchema.validate(this);
    if(result.error)throw new ValidationError(result.error.message);
  }
}
