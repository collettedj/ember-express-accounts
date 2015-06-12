import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params){
		return Ember.RSVP.hash({
			appRoles: this.store.find('app-role', {appId: params.app_id}),
			appUsers: this.store.find('app-user', {appId: params.app_id}),
			app: this.store.find('app', params.app_id)
		})
		.then(function(hash){
			return hash.app;
		});
	},

});
