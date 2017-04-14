import { I18N } from 'aurelia-i18n';
import { inject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import { ipcRenderer, remote } from 'electron';

import Pages from './services/pages'

@inject(I18N, Pages)
export class App {
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
}
