import { remote } from 'electron';

const low = remote.require('lowdb');
const uuid = remote.require('uuid');


interface ITeam {
  id?:string;
  name: string;
  image: string;
}
interface IGame {
  id?:string;
  name:string;
  date:string;
  time:number;
  timer:number;
  teams: ITeam[];
}

export class Store {
  public db;
  private path: string;
  constructor(){
    this.path = remote.app.getPath('userData');
    this.db = low(`${ this.path }/db.json`);

    this.db.defaults({ games: [], teams: [] }).write();
  }

  getTeam(id: string): ITeam {
    return this.db.get('teams').find({ id: id }).value();
  }
  setTeam(team: ITeam){
    let storedTeam = this.db.get('teams').find({id: team.id });

    team.id = team.id ? team.id : uuid();

    if( storedTeam.value() ){
      storedTeam.assign(team).write();
    } else {
      this.db.get('teams').push(team).write();
    }
  }
  getGame(id: string): IGame {
    return this.db.get('games').find({ id: id }).value();
  }
  setGame(game: IGame){
    let storedGame = this.db.get('teams').find({id: game.id });

    game.id = game.id ? game.id : uuid();

    if( storedGame.value() ){
      storedGame.assign(game).write();
    } else {
      this.db.get('games').push(game).write();
    }  }
}
