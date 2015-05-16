import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'client/tests/helpers/start-app';
// import { defineFixture } from 'ic-ajax';


// defineFixture('/api/v1/auth/login', {
//   response: {
//     "_id":"554d96840b66257326b08b34",
//     "firstName":"David",
//     "email":"collettedj@gmial.com",
//     "username":"collettedj",
//     "__v":0,
//     "lastName":"Collette",
//     "age":36},
//   jqXHR: {},
//   textStatus: 'success'
// });

var application;

module('Acceptance | users', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /users', function(assert) {
  authenticateSession();
  visit('/users');  

  andThen(function() {
    assert.equal(currentURL(), '/users');
  });
});
