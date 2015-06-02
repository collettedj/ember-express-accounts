import DS from 'ember-data';

import customModel from './custom/app-user';

var AppUser = DS.Model.extend({
		user:DS.belongsTo('user'), 
		app:DS.belongsTo('app'), 
		createdAt:DS.attr('date'), 
		updatedAt:DS.attr('date'), 
 
});

customModel(AppUser);

export default AppUser;
