import Ember from 'ember';

export default Ember.Controller.extend({
  email:'collettedj@gmail.com',
  password:'1qaz2wsx!QAZ@WSX',
  authError: '',

  hasErrors: function(){
    var authError = this.get('authError');
    return !Ember.isBlank(authError);
  }.property('authError'),

  actions:{
    login:function(){
      var email = this.get('email');
      var password = this.get('password');
      this.get('session').authenticate('authenticator:custom', {identifier: email, password: password});
        //.then(function(){
        //  var currentUserId = this.get('session.content.secure.id');
        //  return this.store.find('user', currentUserId);
        //}.bind(this))
        //.then(function(user){
        //  return this.set('session.currentUser', user);
        //}.bind(this));
    }


  }

});
