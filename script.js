/**
 * script.js — Portfolio JavaScript
 * Roshan M Maliakkal | 25MCA1028
 *
 * Features:
 *  1. Dark / Light mode toggle (localStorage persisted)
 *  2. Typing animation in hero tagline
 *  3. Animated skill bars on scroll (IntersectionObserver)
 *  4. Project category filter
 *  5. Contact form validation with real-time error messages
 *  6. Live character counter on message textarea
 *  7. Scroll-to-top button
 *  +  Mobile nav toggle, active nav link on scroll, dynamic footer year
 */

/* ═══════════════════════════════════════════════════
   UTILITY HELPERS
═══════════════════════════════════════════════════ */

/**
 * Select a single DOM element (shorthand for querySelector).
 * @param {string} selector - CSS selector
 * @param {Element} [root=document] - optional scope root
 * @returns {Element|null}
 */
function $(selector, root = document) {
  return root.querySelector(selector);
}

/**
 * Select multiple DOM elements as an Array.
 * @param {string} selector - CSS selector
 * @param {Element} [root=document] - optional scope root
 * @returns {Element[]}
 */
function $$(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

/**
 * Show a toast notification that auto-dismisses.
 * @param {string} message - text to display
 * @param {'success'|'error'} type - visual style
 * @param {number} [duration=4000] - ms before auto-hide
 */
function showToast(message, type = 'success', duration = 4000) {
  const toast = $('#toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast toast--${type} toast--visible`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('toast--visible');
  }, duration);
}

/**
 * Display an inline field error message.
 * @param {string} fieldId - id of the input/textarea
 * @param {string} message - error text (empty string clears)
 */
function setFieldError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const errorEl = document.getElementById(`${fieldId}Error`);
  if (!input || !errorEl) return;

  if (message) {
    errorEl.textContent = message;
    input.classList.add('input--error');
    input.classList.remove('input--valid');
  } else {
    errorEl.textContent = '';
    input.classList.remove('input--error');
    input.classList.add('input--valid');
  }
}

/**
 * Clear all field errors and valid states in the form.
 * @param {HTMLFormElement} form
 */
function clearFormErrors(form) {
  $$('input, textarea', form).forEach(el => {
    el.classList.remove('input--error', 'input--valid');
  });
  $$('.field-error', form).forEach(el => { el.textContent = ''; });
}

/* ═══════════════════════════════════════════════════
   FEATURE 1 — DARK / LIGHT MODE TOGGLE
═══════════════════════════════════════════════════ */

(function initTheme() {
  const btn  = $('#themeToggle');
  const html = document.documentElement;
  const STORAGE_KEY = 'portfolioTheme';

  /**
   * Apply a theme to the <html> element and update the button icon.
   * @param {'dark'|'light'} theme
   */
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (btn) btn.querySelector('.theme-icon').textContent = theme === 'dark' ? '🌙' : '☀️';
  }

  // Restore saved preference, else default to dark
  const saved = localStorage.getItem(STORAGE_KEY) || 'dark';
  applyTheme(saved);

  if (btn) {
    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }
})();

/* ═══════════════════════════════════════════════════
   FEATURE 2 — TYPING ANIMATION (hero tagline)
═══════════════════════════════════════════════════ */

