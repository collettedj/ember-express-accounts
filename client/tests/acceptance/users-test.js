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

$.mockjax({
    type:"GET",
    url:  "/api/v1/users",
    dataType: 'json',
    responseText: {
      "users":[
          {"_id":"554d96840b66257326b08b34",
            "firstName":"David",
            "email":"collettedj@gmial.com",
            "username":"collettedj",
            "__v":0,
            "lastName":"Collette",
            "age":36
          },
          {"_id":"554ee22d35e086b2437e11e8",
            "lastName":"Collette",
            "firstName":"Reshma",
            "email":"collettedj2@gmail.com",
            "username":"collettedj2",
            "__v":0,
            "age":22
          },
          {"_id":"554ee30ac77991b844e64827",
            "lastName":"Collette",
            "firstName":"Andrew",
            "email":"collettedj3@gmail.com",
            "username":"collettedj3",
            "__v":0,
            "age":44
          },
          {"_id":"554ee3bac77991b844e64828",
            "lastName":"Collette",
            "firstName":"Adam",
            "email":"collettedj5@gmail.com",
            "username":"collettedj5",
            "__v":0,
            "age":65
          }
        ]
      }
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
  });
});
