import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  //coalesceFindRequests: true,   // these blueprints support coalescing (reduces the amount of requests)
  namespace: 'api/v1',               // same as API prefix in Sails config
  //host: 'https://localhost:1337', // Sails server,
  //ajax: function(url, method, hash){
  //  hash = hash || {};
  //  hash.crossDomain = true;
  //  hash.xhrFields = {withCredentials: true};
  //  return this._super(url, method, hash);
  //}	
	queryRecord: function(store, typeClass, query) {
		var url = this.urlForFindRecord(query.id, typeClass.typeKey);

		delete query.id;

		return new Ember.RSVP.Promise(function(resolve, reject) {
			jQuery.getJSON(url, query).then(function(data) {
				Ember.run(null, resolve, data);
			}, function(jqXHR) {
				jqXHR.then = null; // tame jQuery's ill mannered promises
				Ember.run(null, reject, jqXHR);
			});
	});
	}
});
