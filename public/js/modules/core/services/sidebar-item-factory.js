angular
  .module('core')

  .factory('SidebarItem', [function() {
    var _SidebarItem = function SidebarItem(title, opts) {
      if(!(this instanceof SidebarItem)) { return new SidebarItem(title, opts); }
      
      if(title == null) { throw Error('SidebarItem: Title is required.'); }

      opts = opts || {};

      for(var i in this) { this[i] = opts[i] != null ? opts[i] : this[i]; }

      this.title = title;
    };

    _SidebarItem.prototype = Object.create({ icon: '', body: '', priority: -1, selected: false });

    return _SidebarItem;

  }]);