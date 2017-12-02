import { normalize, schema } from 'normalizr';
import { EventAggregator } from 'aurelia-event-aggregator';
import { BehaviorSubject } from 'rxjs';
import * as actions from './actions/index';
import * as schemas from './schema';
import * as db from './db';

export class Store {
  private subject = new BehaviorSubject({});

  public state = this.subject.asObservable();
  public dispatcher = new EventAggregator();

  constructor(){
    this.update( db.get() );
    // convention: actions have to be UPPER_CASE
    Object.keys( actions ).forEach( name => {
      if( name === name.toUpperCase() ){
        this.dispatcher.subscribe( name, data => {
          this.update( actions[name]( this.dispatcher, this.subject.getValue(), data ) );
        });
      }
    });
  }
  private update( newState: any ): void {
    if( !newState ){ return; }
    this.subject.next( normalize( Object.assign({}, newState ), schemas.main ) );
  }
}
