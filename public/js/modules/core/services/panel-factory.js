angular
  .module('core')

  .factory('Panel', [function() {

    var _Panel = function Panel(title, opts) {
      if(!(this instanceof Panel)) { return new Panel(title, opts); }
      
      if(title == null) { throw Error('Panel: Title is required.'); }

      opts = opts || {};

      for(var i in this) { this[i] = opts[i] != null ? opts[i] : this[i]; }

      this.title = title;
    };

    _Panel.prototype = Object.create({ body: '', column: 'xs-2', offset: '' });

    return _Panel;

  }]);