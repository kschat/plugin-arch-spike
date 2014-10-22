angular
  .module('core')

  .factory('Plugin', [function() {
    
    return function Plugin() {

      return {

        context: {},

        active: false,

        loading: false,
        
        sidebarItem: {},

        headerItems: [],

        panels: [],

        contextMenus: [],

        modals: [],

        popups: []

      };

    };

  }]);