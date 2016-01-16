(function() {
  // using 'use strict' will prevent variable declaration errors
  'use strict';

  angular.module('app')
  .config(config);

  // dependencies are injected here, when placed in array it protects against minification
  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    var checkUser = function($http) {
      return $http({method: 'GET', url: '/auth/checkuser'});
    };

    $urlRouterProvider.otherwise('home');

    $stateProvider
    .state('new_home', {
      url: '/newhome',
      views: {
        'multibar': {
          templateUrl: 'app/multibar/multibar.html',
          controller: 'MultibarCtrl',
          controllerAs: 'multibar'
        },
        '@': {
          templateUrl: 'app/new_home/home.html',
          controller: 'HomeCtrl',
          controllerAs: 'home',
        }
      },
      resolve: {
        checkUser: ['$http', checkUser]
      }
    })

    .state('home', {
      url: '/home',
      views: {
        'multibar': {
          templateUrl: 'app/multibar/multibar.html',
          controller: 'MultibarCtrl',
          controllerAs: 'multibar'
        },
        '@': {
          templateUrl: 'app/home/home.html',
          controller: 'HomeCtrl',
          controllerAs: 'home',
        }
      },
      resolve: {
        checkUser: ['$http', checkUser]
      }
    })

    .state('search', {
      url: '/search',
      views: {
        'multibar': {
          templateUrl: 'app/multibar/multibar.html',
          controller: 'MultibarCtrl',
          controllerAs: 'multibar'
        },
        '@': {
          templateUrl: 'app/search/search.html',
          controller: 'SearchCtrl',
          controllerAs: 'vm',
        }
      },
      resolve: {
        checkUser: ['$http', checkUser]
      }
    })

    .state('user', {
      url: '/user/:id',
      views: {
        'multibar': {
          templateUrl: 'app/multibar/multibar.html',
          controller: 'MultibarCtrl',
          controllerAs: 'multibar'
        },
        '@': {
          templateUrl: 'app/user/user.html',
          controller: 'UserCtrl',
          controllerAs: 'user',
        }
      },
      resolve: {
        checkUser: ['$http', checkUser],
        userData: ['$http', '$stateParams', function($http, $stateParams) {
          return $http({method: 'GET', url: '/user/' + $stateParams.id});
        }]
      }
    })

    // When linked to a particular meal, we render that meal
    .state('meal', {
      url: '/meals/:id',
      views: {
        'multibar': {
          templateUrl: 'app/multibar/multibar.html',
          controller: 'MultibarCtrl',
          controllerAs: 'multibar'
        },
        '@': {
          templateUrl: 'app/meal/meal.html',
          controller: 'MealCtrl',
          controllerAs: 'meal',
        },
      },
      resolve: {
        checkUser: ['$http', checkUser],
        mealsData: ['$http', '$stateParams', function($http, $stateParams) {
          return $http({method: 'GET', url: '/meals/' + $stateParams.id});
        }]
      }
    })

    .state('results', {
      url: '/results',
      views: {
        'multibar': {
          templateUrl: 'app/multibar/multibar.html',
          controller: 'MultibarCtrl',
          controllerAs: 'multibar'
        },
        '@': {
          templateUrl: 'app/searchResults/searchResults.html',
          controller: 'SearchResultsCtrl',
          controllerAs: 'results',
        }
      },
      resolve: {
        checkUser: ['$http', checkUser],
        mealsData: function($http) {
          return $http({method: 'GET', url: '/meals'});
        }
      }
    });
  }
})();
