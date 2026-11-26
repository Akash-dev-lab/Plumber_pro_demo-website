/* =========================================================
   Umesh Plumbing Services — Starter Landing Page (₹3,000)
   ========================================================= */

/**
 * CENTRAL BUSINESS CONFIGURATION
 * Set phoneDigits and whatsappDigits (e.g. "9199XXXXXXXX") to
 * enable direct one-click calling and WhatsApp chat.
 * Leaving them empty safely keeps buttons in unverified mode.
 */
const BUSINESS_CONFIG = {
  businessName: "Umesh Plumbing Services",
  phoneDigits: "",
  whatsappDigits: "",
  displayPhone: "Available upon confirmation",
  locationText: "Noida, Uttar Pradesh",
  hoursText: "Available in Noida"
};

document.addEventListener("DOMContentLoaded", () => {
  const siteHeader = document.querySelector(".site-header");
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const ctaButtons = document.querySelectorAll("[data-cta]");
  const heroCtaNotice = document.getElementById("heroCtaNotice");
  const contactCtaNotice = document.getElementById("contactCtaNotice");

  const currentYearEl = document.getElementById("currentYear");
  if (currentYearEl) {
    currentYearEl.textContent = String(new Date().getFullYear());
  }

  // Hydrate contact details and CTA buttons from BUSINESS_CONFIG
  const cleanPhone = BUSINESS_CONFIG.phoneDigits.replace(/\D/g, "");
  const cleanWhatsApp = (BUSINESS_CONFIG.whatsappDigits || BUSINESS_CONFIG.phoneDigits).replace(/\D/g, "");
  const hasPhone = cleanPhone.length >= 10;
  const hasWhatsApp = cleanWhatsApp.length >= 10;

  document.querySelectorAll('[data-config="phone"]').forEach((el) => {
    el.textContent = hasPhone ? BUSINESS_CONFIG.displayPhone : "Available upon confirmation";
  });

  document.querySelectorAll('[data-config="location"]').forEach((el) => {
    el.textContent = BUSINESS_CONFIG.locationText;
  });

  document.querySelectorAll('[data-config="hours"]').forEach((el) => {
    el.textContent = BUSINESS_CONFIG.hoursText;
  });

  ctaButtons.forEach((button) => {
    const type = button.getAttribute("data-cta");
    if (type === "call") {
      if (hasPhone) {
        button.setAttribute("href", `tel:+${cleanPhone}`);
      } else {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          const noticeMsg = "Verified phone number will be added upon confirmation.";
          if (heroCtaNotice) heroCtaNotice.textContent = noticeMsg;
          if (contactCtaNotice) contactCtaNotice.textContent = noticeMsg;
        });
      }
    } else if (type === "whatsapp") {
      if (hasWhatsApp) {
        button.setAttribute("href", `https://wa.me/${cleanWhatsApp}`);
        button.setAttribute("target", "_blank");
        button.setAttribute("rel", "noopener noreferrer");
      } else {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          const noticeMsg = "Verified WhatsApp number will be added upon confirmation.";
          if (heroCtaNotice) heroCtaNotice.textContent = noticeMsg;
          if (contactCtaNotice) contactCtaNotice.textContent = noticeMsg;
        });
      }
    }
  });

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
});
