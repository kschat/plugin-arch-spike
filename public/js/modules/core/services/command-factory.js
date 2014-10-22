angular
  .module('core')

  .factory('Command', [function() {
    var _Command = function Command() {};

    _Command.prototype = Object.create({

      handle: function handle() {},

      undo: function undo() {}

    });

    return _Command;
  }]);