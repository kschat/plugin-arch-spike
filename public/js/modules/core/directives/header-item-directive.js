angular
  .module('core')
  .directive('headerItem', ['appSettings', '$compile', function(appSettings, $compile) {

    return {

      replace: true,

      scope: {
        plugin: '=headerItem'
      },

      controller: ['$scope', function($scope) {
        $scope.headerItems = $scope.plugin.headerItems || [];
      }],

      compile: function(tElement, attr, linker) {
        var tmpl = $compile('<li data-ng-include="\'' + appSettings.urls.module + 'core/views/header-item-view.html' + '\'"></li>');

        return function($scope, $element, $attr) {
          var tmpls = [];

          for(var i = $scope.headerItems.length - 1; i >= 0; i--) {
            var tScope = $scope.$new(true);
            tScope.item = $scope.headerItems[i];
            tScope.plugin = $scope.plugin;

            tmpls.push(tmpl(tScope));
          }

          $element.append(tmpls);
        };
      }

    };

  }]);