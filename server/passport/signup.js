"use strict";

var LocalStrategy   = require('passport-local').Strategy;
var encrypt = require('./encrypt');
var models = require('../models');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            models.User.findOne({ where:{'username' :  username} })
                .then(function(user) {
                    if (user) {
                        throw 'User already exists with username: '+ username;
                    } else {
                        return encrypt.createHash(password);
                    }
                })
                .then(function(passwordHash){
                    return models.User.create({
                        username: username,
                        password: passwordHash,
                        email: req.body.email,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName
                    });
                })
                .then(function(newUser){
                    return done(null, newUser.toJSON());
                })
                .catch(function(err){
                    console.log(err);
                    done(err);
                });

        })
    );



};