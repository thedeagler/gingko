// TODO: Connect meals to real meals
//       Make rotating meals

(function() {
  'use strict';

  angular.module('app')
  .controller('HomeCtrl', HomeCtrl);

  // if factories are needed, inject here
  HomeCtrl.$inject = ['$rootScope', 'homeFactory', '$state', "$location", "$window", 'locationFactory'];

  function HomeCtrl($rootScope, homeFactory, $state, $location, $window, locationFactory) {
    var self = this;
    // Meal suggestions
    self.tables = {
      date: [],
      rating: [],
      distance: [],
    };


    // Set heights of elements
    var rowHeight = (window.innerHeight - 64)/ 2;
    document.getElementById('hero_container').style.height = rowHeight + "px";
    Array.prototype.slice.call(document.getElementsByClassName('card')).forEach(function(el) {
      el.style.height = rowHeight + "px";
    });


    // Set img src for hero image
    document.getElementById('hero_container').style.backgroundImage = "url('http://i.imgur.com/4ZCnwZD.jpg')";

    // // Set img src for suggestions
    // document.getElementById('near').style.backgroundImage = "url('http://blenderartists.org/forum/attachment.php?attachmentid=303132&d=1397678638')";
    // document.getElementById('value').style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/en/a/a3/Toronto_Propane_Explosion.jpg')";


    self.init = function(e, v) {
      console.log('went');

      if(!$rootScope.geolocation) {
        locationFactory.getLocation(function (position) {
          $rootScope.geolocation = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            acc: position.coords.accuracy,
          };
          console.log('Location Retrieved', $rootScope.geolocation);
          self.getRecs();
        });
      }
      else {
        self.getRecs();
      }
    };

    // TODO: Get closest, highest rated, and soonest available meals instead of all of them
    self.getRecs = function() {
      for(var sortBy in self.tables) {
        var params = {
          sortBy: sortBy,
          location: null,
          numResults: 3,
        };

        // If sorting by location, app must wait for callback to continue
        if(sortBy === 'distance') {
          params.location = $rootScope.geolocation;
        }

        homeFactory.getTop(params)
        .then((function(sortBy) {
          return function(data) {
            console.log(sortBy);
            console.log(data);

            self.tables[sortBy] = data;
            if(data.length > 0){
              document.getElementById(sortBy).style.backgroundImage = "url('"+ data[0].restaurant.yelpData.image_url +"')";
            }
          };
        })(sortBy))
        .catch(queryFail);
      }

      // function locationFound(position) {
      //   self.geolocation = {
      //     lat: position.coords.latitude,
      //     lon: position.coords.longitude,
      //     acc: position.coords.accuracy,
      //   };

      //   params.location = self.geolocation;

      //   // homeFactory.getTop(params)
      //   // .then(querySuccess)
      //   // .catch(queryFail);
      // }

      function querySuccess(data) {
        console.log('return data', data);
      }

      function queryFail(err) {
        // console.error('Query Failed',
        //   err.data.replace(/<br>/g, '\n').replace(/ &nbsp;/g, '>'),
        //   err);
      }
    };

    self.goToMeal = function (mealID) {
      $window.location = '/#/meals/' + mealID;
    };

    // Initialize tables on page load
    self.init();
  }
})();
