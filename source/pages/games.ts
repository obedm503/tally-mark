import { bindable, inject } from 'aurelia-framework';
import { Store } from '../services/store';
import { ipcRenderer } from 'electron';
import Pages from '../services/pages';

@inject(Store, Pages)
export class Games {
  @bindable games;

  constructor(public store: Store, public pages: Pages){
    this.games = this.store.db.get('games').value();
    this.games.forEach(game => {
      game.teams.map(team => Object.assign(team, this.store.getTeam(team.id)) );
    });
  }
  openGame(i){
    let game = this.games[i];
    this.pages.add({ title: game.name, viewModel: './pages/game', data: game.id });
  }
}
