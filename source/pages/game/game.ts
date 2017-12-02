import { EventAggregator } from 'aurelia-event-aggregator';
import { bindable, BindingEngine, inject, ObserverLocator, autoinject } from 'aurelia-framework';
import { ipcRenderer, remote } from 'electron';
import * as $ from 'jquery';
import 'metro';
import { Store } from '../../state/store';

@autoinject
export class Game {
  private teamMatcher = ( a, b ) => a.id === b.id;
  private state;

  constructor(
    public store: Store,
    public ea: EventAggregator,
    public observer: ObserverLocator,
    public binding: BindingEngine,
  ){
    // this.teams = this.store.teams;
    store.state.subscribe( state => this.state = state );
  }


}
