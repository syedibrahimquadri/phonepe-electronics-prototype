// Mobiles & Tablets: subcategory chips, budget filter and the product list.

import { PRODUCTS, BUDGETS, getBudget, getShop } from '../data/catalog.js';
import { filterProducts, formatINR, monthlyInstalment, DEFAULT_EMI_TERM } from '../pricing.js';
import { state } from '../state.js';

const $ = (id) => document.getElementById(id);

function productCard(product) {
  const shop = getShop(product);
  const deviceClass = product.form === 'tablet' ? 'tab' : '';
  return `
    <button class="prod" data-pid="${product.id}">
      <span class="dev"><i class="${deviceClass}" style="--scr:${product.screen}"></i></span>
      <span>
        <span class="nm">${product.name}</span>
        <span class="spec">${product.spec}</span>
        <span class="price num">${formatINR(product.price)}<span class="mrp">${formatINR(product.mrp)}</span></span>
        <span class="emi">or ${formatINR(monthlyInstalment(product.price, DEFAULT_EMI_TERM))} a month for ${DEFAULT_EMI_TERM} months</span>
        <span class="tag go">Pick up today · ${shop.distance}</span>
      </span>
    </button>`;
}

function syncChips() {
  document.querySelectorAll('#chips .chip').forEach((chip) => {
    chip.setAttribute('aria-pressed', String(chip.dataset.sub === state.subcategory));
  });
}

export function renderCategory() {
  const budget = getBudget(state.budgetId);
  const list = filterProducts(PRODUCTS, { subcategory: state.subcategory, budget });

  $('budgetBtn').textContent = budget ? budget.label : 'Any budget';
  $('count').textContent = `${list.length} ${list.length === 1 ? 'product' : 'products'}`;
  syncChips();

  if (list.length === 0) {
    $('products').innerHTML =
      state.subcategory === 'acc'
        ? '<div class="empty">Chargers, cases and power banks arrive with launch.<br>Try another subcategory for now.</div>'
        : '<div class="empty">Nothing in this budget yet. Tap the budget filter to widen it.</div>';
    return;
  }
  $('products').innerHTML = list.map(productCard).join('');
}

/** Open the category screen with a fresh filter (from a category tile or a budget band). */
export function enterCategory({ budgetId = null } = {}) {
  state.budgetId = budgetId;
  state.subcategory = 'all';
  renderCategory();
}

/** @param {{ onOpenProduct: (id: string) => void }} handlers */
export function initCategory({ onOpenProduct }) {
  $('chips').addEventListener('click', (event) => {
    const chip = event.target.closest('.chip');
    if (!chip) return;
    state.subcategory = chip.dataset.sub;
    renderCategory();
  });

  // The filter button cycles: any budget -> each band -> any budget.
  $('budgetBtn').addEventListener('click', () => {
    const cycle = [null, ...BUDGETS.map((b) => b.id)];
    state.budgetId = cycle[(cycle.indexOf(state.budgetId) + 1) % cycle.length];
    renderCategory();
  });

  $('products').addEventListener('click', (event) => {
    const card = event.target.closest('.prod');
    if (card) onOpenProduct(card.dataset.pid);
  });

  renderCategory();
}
