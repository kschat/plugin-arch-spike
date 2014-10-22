angular
  .module('core')

  .directive('popup', ['appSettings', '$compile', function(appSettings, $compile) {

    return {
      replace: true,

      scope: {
        plugin: '=popup'
      },

      controller: ['$scope', function($scope) {
        $scope.popups = $scope.plugin.popups || [];
      }],

      compile: function(tElement, attr, linker) {
        var tmpl = $compile('<div data-ng-include="\'' + appSettings.urls.module + 'core/views/popup-view.html' + '\'"></div>');

        return function($scope, $element, $attr) {
          var tmpls = [];

          for(var i = $scope.popups.length - 1; i >= 0; i--) {
            var tScope = $scope.$new(true);
            tScope.popup = $scope.popups[i];
            tScope.plugin = $scope.plugin;

            tScope.$on('$includeContentLoaded', (function(popup) {
              return function() {
                angular.element(popup.show).on('click', function(e) {

                  window.open(
                    popup.href,
                    popup.name,
                    JSON.stringify(popup.windowOptions)
                      .replace(/\{|\}|"",|"/g, '')
                      .replace(/:/g, '=')
                  );
                });
              };
            }(tScope.popup)));

            tmpls.push(tmpl(tScope));
          }

          $element.append(tmpls);
        };
      }
    };

  }]);