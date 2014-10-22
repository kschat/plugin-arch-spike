angular
  .module('core')

  .directive('contextMenu', ['appSettings', '$compile', 'ContextMenu', function(appSettings, $compile, ContextMenu) {

    var _ctxs = Object.keys(ContextMenu.context)
      .map(function(i) { return '[data-context="' + ContextMenu.context[i] + '"]'; })
      .join(', ');

    return {

      replace: true,

      restrict: 'E',

      templateUrl: appSettings.urls.module + 'core/views/context-menu-view.html',

      scope: {
        menuItems: '='
      },

      link: function($scope, $element, $attr) {
        $scope.itemHandler = function(e, item) {
          if(!item.enabled) { return; }

          $element.blur();
          item.handler(e);
        };

        $element.on('blur', function(e) {
          $element.removeClass('show');
        });

        $('body').on('contextmenu', _ctxs, function(e) {
          $scope.currentContext = $(this).data('context');
          $scope.$apply();

          for(var i = 0; i < $scope.menuItems.length; i++) {
            var item = $scope.menuItems[i];
            item.enabled && item.beforeShow();
          }

          if(!$element.children('.show').length) { return; }
          
          e.preventDefault();

          $element
            .css({ top: e.pageY, left: e.pageX })
            .addClass('show')
            .focus();
        });
      }
    };

  }]);