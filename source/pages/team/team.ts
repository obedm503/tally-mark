import { autoinject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
import { remote } from 'electron';
import 'metro';
import { Store } from '../../state/store';
import { log } from "../../util/log";

@autoinject
export class Team {
  private team: ITeam;
  private teamBak: ITeam;
  private creatingTeam: boolean = false;
  private isImageFile: boolean = false;
  private games: IGame[];
  private editing: boolean;

  constructor( private store: Store, private ea: EventAggregator ){}

  public activate( team ){
    this.store.state.subscribe( state => {
      log.info( state );
    });
  }

  deleteTeam(){
    remote.dialog.showMessageBox({
      type: 'question',
      buttons: ['Delete', 'Cancel'],
      defaultId: 1,
      cancelId: 1,
      title: 'the Title',
      message: 'The message',
      detail: 'a detail',
    }, selected => {
      // if ( selected === 0 ){
      //   this.ea.publish( 'list-delete', { item: this.team, route: 'teams' });
      //   this.store.deleteTeam( this.team );
      //   this.editing = false;
      // }
    });
  }

  edit(){
    this.editing = true;
  }

  cancelEdit(){
    // return to old state without loosing references in 'list'
    // Object.assign( this.team, this.teamBak );
    // this.editing = false;
  }

  saveEdit(){
    // this.editing = false;
    // const copy = JSON.parse( JSON.stringify( this.team ) );
    // this.teamBak = JSON.parse( JSON.stringify( this.team ) );
    // this.team = this.store.setTeam( copy );

    // this.ea.publish( 'list-add', { item: this.team, route: 'teams' });

    // this.games = this.team.games.map( el => {
    //   // const game = this.store.getGame( el.id );
    //   // game.teams = game.teams.map( team => Object.assign( team, this.store.getTeam( team.id ) ) );
    //   // return game;
    // });
  }

  create(){
    // this.editing = true;
    // this.team = {
    //   name: '',
    //   image: '',
    //   games: [],
    // };
    // this.games = [];
  }

  openImageFile(){
    remote.dialog.showOpenDialog( remote.getCurrentWindow(), {
      properties: ['openFile'],
    }, files => {
      // if ( !files ){
      //   return;
      // }
      // this.team.image = files[0];
    });
  }
}
