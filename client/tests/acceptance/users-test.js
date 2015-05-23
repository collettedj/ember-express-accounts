import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'client/tests/helpers/start-app';

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
  var numRows = 10;
  server.createList('user', numRows);
  authenticateSession();
  visit('/users');  

  andThen(function() {
    assert.equal(currentURL(), '/users');

    var userRows = find('.user-row');
    assert.equal(userRows.length, numRows);

    var firstNames = find('.user-first-name');
    var lastNames = find('.user-last-name');
    var emails = find('.user-email');
    var usernames = find('.user-username');

    for (var i = 0; i < numRows; i++) {
      //var expectedUserInfo = usersData.users[i];
      var firstName = $(firstNames[i]).text();
      var lastName = $(lastNames[i]).text();
      var email = $(emails[i]).text();
      var username = $(usernames[i]).text();
      var expectedFirstName = "firstName" + i;
      var expectedLastName = "lastName" + i;
      var expectedEmail = "email" + i;
      var expectedUsername = "username" + i;
      assert.equal(firstName, expectedFirstName);
      assert.equal(lastName, expectedLastName);
      assert.equal(email, expectedEmail);
      assert.equal(username, expectedUsername);

    }    
  });
});


test('delete user', function(assert){
  var numRows = 5;
  server.createList('user', 5);
  authenticateSession();
  visit('/users');
  

  andThen(function(){
    click('.delete-user-btn:nth(2)');
  });

  andThen(function(){
    var userRows = find('.user-row');
    assert.equal(userRows.length, numRows - 1); 
  });

});
