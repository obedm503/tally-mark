import { bindable, inject } from 'aurelia-framework';
import { Store } from '../services/store';
import 'metro';
import { remote } from 'electron';

@inject(Store)
export class Team {
  @bindable name: string;
  @bindable image: string;
  @bindable creatingTeam: boolean = false;
  @bindable isImageFile: boolean = false;

  constructor(public store: Store){}

  activate(team){
    this.name = team.name;
    this.image = team.image;
  }

  createNewTeam(){
    console.log(this.name, this.image);
  }

  openImageFile(){
    remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
      properties: ['openFile']
    }, files => {
      if(!files){
        return;
      }
      this.image = files[0];
    });
  }
}
