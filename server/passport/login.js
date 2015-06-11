"use strict";

var LocalStrategy   = require('passport-local').Strategy;
var models = require('../models');
//var bCrypt = require('bcrypt-nodejs');
var encrypt = require('./encrypt');

module.exports = function(passport){

  passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 

            models.User.findOne({ where: {'username': username}})
                .then(function(user){
                    if (!user){
                        console.log('User Not Found with username '+username);
                        return done('Invalid username or password');                 
                    }
                    // User exists but wrong password, log the error 
                    // if (!isValidPassword(user, password)){
                    //     console.log('Invalid Password');
                    //     return done('Invalid username or password');
                    // }
                    // // User and password both match, return user from done method
                    // // which will be treated like success


                    return isValidPassword(user, password)
                        .then(function(isValid){
                            var userInfo = user.toJSON();
                            if(isValid){
                                delete userInfo.password;
                                return done(null, userInfo);                                
                            }else{
                                return done('Invalid username or password');
                            }
                        });
                })
                .catch(function(err){
                    done(err);
                });
        })
    );


    var isValidPassword = function(user, password){
        var passwordHash = user.password || "";
        return encrypt.compareHash(password, passwordHash);
    };
    
};