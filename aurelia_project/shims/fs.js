define('fs', ['exports'], function (exports) {
  if (window.nodeRequire) {
    const fs = window.nodeRequire("fs");

    exports.default = fs;

    Object.keys(fs).forEach(function(key) {
      exports[key] = fs[key];
    });
  }
});

