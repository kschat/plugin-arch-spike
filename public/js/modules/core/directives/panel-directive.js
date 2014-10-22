angular
  .module('core')
  
  .directive('panel', ['appSettings', '$compile', function(appSettings, $compile) {

    return {
      replace: true,
      
      scope: {
        plugin: '=panel'
      },

      controller: ['$scope', function($scope) {
        $scope.panels = $scope.plugin.panels || [];
      }],

      compile: function(tElement, attr, linker) {
        var tmpl = $compile('<div data-ng-include="\'' + appSettings.urls.module + 'core/views/panel-view.html' + '\'"></div>');

        return function($scope, $element, $attr) {
          var tmpls = [];

          for(var i = $scope.panels.length - 1; i >= 0; i--) {
            var tScope = $scope.$new(true)
              , el = tmpl(tScope);

            tScope.panel = $scope.panels[i];
            tScope.plugin = $scope.plugin;

            tScope.$on('$includeContentLoaded', (function(plugin, panel) {
              return function() {
                el.next()
                  .find('.panel-body')
                  .append($(panel.body, plugin.context));
              };
            }(tScope.plugin, tScope.panel)));

            tmpls.push(el);
          }

          $element.append(tmpls);
        };
      }
    };

  }]);