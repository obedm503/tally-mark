import { FrameworkConfiguration } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    './top-bar/top-bar.html',
    './list/list',
    ]);
}
