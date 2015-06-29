import DS from 'ember-data';

import customModel from './custom/app';

var App = DS.Model.extend({
		name:DS.attr('string'), 
		description:DS.attr('string'), 
		createdAt:DS.attr('date'), 
		updatedAt:DS.attr('date'), 
		appRoles: DS.hasMany('app-role', {inverse:'app', async: true}), 
		appUsers: DS.hasMany('app-user', {inverse:'app', async: true}), 
});

customModel(App);

export default App;
