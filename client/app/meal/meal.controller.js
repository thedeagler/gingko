(function() {
  'use strict';

  angular.module('app')
    .controller('MealCtrl', MealCtrl);

  MealCtrl.$inject = ['multibarFactory', '$state', "$location", "$window", "$http", 'mealsData', 'mealFactory'];

  function MealCtrl(multibarFactory, $state, $location, $window, $http, mealsData, mealFactory) {
    var self = this;

    self.activate = function() {
      self.attendees = mealsData.data.attendees;
      self.mealsData = mealsData.data.meal;
      self.yelpData = JSON.parse(mealsData.data.meal.yelpData);
      // console.log('self.attendees =', self.attendees);
      // console.log('self.mealsData =', self.mealsData);
      // console.log('self.yelpData =', self.yelpData);
      self.formatTime();
      self.drawMap();
    };

    self.drawMap = function() {
      mealFactory.drawMap(Map, self.mealsData.Restaurant.lat, self.mealsData.Restaurant.lng);
    };

    self.formatTime = function() {
      var momentDate = moment(self.mealsData.date);
      var createdAt = self.mealsData.createdAt;
      self.mealsData.formattedDay = momentDate.format('dddd');
      self.mealsData.formattedDate = momentDate.format('MMM Do');
      self.mealsData.formattedTime = momentDate.format('h:mm a');
      self.mealsData.formattedCreatedAt = moment(createdAt).format('MMM Do');
      self.mealsData.relativeCreatedAt = moment(createdAt, 'YYYYMMDD').fromNow();
      self.mealsData.relativeTime = moment(momentDate, 'YYYYMMDD').fromNow();
      self.mealsData.typeOfMeal = mealFactory.getGreetingTime(momentDate);
    };


    self.activate();

  }

})();
