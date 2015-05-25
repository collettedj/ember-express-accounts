"use strict";

var login = require('./login');
var signup = require('./signup');
var models = require("../models");

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        // User.findById(id, function(err, user) {
        //     done(err, user);
        // });
        models.User.findById(id)
            .then(function(user){
                done(null, user);
            })
            .catch(function(error){
                done(error, null);
            });
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);

};