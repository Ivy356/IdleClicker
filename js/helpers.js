/** @module Helpers
 * Define some useful helpers that are used throughout the game.
 */
var Helpers = (function () {
  'use strict';
  /** Load a file (usually JSON).
   */
  var loadFile = function (filename) {
    var res;
    $.ajax({
      async: false,
      url : filename,
      success : function(data) {
        res = data;
      }
    });
    return res;
  };

  /** Format a number with proper postfix.
   */
  var formatNumberPostfix = function (number) {
    if (typeof number !== "number") {
      return 0;
    }

    var prefixes = [
      { magnitude: 1e39, label: 'DD' },
      { magnitude: 1e36, label: 'U' },
      { magnitude: 1e33, label: 'D' },
      { magnitude: 1e30, label: 'N' },
      { magnitude: 1e27, label: 'O' },
      { magnitude: 1e24, label: 'SS' },
      { magnitude: 1e21, label: 'S' },
      { magnitude: 1e18, label: 'QQ' },
      { magnitude: 1e15, label: 'Q' },
      { magnitude: 1e12, label: 'T' },
      { magnitude:  1e9, label: 'B' },
      { magnitude:  1e6, label: 'M' }
    ];

    var abs = Math.abs(number);
    for (var i = 0; i < prefixes.length; i++) {
      if (abs >= prefixes[i].magnitude) {
        return (number / prefixes[i].magnitude).toFixed(1) + prefixes[i].label;
      }
    }
    return number; 
  }

  var formatTime = function (msec) {
    var totals = Math.ceil(msec / 1000);
    var days = Math.floor(totals / (24 * 60 * 60));
    var hours = Math.floor((totals % (24 * 60 * 60)) / (60 * 60));
    var totalmin = (totals % (24 * 60 * 60)) % (60 * 60);
    var mins = Math.floor(totalmin / 60);
    var secs = totalmin % 60;

    var str = [];
    if (days > 0) {
      str.push(days + ' day' + (days % 100 == 1 ? '' : 's'));
    }
    if (hours > 0) {
      str.push(hours + ' h');
    }
    if (mins > 0) {
      str.push(mins + ' min');
    }
    if (secs > 0) {
      str.push(secs + ' s');
    }

    return str.join(', ');
  };

  var saveVersion =  '1.0';
  var validateSaveVersion = function () {
    var ver = ObjectStorage.load('saveVersion');
    if (typeof ver === 'undefined' || ver != saveVersion) {
      ObjectStorage.clear();
      ObjectStorage.save('saveVersion', saveVersion);
    }
  };
 
  return {
    loadFile: loadFile,
    formatNumberPostfix: formatNumberPostfix,
    formatTime: formatTime,
    validateSaveVersion: validateSaveVersion,
    analytics: ''
  };
})();
