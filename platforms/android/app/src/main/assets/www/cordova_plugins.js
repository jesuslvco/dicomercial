cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-call-number.CallNumber",
    "file": "plugins/cordova-plugin-call-number/www/CallNumber.js",
    "pluginId": "cordova-plugin-call-number",
    "clobbers": [
      "call"
    ]
  },
  {
    "id": "es6-promise-plugin.Promise",
    "file": "plugins/es6-promise-plugin/www/promise.js",
    "pluginId": "es6-promise-plugin",
    "runs": true
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-call-number": "1.0.1",
  "cordova-plugin-whitelist": "1.3.3",
  "es6-promise-plugin": "4.2.2"
};
// BOTTOM OF METADATA
});