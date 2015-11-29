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
<<<<<<< b1391790bcdb6dbc598a6fa67d757251c740ffa5
=======
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


>>>>>>> (feat) Properly queries database for top rated restaurants
  }
})();