(function initTypingAnimation() {
  const target = $('#typingText');
  if (!target) return;

  const roles = [
    'Aspiring Computer Science Graduate',
    'Experience in Software Development',
    'Strong interest in AI & Data Analytics',
    'MCA Student @ VIT Chennai',
  ];

  let roleIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;
  const TYPING_SPEED   = 80;
  const DELETING_SPEED = 40;
  const PAUSE_AFTER    = 1800;

  /**
   * Recursive typing loop — types, pauses, deletes, then advances to next role.
   */
  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      target.textContent = currentRole.slice(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = currentRole.slice(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;

    if (!isDeleting && charIndex === currentRole.length) {
      // Finished typing — pause, then start deleting
      delay = PAUSE_AFTER;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting — move to next role
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(type, delay);
  }

  type();
})();

/* ═══════════════════════════════════════════════════
   FEATURE 3 — ANIMATED SKILL BARS (on scroll)
═══════════════════════════════════════════════════ */

(function initSkillBars() {
  const bars = $$('.skill-bar-fill');
  if (!bars.length) return;

  let animated = false;

  /**
   * Animate each bar fill to its target width (from data-level on parent).
   */
  function animateBars() {
    if (animated) return;
    animated = true;
    bars.forEach(bar => {
      const level = bar.closest('.skill-bar-item').dataset.level || '0';
      bar.style.width = `${level}%`;
    });
  }

  const skillSection = $('#skillBars');
  if (!skillSection) return;

  // Use IntersectionObserver so bars fire when the section is visible
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateBars();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(skillSection);
})();

/* ═══════════════════════════════════════════════════
   FEATURE 4 — PROJECT CATEGORY FILTER
═══════════════════════════════════════════════════ */

(function initProjectFilter() {
  const filterBtns = $$('.filter-btn');
  const cards      = $$('.project-card');
  if (!filterBtns.length || !cards.length) return;

  /**
   * Filter project cards by category string.
   * @param {string} filter - category value or 'all'
   */
  function filterProjects(filter) {
    cards.forEach(card => {
      const category = card.dataset.category || '';
      const visible  = filter === 'all' || category === filter;
      card.classList.toggle('card--hidden', !visible);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Filter cards
      filterProjects(btn.dataset.filter);
    });
  });
})();

/* ═══════════════════════════════════════════════════
   FEATURE 5 — CONTACT FORM VALIDATION
═══════════════════════════════════════════════════ */

(function initFormValidation() {
  const form = $('#contactForm');
  if (!form) return;

  // ── Validators ─────────────────────────────────

  /**
   * Validate a name field: required, at least 2 chars, no digits.
   * @param {string} value
   * @returns {string} error message or empty string if valid
   */
  function validateName(value) {
    if (!value.trim())           return 'Name is required.';
    if (value.trim().length < 2) return 'Name must be at least 2 characters.';
    if (/\d/.test(value))        return 'Name should not contain numbers.';
    return '';
  }

  /**
   * Validate an email address format.
   * @param {string} value
   * @returns {string} error message or empty string if valid
   */
  function validateEmail(value) {
    if (!value.trim()) return 'Email is required.';
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(value)) return 'Please enter a valid email address.';
    return '';
  }

  /**
   * Validate subject field: required, min 3 chars.
   * @param {string} value
   * @returns {string} error message or empty string if valid
   */
  function validateSubject(value) {
    if (!value.trim())           return 'Subject is required.';
    if (value.trim().length < 3) return 'Subject must be at least 3 characters.';
    return '';
  }

  /**
   * Validate message field: required, at least 10 chars.
   * @param {string} value
   * @returns {string} error message or empty string if valid
   */
  function validateMessage(value) {
    if (!value.trim())            return 'Message is required.';
    if (value.trim().length < 10) return 'Message must be at least 10 characters.';
    return '';
  }

  // ── Real-time validation on blur ──────────────

  document.getElementById('name').addEventListener('blur', function () {
    setFieldError('name', validateName(this.value));
  });
  document.getElementById('email').addEventListener('blur', function () {
    setFieldError('email', validateEmail(this.value));
  });
  document.getElementById('subject').addEventListener('blur', function () {
    setFieldError('subject', validateSubject(this.value));
  });
  document.getElementById('message').addEventListener('blur', function () {
    setFieldError('message', validateMessage(this.value));
  });

  // Clear error on input (show validation only after blur)
  ['name', 'email', 'subject', 'message'].forEach(id => {
    document.getElementById(id).addEventListener('input', function () {
      if (this.classList.contains('input--error')) {
        // Re-validate inline while the user is correcting
        const validators = { name: validateName, email: validateEmail, subject: validateSubject, message: validateMessage };
        setFieldError(id, validators[id](this.value));
      }
    });
  });

  // ── Submit handler ────────────────────────────

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nameVal    = document.getElementById('name').value;
    const emailVal   = document.getElementById('email').value;
    const subjectVal = document.getElementById('subject').value;
    const msgVal     = document.getElementById('message').value;

    const nameErr    = validateName(nameVal);
    const emailErr   = validateEmail(emailVal);
    const subjectErr = validateSubject(subjectVal);
    const msgErr     = validateMessage(msgVal);

    setFieldError('name',    nameErr);
    setFieldError('email',   emailErr);
    setFieldError('subject', subjectErr);
    setFieldError('message', msgErr);

    const hasErrors = nameErr || emailErr || subjectErr || msgErr;

    if (hasErrors) {
      showToast('Please fix the errors above before sending.', 'error');
      // Focus the first invalid field
      const firstError = ['name', 'email', 'subject', 'message']
        .find(id => document.getElementById(id).classList.contains('input--error'));
      if (firstError) document.getElementById(firstError).focus();
      return;
    }

    // ── Simulate submission (replace with real fetch/action in production) ──
    const submitBtn = $('#submitBtn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }

    setTimeout(() => {
      showToast('✓ Message sent! I\'ll get back to you soon.', 'success');
      form.reset();
      clearFormErrors(form);
      document.getElementById('charCounter').textContent = '0 / 500';
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message →';
      }
    }, 1200);
  });
})();

