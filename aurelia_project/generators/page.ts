import {inject} from 'aurelia-dependency-injection';
import {Project, ProjectItem, CLIOptions, UI} from 'aurelia-cli';

@inject(Project, CLIOptions, UI)
export default class ElementGenerator {
  constructor(private project: Project, private options, private ui: UI) { }

  execute() {
    return this.ui
      .ensureAnswer(this.options.args[0], 'What would you like to call the custom element?')
      .then(name => {
        let fileName = this.project.makeFileName(name);
        let className = this.project.makeClassName(name);

        this.project.pages.add(
          ProjectItem.text(`${fileName}.scss`, ' '),
          ProjectItem.text(`${fileName}.ts`, this.generateJSSource(className)),
          ProjectItem.text(`${fileName}.html`, this.generateHTMLSource(fileName))
        );

        return this.project.commitChanges()
          .then(() => this.ui.log(`Created ${fileName} page.`));
      });
  }

  generateJSSource(className) {
    return `import { bindable, inject } from 'aurelia-framework';

export class ${className} {
  @bindable data;

  constructor(){

  }

  dataChanged(newdata, olddata) {

  }
  activate(data){
    this.data = data;
  }
}

`
  }

  generateHTMLSource(fileName) {
    return `<template>
  <require from="./${fileName}.css"></require>
  <dock-panel>
    <h1>\${data}</h1>
  </dock-panel>
</template>`
  }
}
