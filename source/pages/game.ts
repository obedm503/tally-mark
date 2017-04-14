import { bindable, inject } from 'aurelia-framework';
import { ipcRenderer, remote } from 'electron';
import { Store } from '../services/store';

@inject(Store)
export class Game {
  @bindable game;
  @bindable board;

  constructor(public store: Store){}

  score(team, newScore){
    this.game.teams[team].score = newScore;
    ipcRenderer.sendTo(2, 'score', team, newScore);
  }

  time(newTime){
    this.game.time = newTime;
    ipcRenderer.sendTo(2, 'time', newTime);
  }

  activate(id){
    this.game = this.store.getGame(id);
    this.game.teams.map(team => Object.assign(team, this.store.getTeam(team.id)) );
    ipcRenderer.sendTo(2,'loadGame', id);
  }

}
