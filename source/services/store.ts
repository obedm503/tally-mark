import { createStore } from 'redux';
import { normalize } from 'normalizr';
import { remote } from 'electron';
import { BehaviorSubject } from 'rxjs';
import store from '../state/store';
import { creators } from '../state/actions';

const low = remote.require('lowdb');
const uuid = remote.require('uuid');

export class Store {
  public teams: ITeam[] = [];
  public games: IGame[] = [];
  private initialState = { games: [], teams: [] };
  private db;

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

    store.subscribe(() => {
      console.log('state: ', this.db.value() , 'normalized state: ', store.getState() );
    });
    store.dispatch(creators.normalize());

  }

  public save(){
    const games = this.games.map( game => this.cleanGame(game) );

    const teams = this.teams.map( team => this.cleanTeam(team) );

    const newState = {
      games,
      teams,
    };
    this.db.setState(newState);
  }

  public cleanTeam( team: ITeam ){
    return {
      name: team.name,
      id: team.id || uuid(),
      image: team.image,
      games: team.games.map( game => game.id ),
    };
  }

  public cleanGame( game: IGame ){
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

  public getTeam(id: string): ITeam {
    return this.teams.find( team => team.id === id );
  }
  public setTeam(team: ITeam): ITeam {
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
  public deleteTeam(team: ITeam): void {
    const index = this.teams.findIndex( el => el.id === team.id );
    this.teams.splice(index, 1);

    this.save();
  }

  public getGame(id: string): IGame {
    return this.games.find( el => el.id === id );
  }
  public setGame(game: IGame): IGame {
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
  public deleteGame(game: IGame): void {
    const index = this.teams.findIndex( el => el.id === game.id );
    this.games.splice(index, 1);

    this.save();
  }
}
