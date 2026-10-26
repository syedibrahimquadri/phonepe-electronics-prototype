import './index.css';

import { getProduct } from './catalog.js';
import { initNavigation, show } from './navigation.js';
import { state } from './state.js';
import { enterCategory, initCategory } from './category.js';
import { initProduct, renderProduct } from './product.js';
import { initCheckout, renderCheckout } from './checkout.js';
import { initFitToScreen } from './fit.js';

function renderOrder() {
  renderProduct();
  renderCheckout();
}

initNavigation({
  beforeShow(screenId) {
    // A category tile always opens the list unfiltered.
    if (screenId === 'cat') enterCategory();
  },
});

initCategory({
  onOpenProduct(id) {
    state.product = getProduct(id);
    renderOrder();
    show('pdp');
  },
});

// Budget bands on the store home open the list pre-filtered.
document.querySelectorAll('[data-budget]').forEach((band) => {
  band.addEventListener('click', () => {
    enterCategory({ budgetId: band.dataset.budget });
    show('cat');
  });
});

initProduct({ onChange: renderOrder });
initCheckout();
renderOrder();
initFitToScreen();
