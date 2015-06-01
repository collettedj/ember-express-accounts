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
%> 
});

customModel(<%-model.name%>);

export default <%-model.name%>;
