import Ember from 'ember';

export default Ember.Controller.extend({
	isEditing:false,

	saveDisabled: Ember.computed.not('isEditing'),

	initUserRow: function(){
		var isNew = this.get('model.isNew');
		if(isNew){
			this.set('isEditing', true);
		}
	}.on('init'),

	actions:{
		saveUser: function(){
			var user = this.get('model');
			user.save()
				.catch(function(){
					user.rollback();
				});

		}
	}
});
