import { PRODUCTS } from './catalog.js';
import { DEFAULT_EMI_TERM } from './pricing.js';

// One shared, mutable state object for the whole prototype.
export const state = {
  subcategory: 'all', // chip on the category screen
  budgetId: null, // budget band id, or null for any budget
  product: PRODUCTS[0], // product open on the product page
  months: DEFAULT_EMI_TERM,
  protect: true,
  exchange: false,
  fulfilment: 'pickup', // 'pickup' | 'deliver'
  payment: 'emi', // 'emi' | 'upi' | 'later'
};
