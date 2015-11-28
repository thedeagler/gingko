// TODO: Please add 'app.services' once services have been created

angular.module('app', ['ui.router', 'ngMaterial', 'ngMessages'])
.config(['$mdThemingProvider', function ($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('purple')
    .accentPalette('orange');
}]);
