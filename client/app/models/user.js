import DS from 'ember-data';

import customModel from './custom/user';

var User = DS.Model.extend({
		username:DS.attr('string'), 
		password:DS.attr('string'), 
		email:DS.attr('string'), 
		firstName:DS.attr('string'), 
		lastName:DS.attr('string'), 
		createdAt:DS.attr('date'), 
		updatedAt:DS.attr('date'), 
 
});

customModel(User);

export default User;
