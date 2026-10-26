import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS, BUDGETS, getBudget } from '../src/data/catalog.js';
import { filterProducts, formatINR, inBudget, monthlyInstalment, orderTotal } from '../src/pricing.js';

test('formatINR uses Indian digit grouping', () => {
  assert.equal(formatINR(12999), '₹12,999');
  assert.equal(formatINR(123456), '₹1,23,456');
  assert.equal(formatINR(-3000), '−₹3,000');
});

test('orderTotal adds protection and subtracts exchange credit', () => {
  assert.equal(orderTotal(19499), 19499);
  assert.equal(orderTotal(19499, { protect: true }), 19998);
  assert.equal(orderTotal(19499, { protect: true, exchange: true }), 16998);
  assert.equal(orderTotal(1000, { exchange: true }), 0, 'never negative');
});

test('monthlyInstalment splits the total evenly and rejects bad terms', () => {
  assert.equal(monthlyInstalment(19998, 6), 3333);
  assert.equal(monthlyInstalment(12999, 9), 1444);
  assert.throws(() => monthlyInstalment(1000, 0), RangeError);
});

test('budget bands are exclusive at the bottom and inclusive at the top', () => {
  const band = getBudget('15-20');
  assert.equal(inBudget(15000, band), false);
  assert.equal(inBudget(15001, band), true);
  assert.equal(inBudget(20000, band), true);
  assert.equal(inBudget(99999, null), true);
});

test('every product falls in exactly one budget band', () => {
  for (const p of PRODUCTS) {
    assert.equal(BUDGETS.filter((b) => inBudget(p.price, b)).length, 1, p.name);
  }
});

test('filterProducts combines subcategory and budget', () => {
  const ids = (list) => list.map((p) => p.id);
  assert.deepEqual(ids(filterProducts(PRODUCTS, { subcategory: 'budget', budget: getBudget('u15') })), ['nova', 'kestrel']);
  assert.deepEqual(ids(filterProducts(PRODUCTS, { subcategory: 'gaming' })), ['orbit']);
  assert.equal(filterProducts(PRODUCTS, { subcategory: 'acc' }).length, 0);
});
