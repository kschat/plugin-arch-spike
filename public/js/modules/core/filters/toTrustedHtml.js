angular
  .module('core')

  .filter('toTrusted', ['$sce', function($sce) {
    return $sce.trustAsHtml;
  }]);