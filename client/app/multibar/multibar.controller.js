(function() {
  'use strict';

  angular.module('app')
  .controller('MultibarCtrl', MultibarCtrl);

  MultibarCtrl.$inject = ['multibarFactory','$state', "$location", "$window", "$mdDialog", 'checkUser'];

  function MultibarCtrl(multibarFactory, $state, $location, $window, $mdDialog, checkUser) {

    var self = this;

    // If logged in, checkUser.data will have all information about Facebook
    // Friends, profile picture, etc.
    self.user = checkUser.data;
    self.isLoggedIn = self.user ? true : false;

    self.searchQuery = '';

    self.routes = {
      'Profile': function() {
        $state.go('user');
      },
      'Logout': function() {
        var origin = $window.location.origin;
        $window.location = origin + '/auth/logout';
      }
    };

    self.accountSettings = ['Profile', 'Logout'];

    self.handleLogin = function() {
      var origin = $window.location.origin;
      $window.location = origin + '/auth/login';
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

    self.hostDialog = function (ev) {
      $mdDialog.show({
      // controller: DialogController,
      templateUrl: 'app/host/host.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      // fullscreen: useFullScreen
    })
    }
  }
})();

