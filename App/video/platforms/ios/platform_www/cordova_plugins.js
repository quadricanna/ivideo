cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cc.fovea.cordova.purchase.InAppPurchase",
    "file": "plugins/cc.fovea.cordova.purchase/www/store-ios.js",
    "pluginId": "cc.fovea.cordova.purchase",
    "clobbers": [
      "store"
    ]
  },
  {
    "id": "com.darktalker.cordova.screenshot.screenshot",
    "file": "plugins/com.darktalker.cordova.screenshot/www/Screenshot.js",
    "pluginId": "com.darktalker.cordova.screenshot",
    "merges": [
      "navigator.screenshot"
    ]
  },
  {
    "id": "com.moust.cordova.videoplayer.VideoPlayer",
    "file": "plugins/com.moust.cordova.videoplayer/www/videoplayer.js",
    "pluginId": "com.moust.cordova.videoplayer",
    "clobbers": [
      "VideoPlayer"
    ]
  },
  {
    "id": "com.omarben.inappreview.inappreview",
    "file": "plugins/com.omarben.inappreview/www/inappreview.js",
    "pluginId": "com.omarben.inappreview",
    "clobbers": [
      "inappreview"
    ]
  },
  {
    "id": "cordova-universal-clipboard.Clipboard",
    "file": "plugins/cordova-universal-clipboard/www/clipboard.js",
    "pluginId": "cordova-universal-clipboard",
    "clobbers": [
      "cordova.plugins.clipboard"
    ]
  },
  {
    "id": "cordova-instagram-plugin.InstagramPlugin",
    "file": "plugins/cordova-instagram-plugin/www/CDVInstagramPlugin.js",
    "pluginId": "cordova-instagram-plugin",
    "clobbers": [
      "Instagram"
    ]
  },
  {
    "id": "cordova-launch-review.LaunchReview",
    "file": "plugins/cordova-launch-review/www/launchreview.js",
    "pluginId": "cordova-launch-review",
    "clobbers": [
      "LaunchReview"
    ]
  },
  {
    "id": "cordova-promise-polyfill.Promise",
    "file": "plugins/cordova-promise-polyfill/www/Promise.js",
    "pluginId": "cordova-promise-polyfill",
    "runs": true
  },
  {
    "id": "cordova-promise-polyfill.promise.min",
    "file": "plugins/cordova-promise-polyfill/www/promise.min.js",
    "pluginId": "cordova-promise-polyfill"
  },
  {
    "id": "cordova-plugin-admob-free.AdMob",
    "file": "plugins/cordova-plugin-admob-free/www/admob.js",
    "pluginId": "cordova-plugin-admob-free",
    "clobbers": [
      "admob",
      "AdMob",
      "plugins.AdMob"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cc.fovea.cordova.purchase": "7.1.3",
  "com.darktalker.cordova.screenshot": "0.1.5",
  "com.moust.cordova.videoplayer": "1.0.1",
  "com.omarben.inappreview": "0.0.5",
  "cordova-admob-sdk": "0.11.1",
  "cordova-universal-clipboard": "0.1.0",
  "cordova-instagram-plugin": "0.5.7",
  "cordova-launch-review": "3.1.1",
  "cordova-plugin-add-swift-support": "1.6.0",
  "cordova-promise-polyfill": "0.0.2",
  "cordova-plugin-admob-free": "0.11.0"
};
// BOTTOM OF METADATA
});