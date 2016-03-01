(function() {
  'use strict';
  angular.module('app')
  .controller('HostCtrl', HostCtrl);

  HostCtrl.$inject = ['$http', '$q', '$log', '$window', 'hostFactory', 'checkUser', "$mdDialog"];

  function HostCtrl($http, $q, $log, $window, hostFactory, checkUser, $mdDialog) {
    // TODO: Please verify that this matches the refactored style

    // If there is a user, continue with controller logic.
    // Otherwise, redirect to the home page.
    // user variable will have all information about Facebook
    // Friends, profile picture, etc.
    var user = checkUser.data;

    var self = this;
    self.dateNow = Date.now();
    self.dateString;

    // below are settings for the md-autocomplete directive
    self.simulateQuery = false;
    self.isDisabled = false;

    // Meal data
    self.meal = {facebookId: user.id};
    self.attendees = [1,2,3,4,5,6,7,8,9];
    self.selectedshop = undefined;

    self.makeStarArr = function(rating) {
      var fullStarPath = '../../resources/star-full.svg';
      var halfStarPath = '../../resources/star-half.svg';
      var emptyStarPath = '../../resources/star-empty.svg';

      var starArr = [emptyStarPath, emptyStarPath,
        emptyStarPath, emptyStarPath, emptyStarPath];
      var i = 0;
      while (i < rating) {
        if (i + 0.5 === rating) {
          starArr[i]  = halfStarPath;
        } else {
          starArr[i] = fullStarPath;
        }
        i++;
      }
      return starArr;
    };

    self.querySearch = function(query) {
      var path = '/yelp';

      return $http({
        url: path + '?term=' + query,
        method: 'GET',
      })
      .then(function(response) {
        self.status = response.status;
        self.iteratee = response.data;
        self.data = [];
        _.each(self.iteratee, function(shop) {
          if (!shop.is_closed && shop.rating && shop.name && shop.url && shop.categories && shop.phone && shop.location) {
            self.data.push({
              'rating': self.makeStarArr(shop.rating),
              'name': shop.name,
              'url': shop.url,
              'categories': shop.categories,
              'phone': shop.phone,
              'display_address': shop.location.display_address,
              'coordinate': {
                lat: shop.location.coordinate.latitude,
                lng: shop.location.coordinate.longitude
              },
              yelpData: shop
            });
          }
        });
      }, function(response) {
        self.data = response.data || "Request failed";
        self.status = response.status;
        console.log('Error during querySearch.');
      })
      .then(function(response) {
        console.log(self.data);
        return self.data;
      });
    };

    self.add = function() {
      hostFactory.postMeal(self.meal)
      .then(function(response) {
        if(response.id){
          // $mdToast.show(
          //   $mdToast.simple()
          //     .textContent('Simple Toast!')
          //     .position($scope.getToastPosition())
          //     .hideDelay(3000)
          // );
          $window.location = '/#/meals/' + response.id;
        }
        else {
          $window.location = '/#/home';
        }
      });
    };

    return self;
  }
})();
