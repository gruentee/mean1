var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find().sort('id').exec(function (error, users) {
    if (error) {
      return next(error);
    }
    res.locals.users = users;
    return next();
  });
}, function (req, res, next) {
  // TODO: use res.render() to use template instead
  var view = '<!DOCTYPE html>';
  view += '<html><head><title>Users list</title></head><body>';
  view += '<h1>User list</h1>';
  res.locals.users.forEach(function (item) {
    view += '<li>id: ' + item.id;
    view += ' name: ' + item.name + '</li>';
  });
  
  view += '</body></html>';
  res.send(view);
});

router.get('/:id', function(req, res, next) {
  // retrieve single user
  User.findOne({
    id: req.params.id
  }).exec(function (error, user) {
    if (error) {
      return next(error);
    }
    res.locals.user = user;
    return next();
  });
}, function (req, res, next) {
  var view = '<p>User named ' + res.locals.user.name;
  view += ' has the email address ' + res.locals.user.email;
  view += '</p>';
  
  res.send(view);
});

module.exports = router;
