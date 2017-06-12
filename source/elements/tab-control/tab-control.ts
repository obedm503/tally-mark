import { customElement, bindable, inject } from 'aurelia-framework';

import Pages from '../../services/pages';

@customElement("tab-control")
@inject(Pages)
export class TabControlCustomElement {
  @bindable items;// = [];
  @bindable selectedIndex = 0;
  @bindable pages;

  constructor(pages: Pages){
    this.pages = pages;
    this.items = pages.pages;
  }
}
