const topbar = document.querySelector('.topbar');
const menuToggle = document.querySelector('.menu-toggle');
const heroPanel = document.querySelector('#hero-panel');
const heroTitle = document.querySelector('#hero-title');
const heroDescription = document.querySelector('#hero-description');
const heroChip = document.querySelector('#hero-chip');
const heroCards = document.querySelectorAll('.hero-card');
const revealItems = document.querySelectorAll('.reveal');
const form = document.querySelector('#contact-form');
const popup = document.querySelector('#popup');
const popupClose = document.querySelector('.popup__close');
const serviceItems = document.querySelectorAll('.service-item');

window.addEventListener('scroll', () => {
  topbar.classList.toggle('is-scrolled', window.scrollY > 8);
});

menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  document.body.classList.toggle('menu-open');
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    document.body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

heroCards.forEach((card) => {
  card.addEventListener('click', () => {
    heroCards.forEach((item) => item.classList.remove('is-active'));
    card.classList.add('is-active');
    heroPanel.dataset.theme = card.dataset.theme;
    heroTitle.textContent = card.dataset.title;
    heroDescription.textContent = card.dataset.description;
    heroChip.textContent = card.dataset.chip;
  });
});

serviceItems.forEach((item) => {
  item.addEventListener('mouseenter', () => {
    serviceItems.forEach((entry) => entry.classList.remove('is-selected'));
    item.classList.add('is-selected');
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => observer.observe(item));

const openPopup = () => {
  popup.classList.add('is-visible');
  popup.setAttribute('aria-hidden', 'false');
};

const closePopup = () => {
  popup.classList.remove('is-visible');
  popup.setAttribute('aria-hidden', 'true');
};

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  form.reset();
  openPopup();
});

popupClose?.addEventListener('click', closePopup);
popup?.addEventListener('click', (event) => {
  if (event.target === popup) closePopup();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closePopup();
});
