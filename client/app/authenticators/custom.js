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
      url: "/api/v1/auth/user",
    }).then(function(res){
      return res;
    }, function(err){
      return Ember.RSVP.reject(err);
    });
  },

  authenticate: function(options) {
    return this.ajaxPromise({
        type: "POST",
        url: "/api/v1/auth/login",
        data: options,
      }).then(function(res){
        return res;
      }, function(err){
        return Ember.RSVP.reject(err);
      });
  },

  invalidate: function() {
    return this.ajaxPromise({
      type: "GET",
      url: "/api/v1/auth/signout",
      data: {},
    }).then(function(res){
      return res;
    }, function(err){
      return Ember.RSVP.reject(err);
    });
  }
});
