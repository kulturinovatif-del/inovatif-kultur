'use strict';

const menuButton = document.getElementById('menu-button');
const navigation = document.getElementById('navigation');

function setMenuOpen(open) {
  navigation.classList.toggle('open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Menüyü kapat' : 'Menüyü aç');
  menuButton.textContent = open ? '×' : '☰';
}

menuButton.addEventListener('click', () => {
  setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenuOpen(false);
});

document.getElementById('year').textContent = String(new Date().getFullYear());

document.getElementById('contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const fields = ['name', 'organization', 'contact', 'area', 'message'];
  for (const field of fields) {
    const input = form.elements.namedItem(field);
    if (!String(data.get(field)).trim()) {
      input.setCustomValidity('Lütfen bu alanı doldurun.');
      input.reportValidity();
      input.addEventListener('input', () => input.setCustomValidity(''), { once: true });
      return;
    }
  }
  const subject = `İnovatif Kültür — ${data.get('area')}`;
  const body = [
    `Ad Soyad: ${String(data.get('name')).trim()}`,
    `Kurum / Üniversite / Alan: ${String(data.get('organization')).trim()}`,
    `E-posta veya Telefon: ${String(data.get('contact')).trim()}`,
    `İlgilendiğiniz Alan: ${data.get('area')}`,
    '',
    'Mesaj / Talep Detayı:',
    String(data.get('message')).trim()
  ].join('\n');
  document.getElementById('form-status').textContent = 'E-posta taslağı açılıyor. Talebinizi iletmek için e-posta uygulamanızda gönderin.';
  window.location.href = `mailto:kulturinovatif@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
