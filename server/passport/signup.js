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
                    return models.sequelize.transaction(function(trans){
                        return models.User.create({
                            username: username,
                            password: passwordHash,
                            email: req.body.email,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName
                        }, {returning:true, transaction:trans})
                        .then(function(newUser){
                            return models.sequelize.Promise.props({
                                user: newUser,
                                passwordHistory: models.PasswordHistory.create({
                                        userId: newUser.id,
                                        password: newUser.password
                                    }, {returning:true, transaction:trans})
                            });
                        });
                    });
                })
                .then(function(hash){
                    return done(null, hash.user.toJSON());
                })
                .catch(function(err){
                    console.log(err);
                    done(err);
                });

        })
    );



};