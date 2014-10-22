angular
  .module('core')

  .filter('modal', ['$filter', function($filter) {
    var _propFilter = $filter('property');
    return function(plugins) {
      return _propFilter(plugins, 'modals');
    };
  }]);