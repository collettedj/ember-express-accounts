import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'client/tests/helpers/start-app';

var application;

module('Acceptance | apps', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /apps', function(assert) {
  var numRows = 10;

  server.createList('app', numRows);
  authenticateSession();
  visit('/apps');

  andThen(function() {
    assert.equal(currentURL(), '/apps');

    var appRows = find('.app-row');
    assert.equal(appRows.length, numRows);    

    var actualAppNames = find('.app-name');

    for (var i = 0; i < numRows; i++) {
      var expectedAppName = "App " + i;
      var appName = $(actualAppNames[i]).text();
      assert.equal(appName, expectedAppName);

    }
  });
});
