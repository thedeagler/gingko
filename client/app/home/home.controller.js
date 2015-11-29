// TODO: Connect meals to real meals
//       Make rotating meals

(function() {
  'use strict';

  angular.module('app')
  .controller('HomeCtrl', HomeCtrl);

  // if factories are needed, inject here
  HomeCtrl.$inject = ['homeFactory', '$state', "$location", "$window", 'locationFactory'];

  function HomeCtrl(homeFactory, $state, $location, $window, locationFactory) {
    var self = this;
    self.geolocation = null;
    // Meal suggestions
    self.tables = {
      near: [],
      soon: [],
      value: []
    };


    // Set heights of elements
    var rowHeight = (window.innerHeight - 64)/ 2;
    document.getElementById('hero_container').style.height = rowHeight + "px";
    Array.prototype.slice.call(document.getElementsByClassName('card')).forEach(function(el) {
      el.style.height = rowHeight + "px";
    });


    // // Set img src for hero image
    // document.getElementById('hero_container').style.backgroundImage = "url('http://losangeleslawyersource.com/wp-content/uploads/2013/08/serious-injuries.jpg')";

    // // Set img src for suggestions
    // document.getElementById('near').style.backgroundImage = "url('http://blenderartists.org/forum/attachment.php?attachmentid=303132&d=1397678638')";
    // document.getElementById('value').style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/en/a/a3/Toronto_Propane_Explosion.jpg')";
    // document.getElementById('soon').style.backgroundImage = "url('http://images.wisegeek.com/explosion-of-fire.jpg')";


    self.go = function(e, v) {
      console.log('went');
      self.getRecs();
    };

    // TODO: Get closest, highest rated, and soonest available meals instead of all of them
    self.getRecs = function() {
      // locationFactory.getLocation(function(position) {

        // self.geolocation = {
        //   lat: position.coords.latitude,
        //   lon: position.coords.longitude,
        //   acc: position.coords.accuracy,
        // };

        var params = {
          sortBy: 'rating',
          location: null,
          // location: self.geolocation,
          numResults: 3,
        };

        homeFactory.getTop(params)
        .then(function(data) {
          console.log('return data', data);
        });
      // });
    };

    // Initialize tables on page load
    // self.getData();
  }
})();
