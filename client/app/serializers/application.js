import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    //primaryKey: '_id',
   keyForRelationship: function(key, relationship, method) {
   		if(relationship === "belongsTo"){
   			return key + "Id";
   		}else{
   			return key;
   		}
   }    
});
