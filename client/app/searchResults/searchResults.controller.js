(function() {
  'use strict';

  angular.module('app')
  .controller('SearchResultsCtrl', SearchResultsCtrl);

  // if factories are needed, inject here
  SearchResultsCtrl.$inject = ['$state', "$location", "$window"];

  function SearchResultsCtrl(homeFactoryTest, $state, $location, $window) {

    this.data = [
      {rating: 3, time: '3:00 PM', name: 'chipotle', picture: 'http://indianapublicmedia.org/eartheats/files/2012/06/5115793807_9e843d90db_b-e1339037423853.jpg', city: 'San Fransisco', state_code: 'CA'},
      {rating: 2, time: '7:00 PM', name: 'subway', picture: 'http://www.restaurantnews.com/wp-content/uploads/2015/08/SUBWAY-Restaurants-Recognizes-Achievements-Of-Outstanding-Franchisees.jpg', city: 'San Fransisco', state_code: 'CA'},
      {rating: 4.5, time: '12:00 PM', name: 'dominos', picture: 'http://s3.amazonaws.com/newscloud-production/tallmadgeexpress/2014/09/5412b6bc7e85e8c3f4000da9/photos/ken8041364/original.jpg?1410512574', city: 'Menlo Park', state_code: 'CA'},
    ];

    this.randomColor = function() {
      var random = function() {
        return Math.floor(Math.random() * 256);
      };
      var rgba = 'rgba(' + random() + ',' + random() + ',' + random() + ',' + random() +')';
      console.log(rgba);
      return rgba;
    };
  }



})();

