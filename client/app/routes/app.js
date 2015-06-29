import Ember from 'ember';

export default Ember.Route.extend({
	model: function(params){
		var self = this;
			return self.store.queryRecord('app', {id:params.app_id , include: "app-roles,app-users"});	
	},

});
