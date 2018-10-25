var express               = require('express'),
    app                   = express(),
    mongoose              = require('mongoose'),
    bodyParser            = require('body-parser'),
    passport              = require('passport'),
    LocalStrategy         = require("passport-local").Strategy,
    cookieParser          = require("cookie-parser"),
    session               = require('express-session'),
    flash                 = require('connect-flash'),
    donor                 = require('./models/donor.js'),
    hospital              = require('./models/hospital.js'),
    hashmap               = require('hashmap');



function countDonors(){
var map=new hashmap();
map.set("A1+",0);
map.set("A1-",0);
map.set("A2+",0);
map.set("A2-",0);
map.set("B+",0);
map.set("B-",0);
map.set("A1B+",0);
map.set("A1B-",0);
map.set("A2B+",0);
map.set("A2B-",0);
map.set("AB+",0);
map.set("AB-",0);
map.set("O+",0);
map.set("O-",0);
map.set("A+",0);
map.set("A-",0);

   donor.find({}).select().exec((err,donors) => {
       if(err)
       return handleError(err);
       donors.forEach((element)=>{
           if(element.activeStatus==true){
       map.forEach((key,mapelement)=>{
          // console.log(element.bloodGroup);
         //  
           if(element.bloodGroup === mapelement)
           {
           // console.log(mapelement);
            key=key+1;
            map.set(mapelement,key);
           }
       })}
       
   });
   console.log(map.get("A1+"));
});
       
};

module.exports = countDonors ;



