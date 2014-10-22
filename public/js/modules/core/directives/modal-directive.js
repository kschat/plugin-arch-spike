angular
  .module('core')

  .directive('modal', ['appSettings', '$compile', function(appSettings, $compile) {

    return {
      replace: true,

      scope: {
        plugin: '=modal'
      },

      controller: ['$scope', function($scope) {
        $scope.modals = $scope.plugin.modals || [];
      }],

      compile: function(tElement, attr, linker) {
        var tmpl = $compile('<div data-ng-include="\'' + appSettings.urls.module + 'core/views/modal-view.html' + '\'"></div>');

        return function($scope, $element, $attr) {
          var tmpls = [];

          for(var i = $scope.modals.length - 1; i >= 0; i--) {
            var tScope = $scope.$new(true);
            tScope.modal = $scope.modals[i];
            tScope.plugin = $scope.plugin;

            tScope.$on('$includeContentLoaded', function() {
              angular.element(tScope.modal.show).on('click', function(e) {
                $element
                  .find('.modal')
                  .modal('show');
              });
            });

            tmpls.push(tmpl(tScope));
          }

          $element.append(tmpls);
        };
      }
    };

  }]);