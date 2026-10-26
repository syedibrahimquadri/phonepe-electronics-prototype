// Review and pay, and the order-placed screen.

import { getShop } from './catalog.js';
import { EXCHANGE_CREDIT, PROTECTION_FEE, formatINR, monthlyInstalment } from './pricing.js';
import { state } from './state.js';
import { currentTotal } from './product.js';

const $ = (id) => document.getElementById(id);

const line = (label, value, extra = '') =>
  `<div class="line ${extra}"><span>${label}</span><span class="num">${value}</span></div>`;

function payButtonLabel(total) {
  if (state.payment === 'emi') return `Confirm EMI of ${formatINR(monthlyInstalment(total, state.months))} a month`;
  if (state.payment === 'later') return `Pay ${formatINR(total)} in 30 days`;
  return `Pay ${formatINR(total)}`;
}

export function renderCheckout() {
  const product = state.product;
  const shop = getShop(product);
  const total = currentTotal();
  const pickup = state.fulfilment === 'pickup';

  $('sum').innerHTML = [
    line(product.name, formatINR(product.price)),
    state.protect ? line('Screen and damage protection', formatINR(PROTECTION_FEE)) : '',
    state.exchange ? line('Exchange (checked at the shop)', formatINR(-EXCHANGE_CREDIT)) : '',
    line(pickup ? `Pickup at ${shop.name}` : 'Delivery tomorrow', 'Free'),
    line('Total', formatINR(total), 'total'),
  ].join('');

  $('payEmiLbl').textContent = `No-cost EMI, ${formatINR(monthlyInstalment(total, state.months))} a month × ${state.months}`;
  document.querySelectorAll('.pay-opt').forEach((option) => {
    option.setAttribute('aria-checked', String(option.dataset.p === state.payment));
  });
  $('payBtn').textContent = payButtonLabel(total);

  // Order placed
  $('doneMsg').textContent = pickup
    ? `Your ${product.name} will be ready at ${shop.name} after 4 pm today.`
    : `Your ${product.name} will arrive tomorrow by 8 pm.`;
  $('pickAddr').textContent = `${shop.name}, ${shop.address}. Open until 9:30 pm.`;
  $('pickupCard').hidden = !pickup;
}

export function initCheckout() {
  $('payOpts').addEventListener('click', (event) => {
    const option = event.target.closest('.pay-opt');
    if (!option) return;
    state.payment = option.dataset.p;
    renderCheckout();
  });
}
