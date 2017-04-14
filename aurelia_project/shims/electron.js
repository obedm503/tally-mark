define('electron', ['exports'], function (exports) {
  if (window.nodeRequire) {
    const electron = window.nodeRequire("electron");

    exports.default = electron;

    Object.keys(electron).forEach(function(key) {
      exports[key] = electron[key];
    });
  }
});
