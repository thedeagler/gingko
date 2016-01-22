(function() {
  'use strict';

  angular.module('app')
  .factory('multibarFactory', multibarFactory);

  multibarFactory.$inject = ['$http', '$window'];

  function multibarFactory($http, $window) {
    var searchQuery = '';
    
    var services = {
      setQuery: function(query) {
        searchQuery = query;
      },
      getQuery: function() {
        return searchQuery;
      }
    };

    return services;
  }

})();
