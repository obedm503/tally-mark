import { bindable, inject } from 'aurelia-framework';

export class Home {
  @bindable data;

  constructor(){

  }

  dataChanged(newdata, olddata) {

  }
  activate(data){
    this.data = data;
  }
}
