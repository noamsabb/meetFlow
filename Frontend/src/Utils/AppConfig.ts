class AppConfig {
    // Base URL depuis variable d'environnement ou localhost par défaut  
    private readonly baseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
    
    public readonly meetingsUrl = `${this.baseUrl}/api/meetings/`;
    public readonly teamsUrl = `${this.baseUrl}/api/teams/`;
    public readonly meetingsByTeamUrl = `${this.baseUrl}/api/meetings-by-team/`;
}

export const appConfig = new AppConfig();