/**
 * Kashmiri Realtor x Vedatam - Form Handling & WhatsApp Integration
 * Handles validation, lead archival in localStorage, and dynamic WhatsApp redirection.
 */

(function() {
  // Extract UTM parameters
  function getQueryParams() {
    const params = {};
    const searchParams = new URLSearchParams(window.location.search);
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  }

  const utmParams = getQueryParams();

  // Helper to generate WhatsApp URL with encoded enquiry details
  function buildWhatsAppUrl(data) {
    const config = window.VEDATAM_CONFIG || { broker: { whatsappNumber: "919810000000" } };
    const num = config.broker.whatsappNumber;

    let msg = `✨ *PRIVATE ENQUIRY: VEDATAM, SECTOR 14 GURUGRAM*\n\n`;
    msg += `👤 *Client Name:* ${data.name}\n`;
    msg += `📱 *Phone / WhatsApp:* ${data.phone}\n`;
    if (data.email) msg += `✉️ *Email:* ${data.email}\n`;
    if (data.interest) msg += `🏢 *Interested In:* ${data.interest}\n`;
    if (data.budget) msg += `💰 *Budget Range:* ${data.budget}\n`;
    if (data.contactTime) msg += `⏰ *Preferred Time:* ${data.contactTime}\n`;
    
    // Attribution
    const src = utmParams.utm_source ? `${utmParams.utm_source} (${utmParams.utm_campaign || 'web'})` : 'Kashmiri Realtor Web';
    msg += `📍 *Source:* ${src}\n\n`;
    msg += `Please connect me with a Kashmiri Realtor senior commercial advisor for site layout and private pricing.`;

    return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
  }

  // Save lead locally for reliability
  function archiveLead(data) {
    try {
      const existing = JSON.parse(localStorage.getItem('kr_vedatam_leads') || '[]');
      existing.push({
        ...data,
        timestamp: new Date().toISOString(),
        utm: utmParams
      });
      localStorage.setItem('kr_vedatam_leads', JSON.stringify(existing));
      sessionStorage.setItem('kr_vedatam_lead_captured', 'true');
    } catch (e) {
      console.warn('LocalStorage unavailable for lead archiving', e);
    }
  }

  // Setup generic form handler
  function setupLeadForm(formId, successContainerId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const nameInput = form.querySelector('[name="fullName"]');
      const phoneInput = form.querySelector('[name="phone"]');
      const emailInput = form.querySelector('[name="email"]');
      const interestInput = form.querySelector('[name="interest"]');
      const budgetInput = form.querySelector('[name="budget"]');
      const timeInput = form.querySelector('[name="contactTime"]');

      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const interest = interestInput ? interestInput.value : 'Commercial Retail / Investment';
      const budget = budgetInput ? budgetInput.value : 'Preferred Consultation';
      const contactTime = timeInput ? timeInput.value : 'Anytime';

      // Validation
      if (!name || name.length < 2) {
        alert('Please enter your full name.');
        if (nameInput) nameInput.focus();
        return;
      }

      const cleanPhone = phone.replace(/[^0-9+]/g, '');
      if (cleanPhone.length < 10) {
        alert('Please enter a valid 10-digit phone/WhatsApp number.');
        if (phoneInput) phoneInput.focus();
        return;
      }

      const leadData = {
        name,
        phone: cleanPhone,
        email,
        interest,
        budget,
        contactTime,
        formId
      };

      archiveLead(leadData);

      const waUrl = buildWhatsAppUrl(leadData);

      // Render success feedback
      const successEl = document.getElementById(successContainerId);
      if (successEl) {
        form.classList.add('hidden');
        successEl.classList.remove('hidden');
        const waBtn = successEl.querySelector('.btn-whatsapp-redirect');
        if (waBtn) {
          waBtn.href = waUrl;
        }
      }

      // If modal form, close modal after short delay or direct to WhatsApp
      if (formId === 'modal-enquiry-form' && window.VEDATAM_MODAL) {
        setTimeout(function() {
          window.VEDATAM_MODAL.close();
        }, 4000);
      }

      // Automatically open WhatsApp in new tab for instant connection
      window.open(waUrl, '_blank');
    });
  }

  // Setup direct WhatsApp action triggers
  function setupDirectWhatsAppButtons() {
    const buttons = document.querySelectorAll('[data-action="whatsapp-direct"]');
    buttons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const customInterest = btn.getAttribute('data-interest') || 'Commercial Retail / Multiplex Spaces';
        const config = window.VEDATAM_CONFIG || { broker: { whatsappNumber: "919810000000" } };
        const msg = `Hello Kashmiri Realtor, I am visiting the website and would like priority details & floor plans for Vedatam Sector 14 Gurugram (${customInterest}).`;
        const url = `https://wa.me/${config.broker.whatsappNumber}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    setupLeadForm('hero-enquiry-form', 'hero-form-success');
    setupLeadForm('modal-enquiry-form', 'modal-form-success');
    setupLeadForm('final-enquiry-form', 'final-form-success');
    setupDirectWhatsAppButtons();
  });
})();
