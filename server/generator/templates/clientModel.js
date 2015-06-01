import DS from 'ember-data';

export default DS.Model.extend({
<% 	_.forEach(model.attributes, function(attr){  
		if(!!attr.references){
%>		<%-getEmberAttrName(attr)%>:DS.belongsTo('<%-getEmberModelName(attr)%>'), 
<% 
		} else {
%>		<%-getEmberAttrName(attr)%>:DS.attr('<%-getEmberType(attr.type.key)%>'), 
<% 
		}
	}); 
%> 
});
