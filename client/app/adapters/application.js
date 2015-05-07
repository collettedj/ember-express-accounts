import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  coalesceFindRequests: true,   // these blueprints support coalescing (reduces the amount of requests)
  namespace: 'api/v1',               // same as API prefix in Sails config
  //host: 'https://localhost:1337', // Sails server,
  //ajax: function(url, method, hash){
  //  hash = hash || {};
  //  hash.crossDomain = true;
  //  hash.xhrFields = {withCredentials: true};
  //  return this._super(url, method, hash);
  //}	
});
