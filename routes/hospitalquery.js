var express        = require("express"),
    router         = express.Router(),
    passport       = require("passport"),
    donor          = require("../models/donor"),
    hospital       = require("../models/hospital"),
    LocalStrategy  = require("passport-local").Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    bodyParser     = require('body-parser'),
    multer         = require('multer'),
    path           = require('path');
    request        = require("request");

require('../config/passport')(passport);

router.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success     = req.flash('success');
    res.locals.error       = req.flash('error');
    next();
});


    router.post('/', function(req, res){
        hospital.findOne({ 'local.username':req.body.username }, function (err, user) {
            if (err)
                return done(err);
            else 
            res.render('profileHospital',{hospital:user});
           
    });
});



<<<<<<< HEAD
  module.exports = router;

//   AIzaSyCIxRkE7nRMP9NbLGLGDPvOpLqyRA8S94E
//   http://localhost:8080/auth/google/callback
//   1091841965143-ibkr9jmpfuu8r4a0cqc7de06q17ns1gl.apps.googleusercontent.com
//   nGYOBOiKesqnEwQ16W_rlEnE
=======
  module.exports = router;
>>>>>>> cf336da9437447a37c2b03cabfa1bc231785154f
