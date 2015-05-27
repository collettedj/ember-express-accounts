import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('app-row', 'Unit | Component | app row', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
  needs: ['router:main']
});

test('it renders', function(assert) {
  assert.expect(1);

  // Creates the component instance
  var component = this.subject();

  Ember.run(function(){
	  component.set('app', Ember.Object.create({
	  	'id': "1",
	  	'name': "testname",
	  	'description': "testdescription"
	  }));	
  });
  

  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  //this.render();
  //assert.equal(component._state, 'inDOM');
});
