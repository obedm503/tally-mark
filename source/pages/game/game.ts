import { EventAggregator } from 'aurelia-event-aggregator';
import { bindable, BindingEngine, inject, ObserverLocator } from 'aurelia-framework';
import { ipcRenderer, remote } from 'electron';
import * as $ from 'jquery';
import 'metro';
import { Store } from '../../services/store';

@inject(Store, EventAggregator, ObserverLocator, BindingEngine)
export class Game {
  @bindable game: IGame;
  @bindable editing: boolean = false;
  @bindable teams: ITeam[];
  @bindable gameTeams: ITeam[];
  private gameBak;
  @bindable teamMatcher = (a, b) => a.id === b.id;

  constructor(
    public store: Store,
    public ea: EventAggregator,
    public observer: ObserverLocator,
    public binding: BindingEngine,
  ){
    this.teams = this.store.teams;
  }

  activate(game){
    this.game = this.store.getGame(game.id);
    // this.gameTeams = this.game.teams;

    // this.gameTeams.forEach( team => {
    //   this.binding.propertyObserver(team, 'id').subscribe( splices => {
    //     console.log(splices)
    //   });
    // });

    // this.binding.collectionObserver(this.gameTeams).subscribe((a) => console.log(a))

    this.gameBak = JSON.parse(JSON.stringify( this.game ));
    // this.game.teams.map(team => Object.assign(team, this.store.getTeam(team.id)) );
    ipcRenderer.sendTo(2, 'load', game);
  }
  updateTeam(){
    ipcRenderer.sendTo(2, 'update', this.game);
  }

  selectedTeam(team: ITeam, e){
    console.log(this.game.teams, team, e);
    // this.store.getTeam(team.id);
  }
  edit(){
    this.editing = true;
  }
  cancel(){
    this.editing = false;
    Object.assign(this.game, this.gameBak );
  }
  delete(){
    remote.dialog.showMessageBox({
      type: 'question',
      buttons: ['Delete', 'Cancel'],
      defaultId: 1,
      cancelId: 1,
      title: 'the Title',
      message: 'The message',
      detail: 'a detail',
    }, selected => {
      if ( selected === 0 ){
        this.ea.publish('list-delete', { item: this.game, route: 'games' });
        this.store.deleteGame(this.game);
        this.editing = false;
      }
    });
  }
  create(){
    this.editing = true;
    this.game = {
      name: '',
      date: ( new Date() ).format('yyyy.mm.dd'),
      period: 1,
      timer: '0',
      teams: [],
    };
  }
  save(){
    this.editing = false;
    const copy = JSON.parse( JSON.stringify(this.game) );
    this.gameBak = JSON.parse( JSON.stringify(this.game) );
    this.game = this.store.setGame(copy);

    this.ea.publish('list-add', { item: this.game, route: 'games' });

    // $.Notify({
    //   caption: `${copy.name} Saved!`,
    //   content: 'You successfully saved the game.',
    //   type: 'success',
    //   shadow: true,
    //   timeout: 5000
    // });
  }

  score(team, newScore){
    const score = this.game.teams[team].score + newScore;
    this.game.teams[team].score = score;
    console.log(team, newScore, score);
    // ipcRenderer.sendTo(2, 'score', team, score);
    this.updateTeam();
  }
  period(newPeriod){
    this.game.period = newPeriod;
    // ipcRenderer.sendTo(2, 'period', newPeriod);
    this.updateTeam();
  }

}
