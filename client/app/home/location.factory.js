(function() {
  'use strict';

  angular.module('app')
  .factory('locationFactory', locationFactory);

  locationFactory.$inject = [];

  function locationFactory() {
    var services = {
      getLocation : getLocation,
    };
    return services;

    function getLocation(cb) {
      if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(cb, handleError);
      }
      else {
        console.error("Geolocation is not supported by this browser.");
      }
    }

    function handleError(error) {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          console.error("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.error("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.error("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          console.error("An unknown error occurred.");
          break;
      }
    }
  }
})();
