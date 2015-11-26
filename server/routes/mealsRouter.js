var express = require('express');
var classes = require('./../classes/classes');
var Promise = require('bluebird');

module.exports = function(dbController, passport, isLoggedIn) {
  var router = express.Router();
  
  //------------------------------------------------------//
  router.get('/', function(req, res) {
    //request on loading the main page to see the upcoming meals
    dbController.meals.get()
      .then(function(data) {
        res.status(200).send(data);
      })
      .catch(function(err) {
        console.log('err posting meal data', err);
        res.status(500).send(err);
      });

  });

  router.get('/:id', function(req, res) {
    var meal_id = req.params.id;
    dbController.meals.getOne(meal_id)
    .then(function(data) {
      res.status(200).send(data);
    })
    .catch(function(err) {
      res.status(404).send(err);
    });
  });

  //------------------------------------------------------//
  //posting to the query file which will post to the meals database details of a new event
  router.post('/', function(req, res) {
    //make an object of all the values that we need
    var meal = classes.Meal(req.body);
    // //if the values are not valid then send err

    if (!meal) {
      res.status(400).send('wrong data passed to routes');
    }
    //else go onto the queries
    dbController.meals.post(meal)
      .then(function(data) {
        res.status(200).send(data);
      });

  });


  router.post('/join', function(req, res) {
    //user joining an meal
    var join = new classes.Join(req.body);

    dbController.user.joinMeal(join)
      .then(function(data) {
        res.status(200).send(data);
      })
      .catch(function(err) {
        console.log('err posting meal data:', err);
        res.status(500).send(err);
      });

  });

  return router;

};
