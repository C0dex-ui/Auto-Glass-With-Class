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

  /* --------------------------------------------------------------------
     10. BEFORE & AFTER SLIDER
     -------------------------------------------------------------------- */
  const baSlider = document.querySelector('.ba-slider');
  const baBefore = document.getElementById('ba-img-before');
  const baHandle = document.getElementById('ba-handle');

  if (baSlider && baBefore && baHandle) {
    let isDragging = false;

    const moveSlider = (e) => {
      if (!isDragging) return;
      
      const rect = baSlider.getBoundingClientRect();
      let x = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      x = x - rect.left;
      
      // Boundaries
      if (x < 0) x = 0;
      if (x > rect.width) x = rect.width;
      
      const percent = (x / rect.width) * 100;
      
      baHandle.style.left = `${percent}%`;
      baBefore.style.clipPath = `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`;
    };

    baSlider.addEventListener('mousedown', (e) => {
      isDragging = true;
      moveSlider(e);
      e.preventDefault(); // prevent image drag
    });
    window.addEventListener('mouseup', () => {
      isDragging = false;
    });
    window.addEventListener('mousemove', moveSlider);

    // Touch support
    baSlider.addEventListener('touchstart', (e) => {
      isDragging = true;
      moveSlider(e);
    });
    window.addEventListener('touchend', () => {
      isDragging = false;
    });
    window.addEventListener('touchmove', moveSlider);
  }

})();


  /* --------------------------------------------------------------------
     GOOGLE REVIEWS - LIVE FEED
     -------------------------------------------------------------------- */
  const GOOGLE_API_KEY = ''; // Add your API key here
  const GOOGLE_PLACE_ID = ''; // Add your Place ID here

  let _mapsP = null;

  function _esc(t) { return String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  function _loadMaps(key) {
    if (window.google && window.google.maps && window.google.maps.importLibrary) return Promise.resolve();
    if (_mapsP) return _mapsP;
    _mapsP = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://maps.googleapis.com/maps/api/js?key=' + encodeURIComponent(key) + '&v=weekly&loading=async&libraries=places';
      s.async = true;
      s.onload = resolve;
      s.onerror = () => reject(new Error('Google Maps JS failed to load'));
      document.head.appendChild(s);
    });
    return _mapsP;
  }

  function _renderReviews(place) {
    const grid = document.getElementById('agwc-reviews-grid');
    const ratingEl = document.getElementById('agwc-rating');
    const countEl = document.getElementById('agwc-rating-count');
    const noteEl = document.getElementById('agwc-reviews-note');
    if (place.rating && ratingEl) ratingEl.textContent = Number(place.rating).toFixed(1);
    if (place.userRatingCount && countEl) countEl.textContent = Number(place.userRatingCount).toLocaleString() + ' Google reviews';
    if (noteEl && noteEl.lastChild) { noteEl.style.color = '#1b9e5a'; noteEl.lastChild.textContent = ' Live feed connected - reviews update automatically from Google.'; }
    const reviews = (place.reviews || []).slice(0, 3);
    if (!grid || !reviews.length) return;
    const palette = ['#1d7ce5', '#34A853', '#EA4335'];
    const gLogo = '<svg width="22" height="22" viewBox="0 0 48 48"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/><path fill="#EA4335" d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 2.97 29.93 1 24 1 15.4 1 7.96 5.93 4.34 13.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/></svg>';
    grid.innerHTML = reviews.map((rv, i) => {
      const attr = rv.authorAttribution || {};
      const pic = attr.photoURI 
        ? '<img src="' + attr.photoURI + '" referrerpolicy="no-referrer" alt="" style="width:44px;height:44px;border-radius:50%;object-fit:cover;">' 
        : '<div style="width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:18px;background:' + palette[i % palette.length] + ';">' + _esc(attr.displayName).charAt(0).toUpperCase() + '</div>';
      return '<div style="width:340px;flex-shrink:0;margin-right:22px;background:#fff;border:1px solid var(--line);border-radius:14px;padding:26px;box-shadow:0 8px 24px -16px rgba(11,34,64,0.4);"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;"><div style="display:flex;align-items:center;gap:12px;">' + pic + '<div><div style="font-family:\'Archivo\',sans-serif;font-weight:700;font-size:16px;color:var(--navy);line-height:1.2;">' + _esc(attr.displayName) + '</div><div style="font-size:12.5px;color:var(--slate);margin-top:2px;">' + _esc(rv.relativePublishTimeDescription) + '</div></div></div>' + gLogo + '</div><div style="display:flex;gap:2px;color:var(--star);margin-bottom:12px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.5 7 .9-5 4.8 1.3 7L12 18l-6.3 3.2L7 14.2l-5-4.8 7-.9z"/></svg><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.5 7 .9-5 4.8 1.3 7L12 18l-6.3 3.2L7 14.2l-5-4.8 7-.9z"/></svg><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.5 7 .9-5 4.8 1.3 7L12 18l-6.3 3.2L7 14.2l-5-4.8 7-.9z"/></svg><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.5 7 .9-5 4.8 1.3 7L12 18l-6.3 3.2L7 14.2l-5-4.8 7-.9z"/></svg><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3 6.5 7 .9-5 4.8 1.3 7L12 18l-6.3 3.2L7 14.2l-5-4.8 7-.9z"/></svg></div><div style="font-size:14.5px;color:var(--ink);line-height:1.5;">"' + _esc(rv.text ? rv.text.text : '') + '"</div></div>';
    }).join('');
    grid.innerHTML += grid.innerHTML; // loop
  }

  function loadGoogleReviews() {
    const cfg = { apiKey: GOOGLE_API_KEY, placeId: GOOGLE_PLACE_ID };
    if (!cfg.apiKey || !cfg.placeId) return; // not configured -> keep curated reviews
    _loadMaps(cfg.apiKey)
      .then(() => google.maps.importLibrary('places'))
      .then((lib) => {
        const place = new lib.Place({ id: cfg.placeId });
        return place.fetchFields({ fields: ['rating', 'userRatingCount', 'reviews'] }).then((r) => r.place || place);
      })
      .then((place) => _renderReviews(place))
      .catch((e) => console.warn('[AGWC] Google reviews unavailable, showing curated set:', e && e.message));
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadGoogleReviews();
    const _rt = document.getElementById('agwc-reviews-grid');
    if (_rt && !_rt.dataset.looped) { 
      _rt.dataset.looped = '1'; 
      _rt.innerHTML += _rt.innerHTML; 
    }
  });

