import { I18N } from 'aurelia-i18n';
import { inject } from 'aurelia-framework';
import { ipcRenderer, remote } from 'electron';
import { Router, RouterConfiguration, activationStrategy } from 'aurelia-router';

import Pages from './services/pages'

@inject(I18N, Pages)
export class App {
  public router: Router;
  private i18n: I18N;
  public pages;
  public id: number = remote.getCurrentWebContents().id;

  public menu = [
    {
      title: "File",
      items: [
        {
          title: "Open",
          execute: () => {
            this.open();
          }
        },
        {
          type: "seperator"
        },
        {
          title: "Print",
          execute: () => {
            window.print();
          }
        },
        {
          type: "seperator"
        },
        {
          title: "Exit",
          execute: () => {

            window.alert("Clicked Exit")
          }
        }
      ]
    },
    {
      title: "Edit",
      items: [
        {
          title: "Cut"
        },
        {
          title: "Copy"
        },
        {
          title: "Paste"
        }
      ]
    },
    {
      title: "About",
      execute: () => {
        window.alert("Mooo!");
      }
    }
  ]

  constructor(i18n: I18N, pages: Pages) {
    this.i18n = i18n;
    this.pages = pages;

    console.log('id: ', this.id);
    ipcRenderer.on('board', (...args) => {
      console.log('board: ', ...args);
    });
  }

  open() {
    remote.dialog.showMessageBox({
      message: this.i18n.tr("test"),
      buttons: ["OK"]
    });
  }

   configureRouter(config: RouterConfiguration, router: Router){
    this.router = router;
    config.title = 'Tally Mark';
    config.map([
      { route: '', redirect: 'games' },
      {
        route: 'games',
        moduleId: './elements/list',
        name: 'games',
        nav: true,
        title: 'Games',
        settings: {
          icon: 'mif-vpn-publ'
        }
      },
      {
        route: 'teams',
        moduleId: './elements/list',
        name:'teams',
        nav: true,
        title: 'Teams',
        settings: {
          icon: 'mif-drive-eta'
        }
      }
    ]);
    config.fallbackRoute('games');
   }
}
