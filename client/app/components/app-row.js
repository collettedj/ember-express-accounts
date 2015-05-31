import Ember from 'ember';

export default Ember.Component.extend({
	app:null,

	isEditing: false,

	actions:{
		saveApp: function(){
			var app = this.get('app');
			app.save();
		},

		deleteApp: function(){
			var app = this.get('app');
			app.destroyRecord();
		}

	}
});
