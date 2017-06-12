import { bindable, inject } from 'aurelia-framework';
import { ipcRenderer, remote } from 'electron';
import * as $ from 'jquery';
import 'metro';
import { Store } from './services/store';

@inject(Store)
export class Board {
  public id: number = remote.getCurrentWebContents().id;
  @bindable game: IGame;

  constructor(public store: Store){
    console.log('id: ', this.id);

    ipcRenderer.on('update', (e, game) => {
      console.log('update', e, game)
      Object.assign(this.game, game)
      this.game.teams.push(1 as any)
      this.game.teams.pop();
    });
    ipcRenderer.on('load', (e, game) => {
      console.log('load', e, game)
      this.loadGame(game);
    });

  }

  loadGame(game: IGame){
    this.game = game;
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

  // score(team: number, newScore: number){
  //   this.game.teams[team].score = newScore;
  // }
  // name(team: number, newName: string){
  //   this.game.teams[team].name = newName;
  // }
}
