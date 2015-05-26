import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		createApp: function(){
			var newApp = this.store.createRecord('app', {
				name: 'new app',
				description: 'this is the new app'
			});
			newApp.save();
		}
	}
});
