// Screen stack with slide transitions, plus the guide rail that jumps between steps.

export const FLOW = ['home', 'store', 'cat', 'pdp', 'pay', 'done'];

const $ = (id) => document.getElementById(id);
let stack = ['home'];

export const currentScreen = () => stack[stack.length - 1];

function syncRail() {
  const current = currentScreen();
  document.querySelectorAll('#steps button').forEach((button) => {
    if (button.dataset.go === current) button.setAttribute('aria-current', 'step');
    else button.removeAttribute('aria-current');
  });
}

/** Slide forward to a screen, or back to the previous one. */
export function show(id, { back = false } = {}) {
  const current = currentScreen();
  if (id === current) return;
  const from = $(current);
  const to = $(id);

  if (back) {
    from.classList.add('off-right');
    from.classList.remove('off-left');
    to.classList.remove('off-left', 'off-right');
    stack.pop();
  } else {
    to.classList.remove('off-right', 'off-left');
    to.scrollTop = 0;
    from.classList.add('off-left');
    stack.push(id);
  }
  syncRail();
}

export function goBack() {
  show(stack[stack.length - 2] ?? 'home', { back: true });
}

/** Jump straight to a step, rebuilding the stack along the main flow so Back still works. */
export function jump(id) {
  const index = FLOW.indexOf(id);
  stack = FLOW.slice(0, index + 1);
  FLOW.forEach((screenId, i) => {
    const el = $(screenId);
    el.classList.remove('off-left', 'off-right');
    if (i < index) el.classList.add('off-left');
    else if (i > index) el.classList.add('off-right');
  });
  $(id).scrollTop = 0;
  syncRail();
}

/**
 * Wire up rail buttons, back buttons and in-screen links.
 * @param {{ beforeShow?: (id: string, trigger: HTMLElement) => void }} hooks
 */
export function initNavigation({ beforeShow } = {}) {
  document.querySelectorAll('#steps button').forEach((button) => {
    button.addEventListener('click', () => jump(button.dataset.go));
  });

  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-back]')) {
      goBack();
      return;
    }
    const link = event.target.closest('.screen [data-go]');
    if (!link) return;
    if (link.hasAttribute('data-reset')) {
      jump('home');
      return;
    }
    beforeShow?.(link.dataset.go, link);
    show(link.dataset.go);
  });

  syncRail();
}
