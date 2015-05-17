import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'client/tests/helpers/start-app';
import usersData from './users-test-visit-users-data';

$.mockjax({
    type:"GET",
    url:  "/api/v1/users",
    dataType: 'json',
    responseText: usersData
});

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

    var userRows = find('.user-row');
    assert.equal(userRows.length, 4, "Number of users");
  });
});
