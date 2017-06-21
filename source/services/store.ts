import { remote } from 'electron';
import { BehaviorSubject } from 'rxjs';

const low = remote.require('lowdb');
const uuid = remote.require('uuid');

export class Store {
  private initialState = { games: [], teams: [] };
  private _state = new BehaviorSubject(this.initialState);
  private db;

  public teams: ITeam[] = [];
  public games: IGame[] = [];
  public state = this._state.asObservable();

  constructor(){
    const path = remote.app.getPath('userData');
    this.db = low(`${ path }/db.json`);

    this.db.defaults(this.initialState).write();

    this.games = this.db.get('games').value();
    this.games.forEach( game => {
      // fill teams
      game.teams.forEach( team => {
        Object.assign(team, this.getTeam(team.id));
      });
    });

    this.teams = this.db.get('teams').value();
    this.teams.forEach( team => {
      // fill games
      team.games.forEach( id => this.getGame(id as any) );
    });
    // console.log('games: ', this.games, 'teams: ', this.teams)
  }

  save(){
    const games = this.games.map( game => this.cleanGame(game) );

    const teams = this.teams.map( team => this.cleanTeam(team) );

    const newState = {
      games,
      teams,
    };
    this._state.next(newState);
    this.db.setState(newState);
  }

  cleanTeam( team: ITeam ){
    return {
      name: team.name,
      id: team.id || uuid(),
      image: team.image,
      games: team.games.map( game => game.id ),
    };
  }

  cleanGame( game: IGame ){
    return {
      name: game.name,
      id: game.id,
      teams: game.teams.map( team => ({
        id: team.id,
        score: team.score,
      }) ),
      date: game.date,
      period: game.period,
      timer: game.timer,
    };
  }

  getTeam(id: string): ITeam {
    return this.teams.find( team => team.id === id );
  }
  setTeam(team: ITeam): ITeam {
    team = this.cleanTeam(team) as any;

    const foundIndex = this.teams.findIndex( el => el.id === team.id);
    if ( foundIndex > -1 ){
      // update without loosing references
      Object.assign(this.teams[foundIndex], team);
    } else {
      this.teams.push(team);
    }

    this.save();

    return this.getTeam( team.id );
  }
  deleteTeam(team: ITeam): void {
    const index = this.teams.findIndex( el => el.id === team.id );
    this.teams.splice(index, 1);

    this.save();
  }

  getGame(id: string): IGame {
    return this.games.find( el => el.id === id );
  }
  setGame(game: IGame): IGame {
    game = this.cleanGame(game) as any;

    const foundIndex = this.games.findIndex( el => el.id === game.id);
    if ( foundIndex > -1 ){
      this.games[foundIndex] = {
        ...this.games[foundIndex],
        ...game,
      };
    } else {
      this.games.push(game);
    }

    this.save();

    return this.getGame( game.id );
  }
  deleteGame(game: IGame): void {
    const index = this.teams.findIndex( el => el.id === game.id );
    this.games.splice(index, 1);

    this.save();
  }
}
