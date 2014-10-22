angular
  .module('core')

  .controller('PluginManagerController', ['$scope', 'pluginManager', '$filter', 'appSettings', function($scope, pluginManager, $filter, appSettings) {
    var _currentPluginIndex = -1;

    pluginManager.onPluginsLoaded(function(plugins) {
      plugins[appSettings.activatePluginOnStart].active = true;

      $scope.$apply(function() {
        $scope.plugins = plugins;
        $scope.contextMenus = $filter('contextMenu')(plugins);
      });
    });

    $scope.plugins = [];
    $scope.contextMenus = [];

    $scope.sidebarItemClicked = function(id) {
      $scope.$apply(pluginManager.selectPlugin.bind(pluginManager, id));
    };
  }]);