import Ember from "ember";
import Session from "simple-auth/session";

export function initialize(/* container, application */) {
  Session.reopen({
    currentUser: function() {
      var id = this.get("content.secure.id");
      var self = this;

      if (!Ember.isEmpty(id)) {
        this.container.lookup("store:main").find("user", id)
          .then(function(user) {
            self.set("content.currentUser", user);
          });
      }
    }.observes("content.secure.id")
  });
}

export default {
  name: 'custom-session',
  before: "simple-auth",
  initialize: initialize
};
