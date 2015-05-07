import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		addUser: function(){
			this.store.createRecord('user');
		}
	}
});
