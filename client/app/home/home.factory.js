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