/* ═══════════════════════════════════════════════════
   FEATURE 6 — CHARACTER COUNTER (message textarea)
═══════════════════════════════════════════════════ */

(function initCharCounter() {
  const textarea = document.getElementById('message');
  const counter  = document.getElementById('charCounter');
  if (!textarea || !counter) return;

  const MAX = parseInt(textarea.getAttribute('maxlength'), 10) || 500;

  /**
   * Update the character count display and colour-code near the limit.
   */
  function updateCounter() {
    const len = textarea.value.length;
    counter.textContent = `${len} / ${MAX}`;
    counter.classList.toggle('char-counter--warn',  len >= MAX * 0.8);
    counter.classList.toggle('char-counter--limit', len >= MAX);
  }

  textarea.addEventListener('input', updateCounter);
  updateCounter(); // initialise on load
})();

/* ═══════════════════════════════════════════════════
   FEATURE 7 — SCROLL-TO-TOP BUTTON
═══════════════════════════════════════════════════ */

(function initScrollTop() {
  const btn = $('#scrollTop');
  if (!btn) return;

  const SHOW_AFTER_PX = 300;

  /**
   * Show/hide the button based on scroll position.
   */
  function handleScroll() {
    btn.classList.toggle('scroll-top--visible', window.scrollY > SHOW_AFTER_PX);
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ═══════════════════════════════════════════════════
   MOBILE NAV TOGGLE
═══════════════════════════════════════════════════ */

(function initMobileNav() {
  const toggle = $('.nav-toggle');
  const nav    = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('is-open');
  });

  // Close nav when a link is clicked (mobile UX)
  $$('.nav-link', nav).forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ═══════════════════════════════════════════════════
   ACTIVE NAV LINK ON SCROLL (IntersectionObserver)
═══════════════════════════════════════════════════ */

(function initActiveNav() {
  const sections = $$('section[id]');
  const links    = $$('.nav-link');
  if (!sections.length || !links.length) return;

  /**
   * Mark the nav link corresponding to the visible section as active.
   * @param {string} id - section id
   */
  function setActive(id) {
    links.forEach(l => l.classList.remove('active'));
    const active = $(`.nav-link[href="#${id}"]`);
    if (active) active.classList.add('active');
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

/* ═══════════════════════════════════════════════════
   DYNAMIC FOOTER YEAR
═══════════════════════════════════════════════════ */

(function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
})();
