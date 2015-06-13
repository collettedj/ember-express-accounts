/* global QUnit */
import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

QUnit.config.testTimeout = 6000;

setResolver(resolver);
