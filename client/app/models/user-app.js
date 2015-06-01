import DS from 'ember-data';

import customModel from './custom/user-app';

var UserApp = DS.Model.extend({
		user:DS.belongsTo('user'), 
		app:DS.belongsTo('app'), 
		name:DS.attr('string'), 
		description:DS.attr('string'), 
		createdAt:DS.attr('date'), 
		updatedAt:DS.attr('date'), 
 
});

customModel(UserApp);

export default UserApp;
