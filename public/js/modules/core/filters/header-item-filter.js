angular
  .module('core')

  .filter('headerItem', ['$filter', function($filter) {
    var _propFilter = $filter('property');
    return function(plugins) {
      return _propFilter(plugins, 'headerItems');
    };
  }]);