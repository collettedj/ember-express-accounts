import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {


  actions:{
    endSession:function(){
      this.get('session').invalidate();
    }

    //authorizationFailed: function(){
    //  console.log('Got an error');
    //},



  }
});

