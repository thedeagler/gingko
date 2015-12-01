var express = require('express');
var requestHandler = require('./../utils/requestHandler');

module.exports = function(passport, isLoggedIn) {
  var router = express.Router();

  // GET a user by id
  router.get('/:id', function(req, res) {
    // console.dir(req);
    var tablesurfer_id = req.params.id;

    requestHandler.getUserById(tablesurfer_id)
      .then(function(data) {
        res.status(200).send(data);
      })
      .catch(function(err) {
        console.error(err);
        res.status(404).send(err);
      });
  });


  router.get('/:id/meals', function(req, res){
    var tablesurfer_id = req.params.id;
    requestHandler.getUserMeals(tablesurfer_id)
    .then(function(data) {
      res.status(200).send(data);
    })
    .catch(function(err) {
      console.error(err);
      res.status(404).send(err);
    });
  });
  return router;

};


