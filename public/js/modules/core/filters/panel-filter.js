angular
  .module('core')

  .filter('panel', ['$filter', function($filter) {
    var _propFilter = $filter('property');
    return function(plugins) {
      return _propFilter(plugins, 'panels');
    };
  }]);