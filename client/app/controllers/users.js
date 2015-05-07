import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		addUser: function(){
			var userRecord = this.store.createRecord('user');
			userRecord.save();
		}
	}
});
