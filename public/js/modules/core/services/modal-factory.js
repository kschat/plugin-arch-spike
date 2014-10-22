angular
  .module('core')

  .factory('Dialog', [function() {

    var _Dialog = function Dialog(opts) {
      if(!(this instanceof Dialog)) { return new Dialog(opts); }

      opts = opts || {};

      for(var i in this) { this[i] = opts[i] != null ? opts[i] : this[i]; }
    };

    _Dialog.prototype = Object.create({
      id: '',

      icon: '',

      title: '',

      body: '',

      footer: '',

      modal: false,

      close: true,

      show: ''
    });

    return _Dialog;

  }]);