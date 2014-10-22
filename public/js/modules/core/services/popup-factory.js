angular
  .module('core')

  .factory('Popup', [function() {
    var _Popup = function Popup(href, opts) {
      if(!(this instanceof Popup)) { return new Popup(href, opts); }
      
      if(href == null) { throw Error('Popup: Href is required.'); }

      opts = opts || {};

      this.name = 'popup-' + Date.now();

      for(var i in this) { this[i] = opts[i] != null ? opts[i] : this[i]; }

      this.href = href;
    };

    _Popup.prototype = Object.create({
      
      name: '',

      href: '',

      show: '',

      windowOptions: {}

    });

    return _Popup;

  }]);