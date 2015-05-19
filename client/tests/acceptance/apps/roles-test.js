import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'client/tests/helpers/start-app';

var application;

module('Acceptance | apps/roles', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting /apps/roles', function(assert) {
  authenticateSession();
  visit('/apps/roles');

  andThen(function() {
    assert.equal(currentURL(), '/apps/roles');
  });
});
