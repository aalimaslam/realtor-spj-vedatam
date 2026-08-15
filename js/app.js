/**
 * Kashmiri Realtor x Vedatam - Main Application Logic
 * Navigation, header state, lightbox with image download, animated counters, and scroll interactions.
 */

document.addEventListener('DOMContentLoaded', function() {
  // 1. Header scroll state with smooth backdrop blur elevation
  const header = document.getElementById('main-header');
  function handleScroll() {
    if (window.scrollY > 40) {
      header.classList.add('header-scrolled');
      header.classList.remove('header-glass');
    } else {
      header.classList.remove('header-scrolled');
      header.classList.add('header-glass');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Menu Drawer
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileClose = document.getElementById('mobile-menu-close');
  const mobileDrawer = document.getElementById('mobile-menu-drawer');
  const mobileBackdrop = document.getElementById('mobile-menu-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('translate-x-full');
      mobileDrawer.classList.add('translate-x-0');
    }
    if (mobileBackdrop) {
      mobileBackdrop.classList.remove('hidden');
      mobileBackdrop.classList.add('block');
    }
    document.body.classList.add('lightbox-open');
  }

  function closeMobileMenu() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('translate-x-0');
      mobileDrawer.classList.add('translate-x-full');
    }
    if (mobileBackdrop) {
      mobileBackdrop.classList.add('hidden');
      mobileBackdrop.classList.remove('block');
    }
    document.body.classList.remove('lightbox-open');
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  // 3. Lightbox with Download High-Res Image Option
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');
  const lightboxDownload = document.getElementById('lightbox-download');
  const lightboxDownloadBottom = document.getElementById('lightbox-download-bottom');

  function openLightbox(src, caption) {
    if (!lightboxModal) return;
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '';

    const filename = src.split('/').pop() || 'vedatam-render.jpg';
    if (lightboxDownload) {
      lightboxDownload.href = src;
      lightboxDownload.setAttribute('download', filename);
    }
    if (lightboxDownloadBottom) {
      lightboxDownloadBottom.href = src;
      lightboxDownloadBottom.setAttribute('download', filename);
    }

    lightboxModal.classList.remove('hidden');
    lightboxModal.classList.add('flex');
    document.body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.add('hidden');
    lightboxModal.classList.remove('flex');
    lightboxImg.src = '';
    document.body.classList.remove('lightbox-open');
  }

  document.querySelectorAll('[data-lightbox="true"]').forEach(el => {
    el.addEventListener('click', function(e) {
      // If clicking directly on a child download button, allow download without lightbox toggle
      if (e.target.closest('[data-action="download-direct"]')) {
        return;
      }
      e.preventDefault();
      const img = this.querySelector('img') || this;
      const src = this.getAttribute('data-full-src') || img.src;
      const caption = this.getAttribute('data-caption') || img.alt;
      openLightbox(src, caption);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightboxModal && !lightboxModal.classList.contains('hidden')) {
      closeLightbox();
    }
  });

  // 4. Smooth Intersection Observer for Scroll Reveals
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    revealObserver.observe(el);
  });

  // 5. Smooth Number Counter Animation
  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target'));
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const isDecimal = target % 1 !== 0;
    const duration = 1800;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeProgress * target;

      el.textContent = prefix + (isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal).toLocaleString('en-IN')) + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + (isDecimal ? target.toFixed(1) : target.toLocaleString('en-IN')) + suffix;
      }
    }
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-counter="true"]').forEach(el => {
    counterObserver.observe(el);
  });
});
