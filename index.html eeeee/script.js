const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('nav-open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

navItems.forEach(item => {
  item.addEventListener('click', () => {
    if (navLinks.classList.contains('nav-open')) {
      navLinks.classList.remove('nav-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const name = contactForm.querySelector('[name="name"]')?.value?.trim() || '';
    const email = contactForm.querySelector('[name="email"]')?.value?.trim() || '';
    const company = contactForm.querySelector('[name="company"]')?.value?.trim() || '';
    const message = contactForm.querySelector('[name="message"]')?.value?.trim() || '';
    const subject = encodeURIComponent(`EmmaTech Inquiry from ${name || 'a new lead'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${message}`);
    window.location.href = `mailto:hello@emmtech.com?subject=${subject}&body=${body}`;
  });
}
