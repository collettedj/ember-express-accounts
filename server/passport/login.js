"use strict";

var LocalStrategy   = require('passport-local').Strategy;
var models = require('../models');
var bCrypt = require('bcrypt-nodejs');

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
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done('Invalid username or password');
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    var userInfo = user.toJSON();
                    delete userInfo.password;
                    return done(null, userInfo);
                })
                .catch(function(err){
                    done(err);
                });

            // // check in mongo if a user with username exists or not
            // User.findOne({ 'username' :  username }, 
            //     function(err, user) {
            //         // In case of any error, return using the done method
            //         if (err)
            //             return done(err);
            //         // Username does not exist, log the error and redirect back
            //         if (!user){
            //             console.log('User Not Found with username '+username);
            //             return done(null, false, req.flash('message', 'User Not found.'));                 
            //         }
            //         // User exists but wrong password, log the error 
            //         if (!isValidPassword(user, password)){
            //             console.log('Invalid Password');
            //             return done(null, false, { message: 'Invalid Password'}); // redirect back to login page
            //         }
            //         // User and password both match, return user from done method
            //         // which will be treated like success
            //         var userInfo = user.toJSON();
            //         delete userInfo.password;
            //         return done(null, userInfo);
            //     }
            // );

        })
    );


    var isValidPassword = function(user, password){
        var userPassword = user.password || "";
        return bCrypt.compareSync(password, userPassword);
    };
    
};