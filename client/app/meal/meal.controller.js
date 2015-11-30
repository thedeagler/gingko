(function() {
  'use strict';

  angular.module('app')
    .controller('MealCtrl', MealCtrl);

  MealCtrl.$inject = ['multibarFactory', '$state', "$location", "$window", "$http", 'mealsData', 'mealFactory'];

  function MealCtrl(multibarFactory, $state, $location, $window, $http, mealsData, mealFactory) {
    var self = this;

    self.activate = function() {
      self.host = mealsData.data.host;
      self.meal = mealsData.data.meal;
      self.restaurant = mealsData.data.restaurant;
      self.yelpData = mealsData.data.restaurant.yelpData;

      self.formatTime();
      self.drawMap();
      self.getFriends();
      self.getAttendees();
      console.log('self.host =', self.host);
      console.log('self.meal =', self.meal);
      console.log('self.restaurant =', self.restaurant);
      console.log('self.yelpData =', self.yelpData);
    };

    self.drawMap = function() {
      mealFactory.drawMap(Map, self.yelpData.location.coordinate.latitude, self.yelpData.location.coordinate.longitude);
    };

    self.formatTime = function() {
      self.meal.date = new Date(self.meal.date);
      self.host.updatedAt = new Date(self.host.updatedAt);
      var momentDate = moment(self.meal.date);
      var createdAt = self.host.updatedAt;
      self.meal.formattedCreatedAt = moment(createdAt).format('MMM Do');
      self.meal.relativeCreatedAt = moment(createdAt).fromNow();
      self.meal.relativeTime = moment(momentDate).fromNow();

      self.meal.typeOfMeal = mealFactory.getGreetingTime(momentDate);
    };

    self.getFriends = function() {
      self.host.friendsList = self.host.friends.data.reduce(function(acc, current) {
        return acc.concat([current.name]);
      }, []).join(", ");
    };

    self.getAttendees = function() {
      self.meal.attendees = ["Person1", "Person2"]
    }


    self.activate();

  }

})();
