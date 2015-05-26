import Ember from 'ember';

export default Ember.Component.extend({
	app:null,

	actions:{
		saveApp: function(){
			var app = this.get('app');
			app.save();
		}
	}
});
