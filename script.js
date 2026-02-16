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

  // ===== CONTACT FORM =====
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector("input").value;
      window.open(
        `https://wa.me/919887374746?text=Hi, I'm ${name} and I want to discuss a project.`
      );
    });
  }
});
