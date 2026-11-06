import test from 'node:test';
import assert from 'node:assert/strict';
import { ECOSYSTEM_PRODUCTS } from '../lib/ecosystem.ts';
test('Pocket Studio separates public packages from the production workspace', () => {
  const product = ECOSYSTEM_PRODUCTS.find(product => product.id === 'pocket-studio');
  assert.equal(product.action.label, 'Explore Pocket Studio');
  const publicUrl = new URL(product.action.href);
  assert.equal(publicUrl.origin, 'https://openhousefx-pocket-studio.onrender.com');
  assert.equal(publicUrl.searchParams.get('package'), 'Essential Listing Kit');
  assert.equal(publicUrl.searchParams.get('view'), 'staging');
  assert.equal(publicUrl.hash, '#packages');
  assert.equal(product.secondaryAction.href, 'https://openhousefx-pocket-studio.onrender.com/studio');
});
test('product order and other application actions remain unchanged', () => {
  assert.deepEqual(ECOSYSTEM_PRODUCTS.map(product => product.id), ['alphacompanion', 'pocket-studio', 'lead-verifier', 'scraper-ultra']);
  assert.equal(ECOSYSTEM_PRODUCTS[0].action.href, 'https://crm.openhousefx.com/test-environment/');
  assert.ok(ECOSYSTEM_PRODUCTS.filter(product => product.id !== 'pocket-studio').every(product => !product.secondaryAction));
});
