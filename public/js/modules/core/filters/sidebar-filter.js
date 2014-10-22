angular
  .module('core')

  .filter('sidebar', ['$filter', function($filter) {
    var _propFilter = $filter('property');
    return function(plugins) {
      return _propFilter(plugins, 'sidebarItem');
    };
  }]);