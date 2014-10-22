angular
  .module('core')

  .factory('HeaderItem', [function() {
    var _HeaderItem = function HeaderItem(label, opts) {
      if(!(this instanceof HeaderItem)) { return new HeaderItem(label, opts); }
      
      if(label == null) { throw Error('HeaderItem: Label is required.'); }

      opts = opts || {};

      for(var i in this) { this[i] = opts[i] != null ? opts[i] : this[i]; }

      this.label = label;
    };

    _HeaderItem.prototype = Object.create({ label: '', icon: '', handler: function() {} });

    return _HeaderItem;

  }]);