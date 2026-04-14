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
const popupLink = document.querySelector('#popup-link');
const serviceItems = document.querySelectorAll('.service-item');
const whatsappBase = 'https://wa.me/5511940518767';

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
    heroPanel.style.setProperty('--hero-image', `url('${card.dataset.image}')`);
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

const openPopup = (href = whatsappBase) => {
  popupLink.setAttribute('href', href);
  popup.classList.add('is-visible');
  popup.setAttribute('aria-hidden', 'false');
};

const closePopup = () => {
  popup.classList.remove('is-visible');
  popup.setAttribute('aria-hidden', 'true');
};

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const nome = formData.get('nome')?.toString().trim() || '';
  const empresa = formData.get('empresa')?.toString().trim() || 'Não informado';
  const telefone = formData.get('telefone')?.toString().trim() || '';
  const email = formData.get('email')?.toString().trim() || '';
  const produto = formData.get('produto')?.toString().trim() || '';
  const mensagem = formData.get('mensagem')?.toString().trim() || 'Olá! Gostaria de solicitar um orçamento.';

  const text = [
    'Olá! Vim pelo novo site da Chiller Peças.',
    `Nome: ${nome}`,
    `Empresa: ${empresa}`,
    `Telefone: ${telefone}`,
    `E-mail: ${email}`,
    `Produto de interesse: ${produto}`,
    `Mensagem: ${mensagem}`,
  ].join('\n');

  const href = `${whatsappBase}?text=${encodeURIComponent(text)}`;
  openPopup(href);
  window.open(href, '_blank', 'noopener,noreferrer');
  form.reset();
});

popupClose?.addEventListener('click', closePopup);
popup?.addEventListener('click', (event) => {
  if (event.target === popup) closePopup();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closePopup();
});
