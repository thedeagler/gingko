
/*****************************************
        FORMAT UTILITY FUNCTIONS
******************************************/

// Note: 'o' represents the formatted object returned by the function.
exports.formatMeal = function(meal, attendeesData) {
  var _meal = {
    id: meal.id,
    title: meal.dataValues.title,
    date: meal.dataValues.date,
    description: meal.dataValues.description,
  };

  var o = {
    meal: _meal,
    restaurant: meal.Restaurant.dataValues,
    host: meal.User.dataValues
  };

  if (attendeesData) {
    var attendees = attendeesData.map(function(attendee) {
      return attendee.dataValues;
    });

    o.attendees = attendees;
  }

  return o;
};

exports.formatMeals = function(meals) {
  var o = meals.map(function(meal) {
    return exports.formatMeal(meal);
  });

  return o;
};

exports.formatRestaurant = function(restaurant) {
  var o = {
    name: restaurant.name,
    contact: restaurant.phone,
    rating: restaurant.yelpData.rating,
    numRates: restaurant.yelpData.review_count,
    yelpData: restaurant.yelpData
  };

  return o;
};
