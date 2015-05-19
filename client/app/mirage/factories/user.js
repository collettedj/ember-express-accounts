import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
	_id: (i) => `${i}`,
	firstName: (i) => `firstName${i}`,
	lastName: (i) => `lastName${i}`,
	username: (i) => `username${i}`,
	email: (i) => `email${i}`,
});