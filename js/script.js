/**
 * Courage To Rise Charity - Part 3 JavaScript
 * Student: Makosha Dorcus Shudai Mamphekgo | ST10534919
 * Features: Mobile nav, form validation, dynamic content, search, lightbox, map, animations
 */

document.addEventListener('DOMContentLoaded', function () {

  // ===== Mobile Navigation Toggle =====
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('open');
    });
  }

  // ===== Accordion (About / Services) =====
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function () {
      const item = this.parentElement;
      const isOpen = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });

  // ===== Dynamic Services + Search =====
  const servicesData = [
  {
    title: "Educational Programs about Fear",
    category: "education",
    description: "Workshops and talks that help young people from townships and rural areas understand and overcome fear of failure, judgment and the unknown.",
    image: "images/Work.JPG"
  },
  {
    title: "Donation Drives",
    category: "donation",
    description: "Collection and distribution of clothes, food parcels and sanitary towels to orphanages and families in need.",
    image: "images/Lucia.JPG"
  },
  {
    title: "Confidence Building Workshops",
    category: "empowerment",
    description: "Sessions that empower young people to believe in themselves and pursue their dreams without limitations.",
    image: "images/Members.JPG"
  },
  {
    title: "Community Support & Outreach",
    category: "community",
    description: "Working with local partners such as MMR Bakery and community members to reach more beneficiaries.",
    image: "images/Charity home.JPG"
  },
  {
    title: "Sanitary Towel Project",
    category: "donation",
    description: "Providing sanitary towels so that girls do not miss school or feel ashamed because of lack of resources.",
    image: "images/67eea97a-1eb4-4d6e-b303-c966ac4514ad.JPG"
  },
  {
    title: "Youth Mentorship",
    category: "empowerment",
    description: "One-on-one and group mentorship for young people who need guidance and encouragement.",
    image: "images/8ffe0e62-37c6-49a1-a1b2-9abc603f2eb1.JPG"
  }
];

  const servicesContainer = document.getElementById('servicesContainer');
  const searchInput = document.getElementById('serviceSearch');

  function renderServices(list) {
    if (!servicesContainer) return;
    if (list.length === 0) {
      servicesContainer.innerHTML = '<p class="no-results">No services match your search.</p>';
      return;
    }
   servicesContainer.innerHTML = list.map(s => `
  <div class="service-card">
    <img src="${s.image}" alt="${s.title}" class="service-card-img" loading="lazy">
    <div class="service-card-body">
      <span class="badge">${s.category}</span>
      <h3>${s.title}</h3>
      <p>${s.description}</p>
    </div>
  </div>
`).join('');
  }

  if (servicesContainer) {
    renderServices(servicesData);

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        const term = this.value.toLowerCase().trim();
        const filtered = servicesData.filter(s =>
          s.title.toLowerCase().includes(term) ||
          s.description.toLowerCase().includes(term) ||
          s.category.toLowerCase().includes(term)
        );
        renderServices(filtered);
      });
    }
  }

