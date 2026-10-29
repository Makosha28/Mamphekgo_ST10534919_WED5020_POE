/*
   Courage To Rise Charity - JavaScript
   Student: Makosha Dorcus Shudai Mamphekgo | ST10534919
   WEDE5020 Part 3 – Form validation, mobile nav, light interactivity
*/

document.addEventListener('DOMContentLoaded', function () {
    // ----- Mobile navigation toggle -----
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('header nav');

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            nav.classList.toggle('open');
            const expanded = nav.classList.contains('open');
            toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            toggle.textContent = expanded ? '✕' : '☰';
        });

        // Close menu when a link is clicked (mobile)
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 600) {
                    nav.classList.remove('open');
                    toggle.setAttribute('aria-expanded', 'false');
                    toggle.textContent = '☰';
                }
            });
        });
    }

    // Highlight current page in nav
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(function (link) {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ----- Form validation (enquiry & contact) -----
    const forms = document.querySelectorAll('form.needs-validation');

    forms.forEach(function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            let isValid = true;

            // Clear previous errors
            form.querySelectorAll('.form-group').forEach(function (group) {
                group.classList.remove('invalid');
            });

            // Required text / email / tel fields
            form.querySelectorAll('[required]').forEach(function (field) {
                const group = field.closest('.form-group');
                const value = field.value.trim();

                if (!value) {
                    isValid = false;
                    if (group) group.classList.add('invalid');
                    return;
                }

                // Email pattern
                if (field.type === 'email') {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(value)) {
                        isValid = false;
                        if (group) group.classList.add('invalid');
                    }
                }

                // Phone (basic SA-friendly check)
                if (field.type === 'tel') {
                    const phonePattern = /^[\d\s\+\-\(\)]{8,}$/;
                    if (!phonePattern.test(value)) {
                        isValid = false;
                        if (group) group.classList.add('invalid');
                    }
                }
            });

            // Select required
            form.querySelectorAll('select[required]').forEach(function (select) {
                if (!select.value) {
                    isValid = false;
                    const group = select.closest('.form-group');
                    if (group) group.classList.add('invalid');
                }
            });

            if (isValid) {
                // Show success message
                const success = form.querySelector('.form-success');
                if (success) {
                    success.style.display = 'block';
                    success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
                form.reset();

                // Optional: hide success after a few seconds
                setTimeout(function () {
                    if (success) success.style.display = 'none';
                }, 6000);
            } else {
                // Focus first invalid field
                const firstInvalid = form.querySelector('.form-group.invalid input, .form-group.invalid select, .form-group.invalid textarea');
                if (firstInvalid) firstInvalid.focus();
            }
        });
    });

    // Simple accordion for services / FAQ style sections (if present)
    document.querySelectorAll('.accordion-header').forEach(function (header) {
        header.addEventListener('click', function () {
            const item = header.parentElement;
            item.classList.toggle('open');
        });
    });
});
