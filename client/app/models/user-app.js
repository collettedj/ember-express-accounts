import DS from 'ember-data';

export default DS.Model.extend({
		id:DS.attr('number'), 
		user:DS.belongsTo('user'), 
		app:DS.belongsTo('app'), 
		name:DS.attr('string'), 
		description:DS.attr('string'), 
		createdAt:DS.attr('date'), 
		updatedAt:DS.attr('date'), 
 
});
