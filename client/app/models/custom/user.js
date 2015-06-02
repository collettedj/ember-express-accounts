//import DS from 'ember-data';

export default function(model){
	model.reopen({
		fullName: function(){
			return "%@ %@".fmt(this.get('firstName'), this.get('lastName'));
		}.property('firstName', 'lastName'),	
	});
}
