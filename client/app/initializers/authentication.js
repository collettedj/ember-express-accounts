// app/initializers/authentication.js
import CustomAuthenticator from '../authenticators/custom';

export default {
  name:       'authentication',
  before:     'simple-auth',
  initialize: function(container, application) {
    container.register('authenticator:custom', CustomAuthenticator);
    console.log(application);
  }
};
