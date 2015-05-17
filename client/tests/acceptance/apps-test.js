import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'client/tests/helpers/start-app';
import appsData from './apps-test-visit-apps-data';

$.mockjax({
    type:"GET",
    url:  "/api/v1/apps",
    dataType: 'json',
    responseText: appsData
});

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
  authenticateSession();
  visit('/apps');

  andThen(function() {
    assert.equal(currentURL(), '/apps');

    var appRows = find('.app-row');
    assert.equal(appRows.length, 5);    

    var actualAppNames = find('.app-name');

    for (var i = 0; i < appsData.apps.length; i++) {
      var expectedAppName = appsData.apps[i].name;
      var appName = $(actualAppNames[i]).text();
      assert.equal(appName, expectedAppName);

    }
  });
});
