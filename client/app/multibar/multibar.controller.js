(function() {
  'use strict';

  angular.module('app')
  .controller('MultibarCtrl', MultibarCtrl);

  // if factories are needed, inject here
  MultibarCtrl.$inject = ['multibarFactory','$state', "$location", "$window", "$mdDialog"];

  function MultibarCtrl(multibarFactory, $state, $location, $window, $mdDialog) {
    var self = this;

    self.isLoggedIn = true;
    self.searchQuery = '';

    self.routes = {
      'Profile': function() {
        $state.go('user');
      },
      'Logout': function() {
        var origin = $window.location.origin;
        $window.location = origin + '/api/out/logout';
      }
    };

    self.accountSettings = ['Profile', 'Logout'];

    self.handleLogin = function() {
      var origin = $window.location.origin;
      $window.location = origin + '/api/out/login';
    };

    self.handleOption = function(index) {
      var option = self.accountSettings[index];
      self.routes[option]();
    };

    self.displayLogin = function() {
      return self.isLoggedIn === true ? 'Account' : 'Login';
    };

    self.goToResults = function() {
      multibarFactory.setQuery(self.searchQuery);
      document.getElementById('searchInput').blur();

      if ($state.current.name === 'results') {
        $state.reload();
      } else {
        $state.go('results');
      }
      self.searchQuery = '';
    };
  }
})();

