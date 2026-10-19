// Set your real email here: the contact form opens a pre-filled email to this address.
const CONTACT_EMAIL = "oluwanifemiemperor234@gmail.com";

// Mobile menu
const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");
menuBtn.addEventListener("click", () => {
  const open = navbar.classList.toggle("open");
  menuBtn.innerHTML = open ? '<i class="bx bx-x"></i>' : '<i class="bx bx-menu"></i>';
});
navbar.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => {
    navbar.classList.remove("open");
    menuBtn.innerHTML = '<i class="bx bx-menu"></i>';
  })
);

// Active link on scroll
const links = [...navbar.querySelectorAll("a:not(.nav-cta)")];
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach(s => spy.observe(s));

// Reveal on scroll
const reveal = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); reveal.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => reveal.observe(el));

// Contact form
const form = document.getElementById("contact-form");
const note = document.getElementById("form-note");
form.addEventListener("submit", e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  if (!d.name.trim() || !/^\S+@\S+\.\S+$/.test(d.email) || !d.message.trim()) {
    note.textContent = "Please add your name, a valid email and a message.";
    return;
  }
  const subject = encodeURIComponent(d.subject || "Portfolio enquiry from " + d.name);
  const body = encodeURIComponent(d.message + "\n\n" + d.name + "\n" + d.email);
  note.textContent = "Opening your email app…";
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});

document.getElementById("year").textContent = new Date().getFullYear();
