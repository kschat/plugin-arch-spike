angular
  .module('core')

  .factory('ContextMenu', [function() {
    var _ContextMenu = function ContextMenu(opts) {
      if(!(this instanceof ContextMenu)) { return new ContextMenu(opts); }

      opts = opts || {};

      for(var i in this) { this[i] = opts[i] != null ? opts[i] : this[i]; } // checks for null and undefined
    };

    Object.defineProperty(_ContextMenu, 'context', {

      enumerable: true,

      value: {
        ALL: '*',

        PANEL: 'panel',

        SIDEBAR_ITEM: 'sidebar-item',

        HEADER_ITEM: 'header-item',

        MODAL: 'modal'
      }

    });

    _ContextMenu.prototype = Object.create({
      
      context: _ContextMenu.context.ALL,

      label: '',

      enabled: true,

      beforeShow: function() {},

      handler: function() {}

    });

    return _ContextMenu;

  }]);