// Product page: EMI plans, add-ons and how you get it. Also keeps the bottom bar total in sync.

import { getShop } from './catalog.js';
import { formatINR, monthlyInstalment, orderTotal } from './pricing.js';
import { state } from './state.js';

const $ = (id) => document.getElementById(id);

export const currentTotal = () =>
  orderTotal(state.product.price, { protect: state.protect, exchange: state.exchange });

export function renderProduct() {
  const product = state.product;
  const shop = getShop(product);
  const total = currentTotal();

  $('pdpBar').textContent = product.form === 'tablet' ? 'Tablet' : 'Phone';
  $('pdpName').textContent = product.name;
  $('pdpSpec').textContent = product.spec;
  $('pdpPrice').textContent = formatINR(product.price);
  $('pdpStock').textContent = `In stock ${shop.distance} away`;

  const device = $('pdpDev').querySelector('i');
  device.className = product.form === 'tablet' ? 'tab' : '';
  device.style.setProperty('--scr', product.screen);

  document.querySelectorAll('.emi-opt').forEach((option) => {
    const months = Number(option.dataset.m);
    option.querySelector('b').textContent = formatINR(monthlyInstalment(total, months));
    option.setAttribute('aria-pressed', String(months === state.months));
  });

  $('protect').setAttribute('aria-checked', String(state.protect));
  $('exchange').setAttribute('aria-checked', String(state.exchange));
  document.querySelectorAll('.ful').forEach((option) => {
    option.setAttribute('aria-pressed', String(option.dataset.f === state.fulfilment));
  });
  $('fulShop').textContent = `${shop.name}, ${shop.distance}. Ready after 4 pm.`;

  $('totVal').textContent = formatINR(total);
  $('totLbl').textContent = `or ${formatINR(monthlyInstalment(total, state.months))} a month × ${state.months}`;
}

/** @param {{ onChange: () => void }} handlers  Called after any choice so dependent screens re-render. */
export function initProduct({ onChange }) {
  const update = (mutate) => {
    mutate();
    onChange();
  };

  $('emiOpts').addEventListener('click', (event) => {
    const option = event.target.closest('.emi-opt');
    if (option) update(() => (state.months = Number(option.dataset.m)));
  });
  $('protect').addEventListener('click', () => update(() => (state.protect = !state.protect)));
  $('exchange').addEventListener('click', () => update(() => (state.exchange = !state.exchange)));
  $('fulfil').addEventListener('click', (event) => {
    const option = event.target.closest('.ful');
    if (option) update(() => (state.fulfilment = option.dataset.f));
  });
}
