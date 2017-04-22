export interface ITeam {
  id?:   string;
  name:  string;
  image: string;
}
export interface IGame {
  id?:   string;
  name:  string;
  date:  string;
  time:  number;
  timer: number;
  teams: ITeam[];
}
