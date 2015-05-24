import Ember from 'ember';

export default Ember.ArrayController.extend({
	itemController:"user-row",

	actions: {
		addUser: function(){
			this.store.createRecord('user');
		}, 

		deleteUser: function(user){
			user.destroyRecord()
				.catch(function(){
					user.rollback();
				});			
		}, 

		saveUser: function(user){
			user.save();
		}
	}
});
