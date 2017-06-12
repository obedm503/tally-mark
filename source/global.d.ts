declare module '*';

interface ITeam {
  id?: string;
  name: string;
  image: string;
  score?: number;
  games: IGame[];
}
interface IGame {
  id?: string;
  name: string;
  date: string;
  period: number;
  timer: string;
  teams: ITeam[];
}
