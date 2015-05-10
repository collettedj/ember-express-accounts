import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  username: DS.attr('string'),
  email: DS.attr('string'),

  fullName: function(){
  	return "%@ %@".fmt(this.get('firstName'), this.get('lastName'));
  }.property('firstName', 'lastName'),
});
