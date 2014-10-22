angular
  .module('core')
  .directive('sidebarItem', ['appSettings', function(appSettings) {

    var _id = 0;

    return {

      replace: true,

      scope: {
        plugin: '=sidebarItem',
        selectHandler: '&itemSelect'
      },

      templateUrl: appSettings.urls.module + 'core/views/sidebar-item-view.html',

      controller: ['$scope', '$sce', function($scope, $sce) {
        $scope.eId = $scope.eId || _id++;
        $scope.item = $scope.plugin.sidebarItem;
      }],

      link: function($scope, $element, $attr) {
        $element
          .find('.panel-body')
          .append($($scope.item.body, $scope.plugin.context));

        $element.on('click', function(e) {
          $scope.selectHandler({
            e: Math.round($(this).find('a').attr('href').split('sidbar-nav-')[1])
          });
        });
      }

    };

  }]);