
// Simple Scroll Animation (Optional)
window.addEventListener("scroll", () => {
  const header = document.querySelector(".main-header");
  header.style.boxShadow =
    window.scrollY > 50 ? "0 10px 30px rgba(0,0,0,0.1)" : "none";
});

// Mobile Menu Toggle
const menuToggle = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  // Hamburger Animation
  menuToggle.classList.toggle("is-active");
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// FAQ Accordion Logic
document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    item.classList.toggle("active");

    // Icon change logic
    const icon = header.querySelector(".icon");
    icon.textContent = item.classList.contains("active") ? "−" : "+";

    // Close other items (Optional)
    document.querySelectorAll(".accordion-item").forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
        otherItem.querySelector(".icon").textContent = "+";
      }
    });
  });
});

function buyNow(name) {
  const phone = "919999999999";
  const text = `Hi WebNexus! I'm ready to buy the "${name}" template. Let's talk payment.`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`);
}

document.getElementById("contactForm").onsubmit = (e) => {
  e.preventDefault();
  const name = e.target.querySelector("input").value;
  window.open(
    `https://wa.me/919999999999?text=Hi, I'm ${name} and I want to discuss a project.`
  );
};
