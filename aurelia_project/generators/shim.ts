import {autoinject} from 'aurelia-dependency-injection';
import {Project, ProjectItem, CLIOptions, UI} from 'aurelia-cli';
import * as aurelia from '../aurelia.json';

@autoinject()
export default class ShimGenerator {
  constructor(private project: Project, private options: CLIOptions, private ui: UI) { }

  execute() {
    return this.ui
      .ensureAnswer(this.options.args[0], 'What would you like to call the new shim?')
      .then(name => {
        let fileName = this.project.makeFileName(name);

        this.project.shims.add(
          ProjectItem.text(`${fileName}.js`, this.generateSource(fileName))
        );
        this.updateAurelia(fileName);

        return this.project.commitChanges()
          .then(() => this.ui.log(`Created ${fileName} and added to vendor bundle dependencies.`));
      });
  }

  generateSource(name) {
    return `define('${name}', ['exports'], function (exports) {
  if (window.nodeRequire) {
    const ${name} = window.nodeRequire("${name}");

    exports.default = ${name};

    Object.keys(${name}).forEach(function(key) {
      exports[key] = ${name}[key];
    });
  }
});

`
  }

  updateAurelia(name){
    const fs = require('fs');
    const fileName = '../aurelia.json';
    const config = aurelia;//require(fileName);
    const moduleConfig = {
      name,
      path: `../aurelia_project/shims/${name}`
    };

    let deps = config.build.bundles[1].dependencies;
    let index = deps.length;
    deps.forEach((el, i)=>{
      if(el.name === name){
        index = i;
      }
    });
    deps[index] = moduleConfig;

    try {
      fs.writeFileSync(`${__dirname}/${fileName}`, JSON.stringify(config, null, 2));
    } catch(err){
      console.log(err);
    }
  }
}
