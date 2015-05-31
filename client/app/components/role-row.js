import Ember from 'ember';

export default Ember.Component.extend({
	isEditing:false,

	actions:{
		saveAppRole: function(){
			var appRole = this.get('appRole');
			appRole.save();
		},

		deleteAppRole: function(){
			var appRole = this.get('appRole');
			appRole.destroyRecord();
		}		
	}
});
