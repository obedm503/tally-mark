import { bindable } from 'aurelia-framework';
import * as $ from 'jquery';
import { ITeam } from '../app.d';

export class CreateTeam {
  @bindable team: ITeam;
  create(){
    console.log(this.team)
    return this.team;
  }
  public show(){
    $('#dialog').show();
  }
  hide(){
    $('#dialog').hide();
  }
}
