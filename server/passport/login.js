"use strict";

var LocalStrategy   = require('passport-local').Strategy;
var models = require('../models');
//var bCrypt = require('bcrypt-nodejs');
var encrypt = require('./encrypt');

module.exports = function(passport){

  passport.use('login', new LocalStrategy(
        function(username, password, done) { 

            models.User.findOne({ where: {'username': username}})
                .then(function(user){
                    if (!user){
                        console.log('User Not Found with username '+username);
                        return done(null, false, 'Invalid username or password');                 
                    }

                    return isValidPassword(user, password)
                        .then(function(isValid){
                            var userInfo = user.toJSON();
                            if(isValid){
                                delete userInfo.password;
                                return done(null, userInfo);                                
                            }else{
                                return done(null, false, 'Invalid username or password');
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