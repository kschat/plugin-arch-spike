angular
  .module('core')

  .filter('contextMenu', [function() {
    return function(input) {
      // console.log([].concat.apply([], input.map(function(x) { return x.contextMenus || []; })));
      return [].concat.apply([], input.map(function(x) { return x.contextMenus || []; }));
    };
  }]);