const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const yearEl = document.getElementById('year');
const form = document.getElementById('preorderForm');
const confirmEl = document.getElementById('confirm');

if (yearEl) yearEl.textContent = String(new Date().getFullYear());

menuBtn?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

for (const link of document.querySelectorAll('.nav-links a')) {
  link.addEventListener('click', () => navLinks?.classList.remove('open'));
}

const io = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    }
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  confirmEl.textContent = "You're on the list.";
  form.reset();
});
