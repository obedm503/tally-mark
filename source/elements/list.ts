import { bindable, inject } from 'aurelia-framework';
import { activationStrategy } from 'aurelia-router';
import { Store } from '../services/store';

@inject(Store)
export class List {
  private list: any[];
  @bindable selectedModel;
  @bindable selectedVM: string;
  @bindable route: string;

  constructor(public store: Store){}

  navigate(item){
    this.selectedVM = ( this.route === 'games' ) ? '../pages/game' : '../pages/team';
    this.selectedModel = this.list.find(el => el.id === item.id);
    this.list.forEach(el => {
      if(el.id === item.id ){
        el.isActive = true;
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
    this.list = this.store.db.get(route.route).value();

    // default value
    //this.navigate(this.list[0])
  }
}

