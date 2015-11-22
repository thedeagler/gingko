(function() {
  'use strict';

  angular.module('app')
  .controller('MealCtrl', MealCtrl, MealFactory);

  MealCtrl.$inject = ['$http', '$location', '$window', 'MealFactory'];

  function MealCtrl($scope, $http, $location, $window, Map, MealFactory) {
    var self = this;
    self.data = {};
    var map;



    
  }

})();



// Data
// - location - neighborhood
// - location - address
// - location - city
// - cll - latitude
// - cll - longitude
// - geographical bounding box
// - name of restaurant
// - url for photo of restaurant
// - url for yelp page
// - display phone number
// - distance of restaurant from [LOCATION]
// - URL for star rating
// - url for large image 
// - address for restaurant
// - cross streets for location
// - reservation url for SeatMe


// Other:
// - Host name
// - Event time
// - Attendees?
// - Event description

