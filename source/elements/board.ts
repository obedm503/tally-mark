import { bindable, inject } from 'aurelia-framework';
import { ipcRenderer, remote } from 'electron';
import * as $ from 'jquery';
import 'metro';
import { Store } from '../services/store';

@inject(Store)
export class Board {
  public id: number = remote.getCurrentWebContents().id;
  @bindable game;

  constructor(public store: Store){

    console.log('id: ', this.id);
    ipcRenderer.on('board', (...args) => {
      console.log('board: ', ...args);
    });


    ipcRenderer.on('score', (e, team, score) => {
      this.game.teams[team].score = score;
    });
    ipcRenderer.on('time', (e, newTime) => {
      this.game.time = newTime;
    });

    ipcRenderer.on('teamName', (e, team, name) => {
      this.game.teams[team].name = name;
    });
    ipcRenderer.on('loadGame', (e, id) => {
      this.loadGame(id)
    });

  }

  loadGame(id: string){
    this.game = this.store.getGame(id);
    this.game.teams.map(team => Object.assign(team, this.store.getTeam(team.id)) );
    
    $('#countdown').countdown({
      minutes: this.game.timer,
      backgroundColor:'bg-black',
      dividerColor:'fg-white',
      labelColor:'#2D2D30'
    }).children('div').each(function(i){
      // hides days, hours, and theit dividers
      if( i < 4 ){
        $(this).hide();
      }
    });
  }

  score(team: number, newScore: number){
    this.game.teams[team].score = newScore;
  }
  name(team: number, newName: string){
    this.game.teams[team].name = newName;
  }
}
