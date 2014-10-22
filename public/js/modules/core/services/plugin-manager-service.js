angular
  .module('core')
  
  .factory('pluginManager', ['Plugin', function PluginManager(Plugin) {
    
    var _plugins = []
      , _callback = function() {}
      , _loaded = 0;

    return {

      length: 0,

      register: function(plugin) {
        _plugins.push(plugin);
        _loaded++;
        this.onPluginsLoaded(_callback);
      },

      unregister: function(index) {
        _plugins.splice(index, 1);
      },

      selectPlugin: function(index) {
        _plugins[index].active = true;

        for(var i = 0; i < _plugins.length; i++) {
          if(i === index) { continue; }

          _plugins[i].active = false;
        }
      },

      onPluginsLoaded: function(cb) {
        _callback = cb;
        _loaded === this.length && cb(_plugins);
      }

    };

  }]);