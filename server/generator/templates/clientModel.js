import DS from 'ember-data';

import customModel from './custom/<%-getEmberModelName(model.name)%>';

var <%-model.name%> = DS.Model.extend({
<% 	_.forEach(model.attributes, function(attr){  
		if(attr.field.toLowerCase() !== "id"){
			if(!!attr.references){
%>		<%-getEmberAttrName(attr)%>:DS.belongsTo('<%-getEmberModelName(attr.references.model)%>'), 
<% 
			} else {
%>		<%-getEmberAttrName(attr)%>:DS.attr('<%-getEmberType(attr.type.key)%>'), 
<% 
			}
		}
	}); 
 	_.forEach(model.associations, function(assoc){  
		console.log({
			type: assoc.associationType,
			fk: assoc.foreignKey,
			source: assoc.source.name,
			target: assoc.target.name
		});
		if(assoc.associationType.toUpperCase() ==="HASMANY"){
%>		<%-getEmberModelHasManyName(assoc.target.name)%>: DS.hasMany('<%-getEmberModelName(assoc.target.name)%>', {inverse:'<%- getHasManyInverseName(assoc.foreignKey) %>'}), 
<% 		
		}
	}); 
%>});

customModel(<%-model.name%>);

export default <%-model.name%>;
