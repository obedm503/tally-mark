import { bindable, inject } from 'aurelia-framework';
import { Store } from '../services/store';
import Pages from '../services/pages';

@inject(Store, Pages)
export class Teams {
  @bindable teams;

  constructor(public store: Store, public pages: Pages){
    this.teams = this.store.db.get('teams').value();
  }
  openTeam(i){
    let team = this.teams[i];
    this.pages.add({ title: team.name, viewModel: './pages/team', data: team.id });
  }
}
