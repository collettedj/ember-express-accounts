"use strict";

var LocalStrategy   = require('passport-local').Strategy;
var encrypt = require('./encrypt');
var models = require('../models');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({passReqToCallback : true },
        function(req, username, password, done) {

            models.User.findOne({ where:{'username' :  username} })
                .then(function(user) {
                    if (user) {
                        console.log('User already exists with username: '+username);
                        return done(null, false, {'message':'User Already Exists'});
                    } else {

                    models.User.create({
                        username: username,
                        password: encrypt.createHashSync(password),
                        email: req.body.email,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName
                    })
                    .then(function(newUser){
                        return done(null, newUser.toJSON());
                    })
                    .catch(function(err){
                        done(err);
                    });
                }
            })
            .catch(done);            

        })
    );
};