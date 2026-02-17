document.addEventListener("DOMContentLoaded", function () {
  // ===== HEADER SHADOW =====
  const header = document.querySelector(".main-header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.style.boxShadow =
        window.scrollY > 50 ? "0 10px 30px rgba(0,0,0,0.08)" : "none";
    });
  }

  // ===== RESPONSIVE NAV =====
  const menuBtn = document.getElementById("mobile-menu");
  const nav = document.querySelector(".nav-links");
  const overlay = document.querySelector(".nav-overlay");

  function openMenu() {
    if (!nav || !menuBtn || !overlay) return;
    nav.classList.add("active");
    menuBtn.classList.add("open");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    if (!nav || !menuBtn || !overlay) return;
    nav.classList.remove("active");
    menuBtn.classList.remove("open");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  if (menuBtn) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      nav.classList.contains("active") ? closeMenu() : openMenu();
    });
  }

  if (overlay) {
    overlay.addEventListener("click", closeMenu);
  }

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // ===== BUY BUTTON =====
  window.buyNow = function (name) {
    const phone = "919887374746";
    const text = `Hi WebNexus! I want to buy the ${name} template.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`);
  };

  // ===== CONTACT FORM (EmailJS) =====
  // Initialize EmailJS (Replace 'YOUR_PUBLIC_KEY' with your actual key)
  (function() {
      // ⚠️ IMPORTANT: Replace "YOUR_PUBLIC_KEY" with your actual EmailJS Public Key
      // You can find this in your EmailJS Account > Integration > Browser Scripts
      emailjs.init("XlJ4bIw7Fe9TE_q4s");
  })();

  const form = document.getElementById("contactForm");
  
  function showToast(message, type = 'success') {
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      toast.innerText = message;
      document.body.appendChild(toast);
      setTimeout(() => toast.classList.add('show'), 100);
      setTimeout(() => {
          toast.classList.remove('show');
          setTimeout(() => toast.remove(), 300);
      }, 3000);
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const btn = form.querySelector("button");
      const originalText = btn.innerText;
      btn.innerText = "Sending...";
      btn.disabled = true;

      // ⚠️ IMPORTANT: Replace these with your actual Service ID and Template ID
      const serviceID = "service_h9dk23n";
      const templateID = "template_ys2x298";

      emailjs.sendForm(serviceID, templateID, form)
        .then(() => {
          showToast("Message sent successfully!", "success");
          form.reset();
          btn.innerText = "Message Sent!";
          setTimeout(() => { btn.innerText = originalText; btn.disabled = false; }, 3000);
        }, (err) => {
          btn.innerText = originalText;
          btn.disabled = false;
          showToast("Failed to send message. Please try again.", "error");
          console.error("EmailJS Error:", err);
        });
    });
  }

  // ===== PREVIEW BUTTON =====
  window.preview = function (templateName) {
    showToast(`Live preview for ${templateName} coming soon!`, "info");
  };

  // ===== STORE FILTERING =====
  const filterBtns = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");

  if (filterBtns.length > 0) {
      filterBtns.forEach(btn => {
          btn.addEventListener("click", () => {
              filterBtns.forEach(b => b.classList.remove("active"));
              btn.classList.add("active");
              
              const filterValue = btn.getAttribute("data-filter");
              productCards.forEach(card => {
                  const category = card.getAttribute("data-category");
                  if (filterValue === "all" || category === filterValue) {
                      card.style.display = "block";
                      card.classList.add("fade-in-up");
                  } else {
                      card.style.display = "none";
                  }
              });
          });
      });
  }
  
  // Feature: Click on product tag to filter
  const productTags = document.querySelectorAll(".product-tags");
  productTags.forEach(tag => {
      tag.style.cursor = "pointer";
      tag.addEventListener("click", (e) => {
          e.stopPropagation();
          const card = tag.closest(".product-card");
          const category = card.getAttribute("data-category");
          
          // Find button with this category and click it
          const matchingBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
          if (matchingBtn) {
              matchingBtn.click();
              // Scroll to top of store section smoothly
              document.querySelector(".filter-buttons").scrollIntoView({ behavior: "smooth" });
          }
      });
  });

  // ===== SCROLL ANIMATIONS =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".section-title, .card-grid > *, .hero-content, .service-detail, .product-card").forEach((el) => {
    observer.observe(el);
  });

  // ===== TESTIMONIAL SLIDER =====
  const slider = document.querySelector(".testimonial-wrapper");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (slider && prevBtn && nextBtn) {
      nextBtn.addEventListener("click", () => {
          const cardWidth = slider.querySelector(".testimonial-card").offsetWidth;
          slider.scrollBy({ left: cardWidth + 30, behavior: "smooth" });
      });

      prevBtn.addEventListener("click", () => {
          const cardWidth = slider.querySelector(".testimonial-card").offsetWidth;
          slider.scrollBy({ left: -(cardWidth + 30), behavior: "smooth" });
      });
      
      // Optional: Auto Scroll
      let autoScroll = setInterval(() => {
          if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
              slider.scrollTo({ left: 0, behavior: "smooth" });
          } else {
              const cardWidth = slider.querySelector(".testimonial-card").offsetWidth;
              slider.scrollBy({ left: cardWidth + 30, behavior: "smooth" });
          }
      }, 5000); // Scroll every 5 seconds

      // Pause on hover
      slider.addEventListener("mouseenter", () => clearInterval(autoScroll));
      slider.addEventListener("mouseleave", () => {
         autoScroll = setInterval(() => {
            if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
                slider.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                const cardWidth = slider.querySelector(".testimonial-card").offsetWidth;
                slider.scrollBy({ left: cardWidth + 30, behavior: "smooth" });
            }
        }, 5000);
      });
  }
});
