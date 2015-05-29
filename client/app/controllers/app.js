import Ember from 'ember';

export default Ember.Controller.extend({

	actions: {
		createAppRole: function(){
			var app = this.get('model');
			var newApp = this.store.createRecord('appRole', {
				app:app,
				name: "role name",
				description: "role description"
			});
			newApp.save();
		}
	}
});
