angular
  .module('core')

  .factory('bus', ['$rootScope', 'Command', function($rootScope, Command) {
    var _commands = {}
      , _stubCmd = new Command();

    return {
      events: {
        trigger: $rootScope.$broadcast.bind(angular.element('body').scope())
      },

      commands: {
        handle: function(command) {
          if(typeof command.handle !== 'function') { throw Error('CommandBus: Command must have handle method'); }
          _commands.push(command);
          command.handle();
        },

        undo: function(amt) {
          var undos = _commands.splice(-1, amt);
          for(var i = 0; i < undos.length; i++) {
            undos[i].undo();
          }
        }
      }
    };
  }]);