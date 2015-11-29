(function() {
  'use strict';

  angular.module('app')
  .factory('homeFactory', homeFactory);

  homeFactory.$inject = ['$http'];

  function homeFactory($http) {
    var services = {
      getTop : getTop,
    };

    return services;

    function getTop(params) {
      return $http({
        method: 'POST',
        url: '/meals/top',
        data: params,
      })
      .then(function (response) {
        return response.data;
      });
    }
  }
})();


(function() {
  'use strict';

  angular.module('app')
  .factory('homeFactoryTest', homeFactoryTest);

  homeFactoryTest.$inject = ['$http'];

  function homeFactoryTest($http) {
    var services = {

      getMeals : getMeals,
      getEvent : getEvent

    };

    return services;

    function getEvent (mealID) {
      return $http({
        method: 'GET',
        url: '/meals/' + mealID,
      })
      .then(function (response) {
        return response.data;
      });
    }

    function getMeals () {
      return $http({
        method: 'GET',
        url: '/meals'
      })
      .then(function (response) {
        // console.log('meal datas bruuuuhhhh',response)
        return data;
      });
    }


  }

})();
var numCards = 4;

var data = [];

for(var i = 0; i < numCards; i++) {
  data.push({
    address: [
      "360 Jessie St",
      "Union Square",
      "San Francisco, CA 94103",
    ],
    date: "November 21, 2015",
    description: "Best meal",
    host: "undefined undefined",
    id: i,
    time: "12:00:00 am",
    title: "Foodbruh",
  });
}
