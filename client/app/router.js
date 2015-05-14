import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('users');
  this.route('login');
  this.route('register');
  this.resource('apps', function() {
    this.resource('roles', function() {});
  });
});
