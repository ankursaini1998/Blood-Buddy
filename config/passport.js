var LocalStrategy   = require('passport-local').Strategy,
    donor           = require('../models/donor'),
    hospital        = require('../models/hospital'),
    flash           = require('connect-flash');

module.exports = function(passport) {
    
//Local Strategy for Register
passport.use('local-signup', new LocalStrategy({passReqToCallback : true},function(req, username, password, done){
    process.nextTick(function() {
    donor.findOne({ 'local.username':username },function(err,user){
        if (err)
            return done(err);
        if (user){
            console.log("User exists already");
            return done(null, false,req.flash("error", 'This Username is already taken.'));
        } 
        else
        {
            var newDonor  = new donor();
            donor.collection.dropIndex({"username":1});                      //insert this
            newDonor.local.username    = username;
            newDonor.local.password = newDonor.generateHash(password);
            newDonor.name = req.body.name;
            newDonor.email = req.body.email;
            newDonor.confirmPassword = req.body.confirmPassword;
            newDonor.dob = req.body.dob;
            newDonor.gender = req.body.gender;
            newDonor.bloodGroup = req.body.bloodGroup;
            newDonor.dateOfLastDonation = req.body.dateOfLastDonation;
            newDonor.city = req.body.city;
            newDonor.contactNumber = req.body.contactNumber;
            newDonor.address = req.body.address;
            newDonor.userType= req.body.userType; 

            newDonor.save(function(err,created){
                if (err)
                    throw err;
                console.log("Registered Successfully!");
                console.log("hi " + created.name);
                return done(null, newDonor,req.flash("success", "Successfully Signed Up! Welcome " + req.body.username));
            });
        }
    });    
});
}));
//Local Strategy for Register Hospitals
passport.use('local-signup-hospital', new LocalStrategy({ passReqToCallback: true }, function (req, username, password, done) {
    process.nextTick(function () {
        hospital.findOne({ 'local.username': username }, function (err, user) {
            if (err)
                return done(err);
            if (user) {
                console.log("User exists already");
                return done(null, false);
            }
            else {
                var newHospital = new hospital();
                // newHospital._id= req.body._id;
                hospital.collection.dropIndex({"username":1});                      //insert this
                newHospital.local.username = username;
                newHospital.local.password = newHospital.generateHash(password);
                newHospital.name = req.body.name;
                newHospital.email = req.body.email;
                newHospital.confirmPassword = req.body.confirmPassword;
                newHospital.city = req.body.city;
                newHospital.contactNumber = req.body.contactNumber;
                newHospital.address = req.body.address;
                newHospital.userType= req.body.userType;                            //changed

                newHospital.save(function (err, created) {
                    if (err)
                        throw err;
                    console.log("Registered Successfully!");
                    console.log("Welcome  " + created.name);
                    return done(null, newHospital);
                });
            }
        });
    });
}));
//Local Strategy for Login
passport.use('local-login', new LocalStrategy({passReqToCallback:true},function(req, username, password, done){ 
donor.findOne({ 'local.username':username },function(err,donor){
    if (err)
        return done(err);

    if (!donor){
        //console.log("Wrong Username!");
        return done(null, false, req.flash("error", 'User does not exist.'));
    }
    if (!donor.validPassword(password)){
        //console.log("Wrong Password!");
        return done(null,false, req.flash("error", 'Oops! Wrong password.'));
    } 
    console.log("Logged in Successfully!");
    console.log("Hi  " + donor.name);
    return done(null, donor,req.flash("success", "Successfully Logged In! Welcome " + req.body.username));
});
}));
passport.use('local-login-hospital', new LocalStrategy({ passReqToCallback: true }, function (req, username, password, done) {
    hospital.findOne({ 'local.username': username }, function (err, hospital) {
        if (err)
            return done(err);

        if (!hospital) {
            console.log("Wrong Username!");
            return done(null, false,req.flash("error", 'User does not exist.'));
        }
        if (!hospital.validPassword(password)) {
            console.log("Wrong Password!");
            return done(null, false, req.flash("error", 'Oops! Wrong password.'));
        }
        console.log("Logged in Successfully!");
        console.log("Welcome  " + hospital.name);
        console.log("HIII 1"+hospital);
        console.log("hiii 2 "+req.user);
        return done(null, hospital,req.flash("success", "Successfully Logged In! Welcome " + req.body.username));
    });
}));
//Serializing User for the session
passport.serializeUser(function(user, done) {              //changed
   
    if(user.userType==="Donor")
    {
        var key1="a"+user.id;
        done(null,key1);
    }
    else if(user.userType==="Hospital")
    done(null,"b"+user.id);
});
passport.deserializeUser(function(key, done) {
    if(key.charAt(0)==="a")
    {
        key1=key.substr(1);
        donor.findById(key1,(err,donors)=>{
            done(err,donors);
        })
    }
    else if(key.charAt(0)==="b")
    {
        key1=key.substr(1);
        hospital.findById(key1,(err,hospitals)=>{
            done(err,hospitals);
        })
    }
});                             
}