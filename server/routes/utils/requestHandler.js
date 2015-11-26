var database = require('./db');
var Promise = require('bluebird');

exports.getMeals = function() {
  return database.Meals.findAll({ include: [database.Users, database.Restaurants]})
    .then(function (meals) {
      return Promise.map(meals, function(meal) {
        return meal.getUsers()
        .then(function(result) {
          var mealObj = {meal: meal, attendees: result};
          return mealObj;
        });
      });
    })
    .then(function(meals) {
      var obj = [];
      meals.map(function(meal, i) {
        obj.push(new objectify.restaurantData(meal));
      });
      return obj;
    });
};
