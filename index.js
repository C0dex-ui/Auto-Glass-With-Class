/* ==========================================================================
   AUTO GLASS WITH CLASS — Homepage Script (Fuzze Brand Redesign)
   Handles: Header scroll, mobile menu, smooth scrolling, location toggle, 
            quote wizard, testimonial slider, FAQ accordion, scroll animations
   ========================================================================== */

(function () {
  'use strict';

  /* --------------------------------------------------------------------
     1. HEADER — Scroll Effect
     -------------------------------------------------------------------- */
  const header = document.getElementById('header');

  function handleHeaderScroll() {
    if (window.scrollY > 30) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();


  /* --------------------------------------------------------------------
     2. MOBILE NAVIGATION MENU
     -------------------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('[data-mobile-link]');

  function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('mobile-menu--open');
    mobileMenu.classList.toggle('mobile-menu--open');
    mobileToggle.setAttribute('aria-expanded', String(!isOpen));

    if (!isOpen) {
      mobileToggle.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>`;
    } else {
      mobileToggle.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>`;
    }
  }

  mobileToggle.addEventListener('click', toggleMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('mobile-menu--open')) {
        toggleMobileMenu();
      }
    });
  });


  /* --------------------------------------------------------------------
     3. SMOOTH SCROLLING
     -------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerH = 90; // Approx header + margins
        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerH;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });


  /* --------------------------------------------------------------------
     4. LOCATIONS TAB SWITCHER
     -------------------------------------------------------------------- */
  const locationTabs = document.querySelectorAll('[data-location]');
  const locationPanels = {
    az: document.getElementById('panel-az'),
    nc: document.getElementById('panel-nc')
  };

  locationTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const loc = tab.dataset.location;

      locationTabs.forEach(t => t.classList.remove('location-tab-btn--active'));
      tab.classList.add('location-tab-btn--active');

      Object.values(locationPanels).forEach(p => p.classList.remove('location-tab-panel--active'));
      locationPanels[loc].classList.add('location-tab-panel--active');
    });
  });


  /* --------------------------------------------------------------------
     5. MULTI-STEP QUOTE WIZARD
     -------------------------------------------------------------------- */
  let currentStep = 1;
  const totalSteps = 4;

  const wizardPanels = document.querySelectorAll('[data-wizard-step]');
  const wizardNodes = document.querySelectorAll('.wizard-step-node');
  const progressBar = document.getElementById('wizard-progress-bar');

  // Populate year dropdown
  const yearSelect = document.getElementById('vehicle-year');
  if (yearSelect) {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear + 1; y >= 1990; y--) {
      const opt = document.createElement('option');
      opt.value = y;
      opt.textContent = y;
      yearSelect.appendChild(opt);
    }
  }

  function updateWizardUI() {
    // Show/Hide steps
    wizardPanels.forEach(panel => {
      const stepVal = panel.dataset.wizardStep;
      if (stepVal === String(currentStep) || stepVal === currentStep) {
        panel.classList.add('wizard-panel--active');
      } else {
        panel.classList.remove('wizard-panel--active');
      }
    });

    // Update steps state & visual nodes
    wizardNodes.forEach(node => {
      const nodeStep = parseInt(node.dataset.step);
      node.classList.remove('wizard-step-node--active', 'wizard-step-node--completed');

      if (nodeStep === currentStep) {
        node.classList.add('wizard-step-node--active');
        node.textContent = nodeStep;
      } else if (nodeStep < currentStep) {
        node.classList.add('wizard-step-node--completed');
        node.innerHTML = '✓';
      } else {
        node.textContent = nodeStep;
      }
    });

    // Update progress bar length
    if (progressBar) {
      const pct = ((currentStep - 1) / (totalSteps - 1)) * 100;
      progressBar.style.width = `${pct}%`;
    }
  }

  // Next / Prev button triggers
  document.querySelectorAll('[data-wizard-next]').forEach(btn => {
    btn.addEventListener('click', () => {
      // Basic validate for inputs on Step 1 & 4
      const activePanel = document.querySelector('.wizard-panel--active');
      const requiredInputs = activePanel.querySelectorAll('[required]');
      let valid = true;

      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.style.borderColor = 'var(--color-danger)';
        } else {
          input.style.borderColor = 'var(--color-border)';
        }
      });

      if (!valid) return;

      if (currentStep < totalSteps) {
        currentStep++;
        updateWizardUI();
      }
    });
  });

  document.querySelectorAll('[data-wizard-prev]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateWizardUI();
      }
    });
  });

  // Submit button
  const submitBtn = document.getElementById('wizard-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const activePanel = document.querySelector('.wizard-panel--active');
      const requiredInputs = activePanel.querySelectorAll('[required]');
      let valid = true;

      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.style.borderColor = 'var(--color-danger)';
        } else {
          input.style.borderColor = 'var(--color-border)';
        }
      });

      if (!valid) return;

      // Submit successful, show success step
      currentStep = 'success';
      wizardPanels.forEach(p => p.classList.remove('wizard-panel--active'));
      const successPanel = document.querySelector('[data-wizard-step="success"]');
      if (successPanel) {
        successPanel.classList.add('wizard-panel--active');
      }

      // Fill progress indicators
      wizardNodes.forEach(node => {
        node.classList.remove('wizard-step-node--active');
        node.classList.add('wizard-step-node--completed');
        node.innerHTML = '✓';
      });
      if (progressBar) {
        progressBar.style.width = '100%';
      }
    });
  }

  // Initial layout set
  updateWizardUI();


  /* --------------------------------------------------------------------
     6. TESTIMONIAL SLIDER
     -------------------------------------------------------------------- */
  const track = document.getElementById('testimonials-track');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const dotBtns = document.querySelectorAll('.testimonial-dot');
  let currentSlide = 0;
  const slideCount = dotBtns.length;
  let autoSlideInterval;

  function showSlide(index) {
    currentSlide = (index + slideCount) % slideCount;
    if (track) {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    dotBtns.forEach((dot, idx) => {
      dot.classList.toggle('testimonial-dot--active', idx === currentSlide);
    });
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentSlide - 1);
      resetAutoPlay();
    });

    nextBtn.addEventListener('click', () => {
      showSlide(currentSlide + 1);
      resetAutoPlay();
    });
  }

  dotBtns.forEach(dot => {
    dot.addEventListener('click', () => {
      showSlide(parseInt(dot.dataset.slide));
      resetAutoPlay();
    });
  });

  function startAutoPlay() {
    autoSlideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 6000);
  }

  function resetAutoPlay() {
    clearInterval(autoSlideInterval);
    startAutoPlay();
  }

  if (slideCount > 0) {
    startAutoPlay();
  }


  /* --------------------------------------------------------------------
     7. FAQ ACCORDION
     -------------------------------------------------------------------- */
  const faqCards = document.querySelectorAll('[data-faq]');

  faqCards.forEach(card => {
    const trigger = card.querySelector('[data-faq-toggle]');
    const content = card.querySelector('[data-faq-content]');
    const icon = trigger.querySelector('svg');

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Close other accordion cards
      faqCards.forEach(otherCard => {
        const otherTrigger = otherCard.querySelector('[data-faq-toggle]');
        const otherContent = otherCard.querySelector('[data-faq-content]');
        const otherIcon = otherTrigger.querySelector('svg');

        otherTrigger.setAttribute('aria-expanded', 'false');
        otherContent.style.maxHeight = '0';
        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
      });

      // Toggle current
      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = `${content.scrollHeight}px`;
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });


  /* --------------------------------------------------------------------
     8. SCROLL TRIGGER ANIMATIONS
     -------------------------------------------------------------------- */
  const animatedItems = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-on-scroll--visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -20px 0px'
    });

    animatedItems.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything instantly
    animatedItems.forEach(el => el.classList.add('animate-on-scroll--visible'));
  }


  /* --------------------------------------------------------------------
     9. ACTIVE NAVIGATION SCROLL SPY
     -------------------------------------------------------------------- */
  const spySections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header__nav-link');

  function scrollSpy() {
    const scrollPos = window.scrollY;
    const headerH = 100;

    spySections.forEach(sec => {
      const offsetTop = sec.offsetTop - headerH;
      const offsetBottom = offsetTop + sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
        navLinks.forEach(link => {
          link.classList.remove('header__nav-link--active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('header__nav-link--active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', scrollSpy, { passive: true });

})();
