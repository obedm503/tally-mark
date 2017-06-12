import { bindable, inject } from 'aurelia-framework';
import { Store } from '../../services/store';
import 'metro';
import { remote } from 'electron';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(Store, EventAggregator)
export class Team {
  @bindable team: ITeam;
  @bindable teamBak: ITeam;
  @bindable creatingTeam: boolean = false;
  @bindable isImageFile: boolean = false;
  @bindable games: IGame[];
  @bindable editing: boolean;

  constructor(public store: Store, public ea: EventAggregator){}

  activate(team){
    this.team = this.store.getTeam(team.id);
    this.teamBak = JSON.parse(JSON.stringify( this.team ));
    // this.games = this.team.games;
    console.log(JSON.stringify(this.store.teams, null, 2))
    // this.games = this.team.games.map( el => {
    //   let game = this.store.getGame(el.id);
    //   game.teams.map(team => Object.assign(team, this.store.getTeam(team.id) ));
    //   return game;
    // });
  }

  deleteTeam(){
    remote.dialog.showMessageBox({
      type: 'question',
      buttons: ['Delete', 'Cancel'],
      defaultId: 1,
      cancelId: 1,
      title:'the Title',
      message:'The message',
      detail: 'a detail',
    }, selected => {
      if( selected === 0 ){
        this.ea.publish('list-delete', { item: this.team, route: 'teams' });
        this.store.deleteTeam(this.team);
        this.editing = false;
      }
    });
  }

  edit(){
    this.editing = true;
  }

  cancelEdit(){
    // return to old state without loosing references in 'list'
    Object.assign(this.team, this.teamBak );
    this.editing = false;
  }

  saveEdit(){
    this.editing = false;
    let copy = JSON.parse( JSON.stringify(this.team) );
    this.teamBak = JSON.parse( JSON.stringify(this.team) );
    this.team = this.store.setTeam(copy);

    this.ea.publish('list-add', { item: this.team, route: 'teams' });

    this.games = this.team.games.map(el => {
      let game = this.store.getGame(el.id);
      game.teams = game.teams.map(team => Object.assign(team, this.store.getTeam(team.id) ));
      return game;
    });
  }

  create(){
    this.editing = true;
    this.team = {
      name:'',
      image:'',
      games:[]
    };
    this.games = [];
  }

  openImageFile(){
    remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
      properties: ['openFile']
    }, files => {
      if(!files){
        return;
      }
      this.team.image = files[0];
    });
  }
}
