(function() {
  'use strict';

  angular.module('app')
    .factory('userFactory', userFactory);

  // injecting in $http
  userFactory.$inject = ['$http', '$location'];
  // you must do the same below
  function userFactory($http, $location) {
    var services = {
      getUserInfo: getUserInfo,
      getFacebookInfo: getFacebookInfo
    };

    return services;

    // getUserInfo();


    function getUserInfo(cb) {

      //dummy data:
      cb({
        facebookImg: 'http://placecho.herokuapp.com/500/500',
        name: 'Kyle Cho',
        job: "Software Engineer",
        hostrating: 4.5,
        numhostratings: 57,
        guestrating: 5,
        numguestratings: 23,
        hobbies: "Giving pro tips.",
        favorite_eatery: 'Sarku @ The Westfield',
        aspirations: "President of 'murica",
        contact_info: 'kylecho@gmail.com'
      });
    }

    function getUserEvents() {
      
    }

    // get Facebook data from api/in/user:id, based on the window url
    function getFacebookInfo(cb) {
      var facebookId = window.location.search.slice(1);
      return $http({
          url: '/user/:' + facebookId,
          method: 'GET'
        })
        .then(function(response) {
          console.log('Get users data is here, resp.data: ', response.data);
          cb(response.data);
        });
    }
  }
})();
