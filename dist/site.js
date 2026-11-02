const navigation = document.querySelector('#site-nav');
const menuButton = document.querySelector('.menu-toggle');

if (menuButton && navigation) {
  document.documentElement.classList.add('js-ready');
  const closeMenu = () => {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('span').textContent = '+';
  };
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    navigation.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.querySelector('span').textContent = open ? '−' : '+';
  });
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
  window.matchMedia('(min-width: 641px)').addEventListener('change', closeMenu);
}

const filters = document.querySelector('.filters');
if (filters) {
  const cards = [...document.querySelectorAll('[data-category]')];
  const status = document.querySelector('#filter-status');
  filters.hidden = false;
  filters.addEventListener('click', (event) => {
    const selected = event.target.closest('[data-filter]');
    if (!selected) return;
    filters.querySelectorAll('[data-filter]').forEach((button) => {
      const active = button === selected;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    const category = selected.dataset.filter;
    let count = 0;
    cards.forEach((card) => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
      if (!card.hidden) count += 1;
    });
    status.textContent = `${count} ${count === 1 ? 'piece' : 'pieces'} shown${category === 'all' ? '.' : ` in ${selected.textContent.trim()}.`}`;
  });
}

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});
