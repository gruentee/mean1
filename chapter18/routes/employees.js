var express = require('express');
var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
var router = express.Router();

router.get('/employees', function(req, res, next) {
  Employee.find().sort('name.last').exec(function (error, results) {
    if (error) {
      return next(error);
    }
    
    // Respond with valid data
    res.json(results);
  });
});

router.post('/employees', function(req, res, next) {
  // TODO: do validation
  var employeeId= Math.floor(Math.random() * (99 - 32) + 32);
  var postData = {
    id: "10000" + employeeId.toString(),
    name: {
      first: req.body.first,
      last: req.body.last
    }
  };
  Employee.create(postData, function (error, employee) {
    if (error) {
      console.error('Error: ' + error);
      // TODO: output error to client
      return next(error);
    }
    res.json(employee);
  });
});

router.get('/employees/:employeeId', function(req, res, next) {
  Employee.findOne({
    id: req.params.employeeId
  }).populate('team').exec(function (error, results) {
    if (error) {
      return next(error);
    }
    // If valid user not found, send 404
    if (!results) {
      res.send(404);
    }
    
    // Respond with valid data
    res.json(results);
  });
});

router.put('/employees/:employeeId', function(req, res, next) {
  // Remove this or mongoose will throw an error
  // because we would be trying to update the mongo ID
  delete req.body._id;
  if (req.body.team !== null) {
    req.body.team = req.body.team._id;
  } 
  
  Employee.update({
    id: req.params.employeeId
  }, req.body, function (err, numberAffected, response) {
    if (err) {
      return next(err);
    }
    
    res.send(200);
  });
});

router.delete('/employees/:employeeId', function (req, res, next) {
  // TODO: validation
  
  // Find employee by ID
  Employee.findOneAndRemove({
    id: req.params.employeeId
  }, function (error) {
    if(error) {
      return next(error);
    }
    Employee.find().exec(function (error, result)  {
      if(error) {
        return next(error);
      }
      console.log("Employee with id " + req.params.employeeId + " deleted.");
      res.json(result);
    });
  });
});
module.exports = router;


