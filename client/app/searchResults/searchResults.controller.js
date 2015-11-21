(function() {
  'use strict';

  angular.module('app')
  .controller('SearchResultsCtrl', SearchResultsCtrl);

  // if factories are needed, inject here
  SearchResultsCtrl.$inject = ['multibarFactory','$state', "$location", "$window", "$http", 'mealsData'];

  function SearchResultsCtrl(multibarFactory, $state, $location, $window, $http, mealsData) {
    var self = this;
    // self.ready = false;
    self.meals = mealsData.data.map(function(meal) {
      return {
        address: meal.address,
        date: meal.date,
        host: meal.host,
        time: meal.time,
        title: meal.title,
        yelpData: JSON.parse(meal.yelpData)
      };
    });

    console.log(self.meals[0]);
    self.searchQuery = multibarFactory.getQuery();

  }



})();

