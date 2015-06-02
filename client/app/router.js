import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('users');
  this.route('login');
  this.route('register');
  this.resource('apps', function() {
    this.resource('app', { path: '/:app_id' }, function() {});
  });
});

export default Router;

