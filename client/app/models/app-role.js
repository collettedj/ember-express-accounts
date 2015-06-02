import DS from 'ember-data';

import customModel from './custom/app-role';

var AppRole = DS.Model.extend({
		app:DS.belongsTo('app'), 
		name:DS.attr('string'), 
		description:DS.attr('string'), 
		createdAt:DS.attr('date'), 
		updatedAt:DS.attr('date'), 
});

customModel(AppRole);

export default AppRole;
