class AppConfig {
	public readonly meetingsUrl = "http://localhost:4000/api/meetings/";
	public readonly teamsUrl = "http://localhost:4000/api/teams/";
	public readonly meetingsByTeamUrl = "http://localhost:4000/api/meetings-by-team/"; 
}

export const appConfig = new AppConfig();
