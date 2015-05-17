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

    var firstNames = find('.user-first-name');
    var lastNames = find('.user-last-name');
    var emails = find('.user-email');
    var usernames = find('.user-username');

    for (var i = 0; i < usersData.users.length; i++) {
      var expectedUserInfo = usersData.users[i];
      var firstName = $(firstNames[i]).text();
      var lastName = $(lastNames[i]).text();
      var email = $(emails[i]).text();
      var username = $(usernames[i]).text();
      assert.equal(firstName, expectedUserInfo.firstName);
      assert.equal(lastName, expectedUserInfo.lastName);
      assert.equal(email, expectedUserInfo.email);
      assert.equal(username, expectedUserInfo.username);

    }    
  });
});
