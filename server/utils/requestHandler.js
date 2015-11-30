var db = require('./../services/db');
var utils = require('./formatHandler');

/****************************************
              MEAL ROUTES
*****************************************/

// GET to /meals/:id
exports.getMeal = function(meal_id) {
  return db.Meals.find({
      where: {id: meal_id},
      include: [db.Users, db.Restaurants]
    })
    .then(function (meal) {
      var o = utils.formatMeal(meal);
      return o;
    });
};

// GET to /meals
exports.getMeals = function() {
  return db.Meals.findAll({
      include: [db.Users, db.Restaurants]
    })
    .then(function (meals) {
      var o = utils.formatMeals(meals);
      return o;
    });
};

// POST to /meals/top
exports.getTop = function(params) {
  if(params.sortBy === 'date') {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!sort by date!!!!!!!!!!!!!!!!!');

    return db.Meals.findAll({
      include: [db.Users, db.Restaurants],
      limit: params.numResults,
      order: [['date', 'ASC']],
      where: {
        date: {
          $gt: new Date().toString(),
        },
      },
    })
    .then(function (meals) {
      return utils.formatMeals(meals);
    });
  }
  else if(params.sortBy === 'rating') {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!sort by rating!!!!!!!!!!!!!!!!!');

    return db.Meals.findAll({
      include: [db.Restaurants, db.Users],
      limit: params.numResults,
      order: [[db.Restaurants, 'rating', 'DESC']],
      where: {
        date: {
          $gt: new Date().toString(),
        },
      },
    })
    .then(function (meals) {
      return utils.formatMeals(meals);
    });
  }
  // TODO: DOESN'T ACTUALLY GET BY DISTANCE RIGHT NOW
  else if(params.sortBy === 'distance' && params.location) {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!sort by distance!!!!!!!!!!!!!!!!!');

    return db.Meals.findAll({
      include: [db.Restaurants, db.Users],
      limit: params.numResults,
      order: [[db.Restaurants, 'rating', 'DESC']],
      where: {
        date: {
          $gt: new Date().toString(),
        },
      },
      // where: {
      //   // Lat and lon within 5 miles
      //   $and: {
      //     db.Restaurants.lat: {
      //       $between: [params.location.lat]
      //     }
      //   },
      // },
    })
    .then(function (meals) {
      return utils.formatMeals(meals);
    });
    // // Find sort by distance in miles
    // db.Meals.query("SELECT latitude, longitude, SQRT(\
    //     POW(69.1 * (latitude - " + location.lat + "), 2) +\
    //     POW(69.1 * (" + location.lon + " - longitude) * COS(latitude / 57.3), 2)) AS distance\
    //     FROM locations\
    //     WHERE SQRT(\
    //     POW(69.1 * (latitude - 31.8679), 2) +\
    //     POW(69.1 * (-116.6567 - longitude) * COS(latitude / 57.3), 2)) < 1\
    //     ORDER BY distance");
  }

  // } else if(params.sortBy === 'rating') {

  // } else if(params.location) {
  //   // Find sort by distance in miles
  //   db.Meals.query("SELECT latitude, longitude, SQRT(\
  //       POW(69.1 * (latitude - " + location.lat + "), 2) +\
  //       POW(69.1 * (" + location.lon + " - longitude) * COS(latitude / 57.3), 2)) AS distance\
  //       FROM locations\
  //       WHERE SQRT(\
  //       POW(69.1 * (latitude - 31.8679), 2) +\
  //       POW(69.1 * (-116.6567 - longitude) * COS(latitude / 57.3), 2)) < 1\
  //       ORDER BY distance");
  // } else {

  // }
};

// POST to /meals
exports.addMeal = function(req) {
  // Must define host outside of promise chain
  // so it can be referenced in 2nd .then statement.
  var host;

  return db.Users.findOrCreate({
      where: {facebookId: req.facebookId}
    })
    .then(function (user) {
      host = user;

      return db.Restaurants.findOrCreate({
          where: {contact: req.restaurant.phone},
          defaults: utils.formatRestaurant(req.restaurant)
      });
    })
    .then(function (restaurant) {
       return db.Meals.create({
         title: req.title,
         date: req.date,
         description: req.description,
         UserId: host[0].dataValues.id,
         RestaurantId: restaurant[0].dataValues.id,
       });
    })
    .then(function(meal) {
      return meal;
    });
};

/****************************************
              USER ROUTES
*****************************************/

// GET TO /user/:id
exports.getUser = function(facebook_id) {
  return database.Users.find({
      where: { facebookId: facebook_id }
    })
    .then(function(user) {
      return user;
    });
};
