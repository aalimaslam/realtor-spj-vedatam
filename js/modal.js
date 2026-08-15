/**
 * Kashmiri Realtor x Vedatam - 5-Second Timed & On-Demand Consultation Modal
 * Features: 5-second automatic timer trigger, ESC handler, backdrop click dismissal, focus management.
 */

(function() {
  const modalEl = document.getElementById('consultation-modal');
  const backdropEl = document.getElementById('modal-backdrop');
  const closeBtnEl = document.getElementById('modal-close-btn');

  if (!modalEl) return;

  function openModal() {
    modalEl.classList.remove('hidden');
    modalEl.classList.add('flex');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');

    // Focus on first input
    setTimeout(() => {
      const firstInput = modalEl.querySelector('input, select, button');
      if (firstInput) firstInput.focus();
    }, 100);
  }

  function closeModal() {
    modalEl.classList.add('hidden');
    modalEl.classList.remove('flex');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
  }

  // 5-second automatic trigger after website appears
  function initTimedPopup() {
    setTimeout(() => {
      if (modalEl && modalEl.classList.contains('hidden')) {
        openModal();
      }
    }, 5000);
  }

  // Setup trigger buttons
  document.querySelectorAll('[data-action="open-modal"]').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtnEl) {
    closeBtnEl.addEventListener('click', closeModal);
  }

  if (backdropEl) {
    backdropEl.addEventListener('click', closeModal);
  }

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modalEl.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Expose global interface
  window.VEDATAM_MODAL = {
    open: openModal,
    close: closeModal
  };

  // Launch 5-second popup on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimedPopup);
  } else {
    initTimedPopup();
  }
})();
