cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-call-number/www/CallNumber.js",
        "id": "cordova-plugin-call-number.CallNumber",
        "pluginId": "cordova-plugin-call-number",
        "clobbers": [
            "call"
        ]
    },
    {
        "file": "plugins/es6-promise-plugin/www/promise.js",
        "id": "es6-promise-plugin.Promise",
        "pluginId": "es6-promise-plugin",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-x-socialsharing/www/SocialSharing.js",
        "id": "cordova-plugin-x-socialsharing.SocialSharing",
        "pluginId": "cordova-plugin-x-socialsharing",
        "clobbers": [
            "window.plugins.socialsharing"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-call-number": "1.0.1",
    "cordova-plugin-whitelist": "1.3.3",
    "es6-promise-plugin": "4.2.2",
    "cordova-plugin-x-socialsharing": "5.4.3"
}
// BOTTOM OF METADATA
});