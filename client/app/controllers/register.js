import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations.Mixin, {

  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',

  validations:{
    username: {
      presence: true,
      length: {minimum: 5}
    },

    email: {
      presence: true,
      format: { with: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i, allowBlank: false, message: 'invalid email address'  }
    },

    password: {
      presence: true,
      length: {minimum:15},
      confirmation:true,
      format: { with: /(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[!@#$%^&*-].*[!@#$%^&*-])/g, allowBlank: false, message: 'invalid password'  }
    },

    firstName: {
      presence: true,
      length: {minimum:2}
    },

    lastName: {
      presence: true,
      length: {minimum:2}
    }
  },

  actions:{
    registerUser:function(){
      var isValid = this.get('isValid');
      var username = this.get('username');
      var email = this.get('email');
      var password = this.get('password');
      var firstname = this.get('firstName');
      var lastname= this.get('lastName');
      if(isValid){
        Ember.$.ajax({
          type: "POST",
          url: "../api/v1/auth/signup",
          data: {
            username:username,
            email:email,
            password:password,
            firstName:firstname,
            lastName:lastname
          }
        }).then(function(){
          this.get('session').authenticate('authenticator:custom', {username: username, password: password});
        }.bind(this));
      }
    }
  }

});
