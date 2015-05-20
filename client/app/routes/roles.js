import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params){
		return this.store.find('app-role', {appId: params.app_id});
	}
});
