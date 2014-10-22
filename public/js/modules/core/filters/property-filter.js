angular
  .module('core')

  .filter('property', [function() {
    return function(input, prop) {
      return (input || []).filter(function(i) { return i[prop]; });
    };
  }]);