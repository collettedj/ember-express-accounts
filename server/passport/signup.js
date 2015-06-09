"use strict";

var LocalStrategy   = require('passport-local').Strategy;
var encrypt = require('./encrypt');
var models = require('../models');




module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            var findOrCreateUser = function(){
                models.User.findOne({ where:{'username' :  username} })
                    .then(function(user) {
                        if (user) {
                            console.log('User already exists with username: '+username);
                            return done(null, false, {'message':'User Already Exists'});
                        } else {

                        models.User.create({
                            username: username,
                            password: encrypt.createHash(password),
                            email: req.param('email'),
                            firstName: req.param('firstName'),
                            lastName: req.param('lastName')
                        })
                        .then(function(newUser){
                            console.log('User Registration succesful');    
                            return done(null, newUser.toJSON());
                        })
                        .catch(function(err){
                            console.log('Error in Saving user: '+err);  
                            throw err;  
                        });
                    }
                })
                .catch(done);


                // // find a user in Mongo with provided username
                // User.findOne({ 'username' :  username }, function(err, user) {
                //     // In case of any error, return using the done method
                //     if (err){
                //         console.log('Error in SignUp: '+err);
                //         return done(err);
                //     }
                //     // already exists
                //     if (user) {
                //         console.log('User already exists with username: '+username);
                //         return done(null, false, {'message':'User Already Exists'});
                //     } else {
                //         // if there is no user with that email
                //         // create the user
                //         var newUser = new User();

                //         // set the user's local credentials
                //         newUser.username = username;
                //         newUser.password = createHash(password);
                //         newUser.email = req.param('email');
                //         newUser.firstName = req.param('firstName');
                //         newUser.lastName = req.param('lastName');

                //         // save the user
                //         newUser.save(function(err) {
                //             if (err){
                //                 console.log('Error in Saving user: '+err);  
                //                 throw err;  
                //             }
                //             console.log('User Registration succesful');    
                //             return done(null, newUser.toJSON());
                //         });
                //     }
                // });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );



};