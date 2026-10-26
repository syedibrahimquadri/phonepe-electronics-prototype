// Pure pricing and filtering logic. No DOM access, so it can be unit tested.

export const PROTECTION_FEE = 499;
export const EXCHANGE_CREDIT = 3000;
export const EMI_TERMS = [3, 6, 9];
export const DEFAULT_EMI_TERM = 6;

const inr = new Intl.NumberFormat('en-IN');

/** 12999 -> "₹12,999"; negative amounts get a proper minus sign. */
export function formatINR(amount) {
  const sign = amount < 0 ? '−' : '';
  return `${sign}₹${inr.format(Math.abs(Math.round(amount)))}`;
}

/** Order total after add-ons. Never below zero. */
export function orderTotal(price, { protect = false, exchange = false } = {}) {
  const total = price + (protect ? PROTECTION_FEE : 0) - (exchange ? EXCHANGE_CREDIT : 0);
  return Math.max(0, total);
}

/** No-cost EMI: the total split evenly across the term. */
export function monthlyInstalment(total, months) {
  if (!Number.isInteger(months) || months <= 0) throw new RangeError('months must be a positive integer');
  return Math.round(total / months);
}

/** A price belongs to a band when min < price <= max. A null band matches everything. */
export function inBudget(price, band) {
  if (!band) return true;
  return price > band.min && price <= band.max;
}

/** Products matching a subcategory chip ('all' for no filter) and an optional budget band. */
export function filterProducts(products, { subcategory = 'all', budget = null } = {}) {
  return products.filter(
    (p) => (subcategory === 'all' || p.subcategories.includes(subcategory)) && inBudget(p.price, budget),
  );
}
