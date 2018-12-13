cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-call-number/www/CallNumber.js",
        "id": "cordova-plugin-call-number.CallNumber",
        "clobbers": [
            "call"
        ]
    },
    {
        "file": "plugins/es6-promise-plugin/www/promise.js",
        "id": "es6-promise-plugin.Promise",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-x-socialsharing/www/SocialSharing.js",
        "id": "cordova-plugin-x-socialsharing.SocialSharing",
        "clobbers": [
            "window.plugins.socialsharing"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{}
// BOTTOM OF METADATA
});