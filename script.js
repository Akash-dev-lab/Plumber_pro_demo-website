/* =========================================================
   Umesh Plumbing Services — Concept Demo Configuration & JS
   ========================================================= */

/**
 * SINGLE-PLACE BUSINESS CONFIGURATION
 * Update the fields below once verified. Leaving `phoneDigits` empty
 * keeps Call Now & WhatsApp buttons in safe demo-placeholder mode.
 */
const BUSINESS_CONFIG = {
  businessName: "Umesh Plumbing Services",
  // Digits with country code, e.g. "9199XXXXXXXX" (no +, spaces, or dashes)
  phoneDigits: "",
  // Optional formatted phone label shown when phoneDigits is set
  displayPhone: "[Phone Number — Configure in script.js]",
  locationText: "[Location in Noida — Configure in script.js]",
  hoursText: "[Business Hours — Configure in script.js]"
};

document.addEventListener("DOMContentLoaded", () => {
  const siteHeader = document.querySelector(".site-header");
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const ctaButtons = document.querySelectorAll("[data-cta]");
  const heroCtaNotice = document.getElementById("heroCtaNotice");
  const contactCtaNotice = document.getElementById("contactCtaNotice");

  const enquiryForm = document.getElementById("enquiryForm");
  const nameInput = document.getElementById("nameInput");
  const phoneInput = document.getElementById("phoneInput");
  const messageInput = document.getElementById("messageInput");
  const nameError = document.getElementById("nameError");
  const phoneError = document.getElementById("phoneError");
  const messageError = document.getElementById("messageError");
  const formStatus = document.getElementById("formStatus");

  const currentYearEl = document.getElementById("currentYear");
  if (currentYearEl) {
    currentYearEl.textContent = String(new Date().getFullYear());
  }

  // Hydrate configurable placeholders and CTA links from BUSINESS_CONFIG
  const cleanDigits = BUSINESS_CONFIG.phoneDigits.replace(/\D/g, "");
  const hasPhone = cleanDigits.length >= 10;

  document.querySelectorAll('[data-config="phone"]').forEach((el) => {
    el.textContent = BUSINESS_CONFIG.displayPhone;
    if (hasPhone) {
      el.classList.remove("contact-placeholder", "footer-placeholder");
    }
  });

  document.querySelectorAll('[data-config="location"]').forEach((el) => {
    el.textContent = BUSINESS_CONFIG.locationText;
  });

  document.querySelectorAll('[data-config="hours"]').forEach((el) => {
    el.textContent = BUSINESS_CONFIG.hoursText;
  });

  ctaButtons.forEach((button) => {
    const type = button.getAttribute("data-cta");
    if (hasPhone) {
      if (type === "call") {
        button.setAttribute("href", `tel:+${cleanDigits}`);
      } else if (type === "whatsapp") {
        button.setAttribute("href", `https://wa.me/${cleanDigits}`);
        button.setAttribute("target", "_blank");
        button.setAttribute("rel", "noopener noreferrer");
      }
    } else {
      button.addEventListener("click", () => {
        const label = type === "whatsapp" ? "WhatsApp" : "Call Now";
        if (heroCtaNotice) {
          heroCtaNotice.textContent =
            `${label} is in placeholder mode — set phoneDigits in script.js to enable direct ${label}.`;
        }
      });
    }
  });

  if (hasPhone && contactCtaNotice) {
    contactCtaNotice.hidden = true;
  }

  // Sticky header shadow on scroll
  const handleScrollHeader = () => {
    if (!siteHeader) return;
    siteHeader.classList.toggle("scrolled", window.scrollY > 12);
  };
  handleScrollHeader();
  window.addEventListener("scroll", handleScrollHeader, { passive: true });

  // Mobile navigation toggle
  const setMobileMenuState = (isOpen) => {
    if (!hamburgerBtn || !mobileMenu) return;
    hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
    mobileMenu.hidden = !isOpen;
  };

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", () => {
      const isCurrentlyOpen = hamburgerBtn.getAttribute("aria-expanded") === "true";
      setMobileMenuState(!isCurrentlyOpen);
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => setMobileMenuState(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setMobileMenuState(false);
      }
    });
  }

  // Scroll reveal animations
  const revealElements = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("revealed"));
  }

  // Enquiry form validation (client-side demo only)
  const setFieldError = (inputEl, errorEl, message) => {
    if (!inputEl || !errorEl) return;
    if (message) {
      inputEl.classList.add("invalid");
      errorEl.textContent = message;
    } else {
      inputEl.classList.remove("invalid");
      errorEl.textContent = "";
    }
  };

  const validateForm = () => {
    let isValid = true;

    const nameVal = nameInput.value.trim();
    if (nameVal.length < 2) {
      setFieldError(nameInput, nameError, "Please enter your name (at least 2 characters).");
      isValid = false;
    } else {
      setFieldError(nameInput, nameError, "");
    }

    const phoneVal = phoneInput.value.trim();
    const digitsOnly = phoneVal.replace(/\D/g, "");
    if (digitsOnly.length < 10 || digitsOnly.length > 13) {
      setFieldError(phoneInput, phoneError, "Please enter a valid 10-digit phone number.");
      isValid = false;
    } else {
      setFieldError(phoneInput, phoneError, "");
    }

    const messageVal = messageInput.value.trim();
    if (messageVal.length < 8) {
      setFieldError(messageInput, messageError, "Please describe your requirement (at least 8 characters).");
      isValid = false;
    } else {
      setFieldError(messageInput, messageError, "");
    }

    return isValid;
  };

  if (enquiryForm) {
    [nameInput, phoneInput, messageInput].forEach((input) => {
      if (!input) return;
      input.addEventListener("input", () => {
        if (input.classList.contains("invalid")) {
          validateForm();
        }
      });
    });

    enquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (formStatus) {
        formStatus.hidden = true;
      }

      if (!validateForm()) {
        return;
      }

      const submittedName = nameInput.value.trim();
      if (formStatus) {
        formStatus.textContent =
          `Thank you, ${submittedName}. This is a concept demo preview—no data was sent to a server.`;
        formStatus.hidden = false;
      }
      enquiryForm.reset();
    });
  }
});
