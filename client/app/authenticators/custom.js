import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';

export default Base.extend({
  ajaxPromise: function(options) {
    var request = new Ember.RSVP.Promise(function (resolve, reject) {
      options.success = function (response) {
        resolve(response);
      };

      options.error = function (reason) {
        reject(reason);
      };

      return Ember.$.ajax(options);
    });

    return request;
  },


  restore: function() {
    return this.ajaxPromise({
      type: "GET",
      url: "../auth/currentUser",
      //xhrFields: {
      //  withCredentials: true
      //},
      //crossDomain: true
    }).then(function(res){
      return res;
    }, function(err){
      return Ember.RSVP.reject(err);
    });
  },

  authenticate: function(options) {
    return this.ajaxPromise({
        type: "POST",
        url: "../auth/local",
        data: options,
        //xhrFields: {
        //  withCredentials: true
        //},
        //crossDomain: true
      }).then(function(res){
        return res;
      }, function(err){
        return Ember.RSVP.reject(err);
      });
  },

  invalidate: function() {
    return this.ajaxPromise({
      type: "GET",
      url: "../logout",
      data: {},
      //xhrFields: {
      //  withCredentials: true
      //},
      //crossDomain: true
    }).then(function(res){
      return res;
    }, function(err){
      return Ember.RSVP.reject(err);
    });
  }
});
