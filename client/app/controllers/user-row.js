import Ember from 'ember';

export default Ember.Controller.extend({
	isEditing:false,

	saveDisabled: Ember.computed.not('isEditing'),

	actions:{
		saveUser: function(){
			var user = this.get('model');
			user.save();
		}
	}
});
