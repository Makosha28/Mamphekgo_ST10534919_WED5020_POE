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
      description: "Workshops and talks that help young people from townships and rural areas understand and overcome fear of failure, judgment and the unknown."
    },
    {
      title: "Donation Drives",
      category: "donation",
      description: "Collection and distribution of clothes, food parcels and sanitary towels to orphanages and families in need."
    },
    {
      title: "Confidence Building Workshops",
      category: "empowerment",
      description: "Sessions that empower young people to believe in themselves and pursue their dreams without limitations."
    },
    {
      title: "Community Support & Outreach",
      category: "community",
      description: "Working with local partners such as MMR Bakery and community members to reach more beneficiaries."
    },
    {
      title: "Sanitary Towel Project",
      category: "donation",
      description: "Providing sanitary towels so that girls do not miss school or feel ashamed because of lack of resources."
    },
    {
      title: "Youth Mentorship",
      category: "empowerment",
      description: "One-on-one and group mentorship for young people who need guidance and encouragement."
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
        <h3>${s.title}</h3>
        <span class="badge">${s.category}</span>
        <p>${s.description}</p>
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
  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function () {
      const overlay = document.createElement('div');
      overlay.className = 'lightbox-overlay';
      overlay.innerHTML = `
        <div class="lightbox-content">
          <img src="${this.src}" alt="${this.alt}">
          <button class="lightbox-close" aria-label="Close">&times;</button>
        </div>
      `;
      document.body.appendChild(overlay);

      overlay.querySelector('.lightbox-close').onclick = () => overlay.remove();
      overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    });
  });

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
        // Success response
        const responseBox = document.getElementById('enquiryResponse');
        if (responseBox) {
          responseBox.innerHTML = `
            <div class="success-box">
              <h3>Thank you, ${name.value.trim()}!</h3>
              <p>Your enquiry has been received. We will respond within 2 working days with information about availability, next steps or how you can support Courage To Rise.</p>
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
        const responseBox = document.getElementById('contactResponse');
        if (responseBox) {
          responseBox.innerHTML = `
            <div class="success-box">
              <h3>Message Sent Successfully!</h3>
              <p>Thank you, ${name.value.trim()}. Your message has been compiled and will be sent to the Courage To Rise team.</p>
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
