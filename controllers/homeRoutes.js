const router = require("express").Router();
const db = require("../config/connection");
const User = require("../models/User");

router.get('/', function(req, res) {
	// db.collection('users').findOne({ firstName: 'adminFirstName' }, function(err, user) {
	//   if (err) throw err;
	  
	  res.render('homepage');
	// });
  });

module.exports = router;
