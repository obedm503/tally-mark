import { bindable, inject } from 'aurelia-framework';
import { activationStrategy } from 'aurelia-router';
import { Store } from '../../services/store';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(Store, EventAggregator)
export class List {
  private list: any[];
  @bindable selectedModel;
  @bindable selectedVM: string;
  @bindable route: string;
  @bindable icon: string;

  constructor(public store: Store, public ea: EventAggregator){
    this.ea.subscribe('list-add', ({ route, item }) => {
      if( route !== this.route){ return; }
      console.log(item, this.list)
      let index = this.list.findIndex( el => el.id === item.id );
      this.list[index] = item;
      this.list.forEach( ( el, i ) => {
        el.isActive = i === index;
      });
      if( index === -1 ){
        item.isActive = true;
        this.list.push(item);
      }
    });

    this.ea.subscribe('list-delete', ({ route, item }) => {
      if( route !== this.route){ return; } else { this.navigate(this.list[0]); }

      let index = this.list.findIndex( el => el.id === item.id );
      this.list.splice(index, 1);
      let toNavigate = ( index === 0 ) ? 0 : index - 1;
      this.navigate(this.list[toNavigate]);
    });
  }

  deactivate(){
    this.list.forEach( el => {
      el.isActive = false;
    });
  }

  navigate(item){
    this.selectedVM = ( this.route === 'games' ) ? '../../pages/game/game' : '../../pages/team/team';
    this.list.forEach(el => {
      if(el.id === item.id ){
        el.isActive = true;
        this.selectedModel = el;
      } else {
        el.isActive = false;
      }
    });
  }

  determineActivationStrategy(){
    return activationStrategy.invokeLifecycle;
  }

  activate(params, route){
    this.route = route.route;
    this.icon = route.settings.icon;
    // this.list = this.store.db.get(route.route).value();
    this.list = this.store[route.route];

    // default value
    //this.navigate(this.list[0])
  }
}

