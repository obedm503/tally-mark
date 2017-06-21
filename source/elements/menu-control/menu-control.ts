import { bindable, customElement } from 'aurelia-framework';

@customElement("menu-control")
export class MenuControl {
  @bindable items;
}
