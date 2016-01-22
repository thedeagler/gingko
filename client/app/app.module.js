angular.module('app', ['ui.router', 'ngMaterial', 'ngMessages'])
.config(['$mdThemingProvider', function ($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('deep-purple')
    .accentPalette('amber')
    .warnPalette('yellow');
}]);
