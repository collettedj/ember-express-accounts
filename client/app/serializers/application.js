import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
	isNewSerializerAPI: true,
    //primaryKey: '_id',
   // keyForRelationship: function(key, relationship) {
   // 		if(relationship === "belongsTo"){
   // 			return key + "Id";
   // 		}else{
   // 			return key;
   // 		}
   // }    
});
