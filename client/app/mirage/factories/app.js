import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
	_id: (i) => `${i}`,
	name: (i) => `App ${i}`
});