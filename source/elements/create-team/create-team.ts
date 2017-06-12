import { bindable } from 'aurelia-framework';
import * as $ from 'jquery';

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