// ===== Simple Lightbox for Gallery =====
document.querySelectorAll('.gallery-item').forEach(img => {
  img.addEventListener('click', function () {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
      <div class="lightbox-content">
        <img src="${this.src}" alt="${this.alt || 'Enlarged image'}">
        <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
      </div>
    `;
    document.body.appendChild(overlay);

    const close = () => overlay.remove();
    overlay.querySelector('.lightbox-close').onclick = close;
    overlay.onclick = (e) => { if (e.target === overlay) close(); };
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
    });
  });
});

// ===== Team Card Modal =====
const teamCard = document.getElementById('teamCard');
const teamModal = document.getElementById('teamModal');
const teamModalClose = document.querySelector('.team-modal-close');

if (teamCard && teamModal) {
  teamCard.addEventListener('click', function () {
    teamModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  if (teamModalClose) {
    teamModalClose.addEventListener('click', function () {
      teamModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Close when clicking outside the modal content
  teamModal.addEventListener('click', function (e) {
    if (e.target === teamModal) {
      teamModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && teamModal.classList.contains('open')) {
      teamModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}
// ===== Team Slider (Swipeable) =====
(function () {
  const slides = document.querySelectorAll('.team-slider .slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const track = document.querySelector('.slider-track');

  if (!slides.length) return;

  let current = 0;
  let startX = 0;
  let isDragging = false;

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    current = index;

    slides.forEach((s, i) => s.classList.toggle('active', i === current));
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => showSlide(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showSlide(current + 1));

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      showSlide(parseInt(dot.dataset.index, 10));
    });
  });

  // Touch / swipe support
  if (track) {
    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) showSlide(current + 1);
        else showSlide(current - 1);
      }
      isDragging = false;
    }, { passive: true });
  }
})();
// ===== Form Validation - Enquiry =====
const enquiryForm = document.getElementById('enquiryForm');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    // Clear previous errors
    this.querySelectorAll('.error-message').forEach(el => el.remove());
    this.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

    const name = this.querySelector('#fullName');
    const email = this.querySelector('#email');
    const phone = this.querySelector('#phone');
    const type = this.querySelector('#enquiryType');
    const message = this.querySelector('#message');

    function showError(input, msg) {
      valid = false;
      input.classList.add('error');
      const span = document.createElement('span');
      span.className = 'error-message';
      span.textContent = msg;
      input.parentNode.appendChild(span);
    }

    if (!name.value.trim() || name.value.trim().length < 2) {
      showError(name, 'Please enter your full name (at least 2 characters).');
    }
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError(email, 'Please enter a valid email address.');
    }
    if (phone.value.trim() && !/^(\+27|0)[0-9]{9}$/.test(phone.value.replace(/\s/g, ''))) {
      showError(phone, 'Please enter a valid South African phone number.');
    }
    if (!type.value) {
      showError(type, 'Please select the type of enquiry.');
    }
    if (!message.value.trim() || message.value.trim().length < 15) {
      showError(message, 'Please write a message of at least 15 characters.');
    }

    if (valid) {
      // Build mailto
      const subject = encodeURIComponent(`Enquiry: ${type.options[type.selectedIndex].text} - ${name.value.trim()}`);
      const body = encodeURIComponent(
        `Full Name: ${name.value.trim()}\n` +
        `Email: ${email.value.trim()}\n` +
        `Phone: ${phone.value.trim() || 'Not provided'}\n` +
        `Type of Enquiry: ${type.options[type.selectedIndex].text}\n\n` +
        `Message:\n${message.value.trim()}`
      );

      // Open email client
      window.location.href = `mailto:mamphekgonthabiseng@gmail.com?subject=${subject}&body=${body}`;

      // Show success message
      const responseBox = document.getElementById('enquiryResponse');
      if (responseBox) {
        responseBox.innerHTML = `
          <div class="success-box">
            <h3>Thank you, ${name.value.trim()}!</h3>
            <p>Your email client should now open with the enquiry ready to send. Please click <strong>Send</strong> in your email app.</p>
            <p>We will respond within 2 working days.</p>
            <p><strong>Reference:</strong> ENQ-${Date.now().toString().slice(-6)}</p>
          </div>
        `;
        responseBox.scrollIntoView({ behavior: 'smooth' });
      }
      enquiryForm.reset();
    }
  });
}
// ===== Form Validation - Contact =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    this.querySelectorAll('.error-message').forEach(el => el.remove());
    this.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

    const name = this.querySelector('#contactName');
    const email = this.querySelector('#contactEmail');
    const subject = this.querySelector('#subject');
    const message = this.querySelector('#contactMessage');

    function showError(input, msg) {
      valid = false;
      input.classList.add('error');
      const span = document.createElement('span');
      span.className = 'error-message';
      span.textContent = msg;
      input.parentNode.appendChild(span);
    }

    if (!name.value.trim() || name.value.trim().length < 2) showError(name, 'Please enter your full name.');
    if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) showError(email, 'Please enter a valid email.');
    if (!subject.value.trim() || subject.value.trim().length < 5) showError(subject, 'Please enter a subject.');
    if (!message.value.trim() || message.value.trim().length < 15) showError(message, 'Please write a message of at least 15 characters.');

    if (valid) {
      // Build mailto
      const mailSubject = encodeURIComponent(subject.value.trim());
      const body = encodeURIComponent(
        `Full Name: ${name.value.trim()}\n` +
        `Email: ${email.value.trim()}\n\n` +
        `Message:\n${message.value.trim()}`
      );

      // Open email client
      window.location.href = `mailto:mamphekgonthabiseng@gmail.com?subject=${mailSubject}&body=${body}`;

      // Show success message
      const responseBox = document.getElementById('contactResponse');
      if (responseBox) {
        responseBox.innerHTML = `
          <div class="success-box">
            <h3>Message Ready to Send!</h3>
            <p>Thank you, ${name.value.trim()}. Your email client should now open with the message ready. Please click <strong>Send</strong>.</p>
            <p><strong>Reference:</strong> MSG-${Date.now().toString().slice(-6)}</p>
          </div>
        `;
        responseBox.scrollIntoView({ behavior: 'smooth' });
      }
      contactForm.reset();
    }
  });
}
  // ===== Leaflet Map (Contact page) =====
  if (document.getElementById('map') && typeof L !== 'undefined') {
    // Approximate Tembisa / Johannesburg area
    const map = L.map('map').setView([-26.0105, 28.2200], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([-26.0105, 28.2200])
      .addTo(map)
      .bindPopup('<strong>Courage To Rise Charity</strong><br>Tembisa / Johannesburg area')
      .openPopup();
  }

});
// ===== Visitor & Interaction Counter =====
(function () {
  // Unique visitor (once per browser)
  let visitors = parseInt(localStorage.getItem('ctr_visitors') || '0', 10);
  if (!localStorage.getItem('ctr_visited')) {
    visitors += 1;
    localStorage.setItem('ctr_visitors', visitors);
    localStorage.setItem('ctr_visited', 'yes');
  }

  // Interactions (clicks on important elements)
  let interactions = parseInt(localStorage.getItem('ctr_interactions') || '0', 10);

  function updateDisplay() {
    const vEl = document.getElementById('visitorCount');
    const iEl = document.getElementById('interactionCount');
    if (vEl) vEl.textContent = 'Visitors: ' + visitors;
    if (iEl) iEl.textContent = 'Interactions: ' + interactions;
  }

  updateDisplay();

  // Count meaningful interactions
  document.addEventListener('click', function (e) {
    const target = e.target;
    if (
      target.closest('a') ||
      target.closest('button') ||
      target.closest('.team-card') ||
      target.closest('.gallery-item') ||
      target.closest('.btn') ||
      target.closest('form')
    ) {
      interactions += 1;
      localStorage.setItem('ctr_interactions', interactions);
      updateDisplay();
    }
  });
})();
