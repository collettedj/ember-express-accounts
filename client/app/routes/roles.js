import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params){
		return Ember.RSVP.hash({
			appRoles: this.store.find('app-role', {appId: params.app_id}),
			app: this.store.find('app', params.app_id)
		});
	},

	setupController: function(controller, model){
		controller.set('model', model.appRoles);
		controller.set('app', model.app);
	}
});
