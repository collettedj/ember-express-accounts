import { moduleForModel, test } from 'ember-qunit';

moduleForModel('app-role', 'Unit | Model | app role', {
  // Specify the other units that are required for this test.
  needs: ['model:app']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
