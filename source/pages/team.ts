import { bindable, inject } from 'aurelia-framework';
import { Store } from '../services/store';

@inject(Store)
export class Team {
  @bindable name;
  @bindable image;

  constructor(public store: Store){

  }
  activate(id){
    let team = this.store.getTeam(id);
    this.name = team.name;
    this.image = team.image;
  }
}
