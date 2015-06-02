import DS from 'ember-data';

import customModel from './custom/app';

var App = DS.Model.extend({
		name:DS.attr('string'), 
		description:DS.attr('string'), 
		createdAt:DS.attr('date'), 
		updatedAt:DS.attr('date'), 
		appRoles: DS.hasMany('app-role', {inverse:'app'}), 
});

customModel(App);

export default App;
