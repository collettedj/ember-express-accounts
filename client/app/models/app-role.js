import DS from 'ember-data';

export default DS.Model.extend({
 	app: DS.belongsTo('app'),
 	role: DS.belongsTo('role')
});
