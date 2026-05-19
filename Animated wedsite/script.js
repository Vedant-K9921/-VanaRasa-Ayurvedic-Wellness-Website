// ================= LOADER =================

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  setTimeout(() => {
    loader.classList.add("hide");
  }, 1500);
});

// ================= MOBILE MENU =================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// ================= SCROLL REVEAL =================

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

reveals.forEach(el => {
  revealObserver.observe(el);
});

// ================= COUNTERS =================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.dataset.target;

        let count = 0;

        const updateCounter = () => {
          const increment = target / 120;

          count += increment;

          if (count < target) {
            counter.innerText = Math.floor(count);
            requestAnimationFrame(updateCounter);
          } else {
            counter.innerText = target.toLocaleString();
          }
        };

        updateCounter();

        counterObserver.unobserve(counter);
      }
    });
  },
  {
    threshold: 0.5,
  }
);

counters.forEach(counter => {
  counterObserver.observe(counter);
});

// ================= TILT EFFECT =================

const tiltCards = document.querySelectorAll(".tilt");

tiltCards.forEach(card => {

  card.addEventListener("mousemove", e => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / 20) * -1;
    const rotateY = (x - centerX) / 20;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `
      perspective(1000px)
      rotateX(0)
      rotateY(0)
      scale(1)
    `;
  });
});

// ================= CURSOR GLOW =================

const glow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

// ================= MUSIC TOGGLE =================

const musicBtn = document.querySelector(".music-toggle");
const bgMusic = document.getElementById("bgMusic");

let playing = false;

musicBtn.addEventListener("click", () => {

  if (!playing) {

    bgMusic.play();

    musicBtn.innerHTML =
      '<i class="ri-volume-mute-line"></i>';

    playing = true;

  } else {

    bgMusic.pause();

    musicBtn.innerHTML =
      '<i class="ri-volume-up-line"></i>';

    playing = false;
  }
});

// ================= PARALLAX EFFECT =================

window.addEventListener("scroll", () => {

  const scrolled = window.scrollY;

  document.querySelector(".hero-bg").style.transform =
    `translateY(${scrolled * 0.3}px)`;

});

// ================= SMOOTH ACTIVE LINKS =================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop;

    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {

    link.classList.remove("active");

    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

// ================= FORM SUBMIT =================

const form = document.querySelector(".consult-form");

form.addEventListener("submit", e => {

  e.preventDefault();

  const button = form.querySelector("button");

  button.innerText = "Consultation Booked ✓";

  button.style.background =
    "linear-gradient(135deg,#2e7d32,#43a047)";

  setTimeout(() => {
    button.innerText = "Book Consultation";
  }, 3000);

  form.reset();
});