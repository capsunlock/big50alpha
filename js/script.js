function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme)
    
    const themeToggleButton = document.querySelector(".theme-toggle");
    themeToggleButton.textContent = newTheme === "dark" ? "🌞" : "🌙";
  }



window.addEventListener('scroll', () => {
  const cards = document.querySelectorAll('.feature-card, .product-card, .about-section');
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }
  });
});


  // Mobile menu toggle
function toggleMobileMenu() {
  document.body.classList.toggle("nav-open");

  // Lock or unlock scroll
  if (document.body.classList.contains("nav-open")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

// Close menu when a nav link is clicked
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      document.body.style.overflow ="";
    });
  });

  // Close menu if clicking outside nav
  document.addEventListener("click", (e) => {
    const nav = document.querySelector("nav");
    const isClickInside = nav.contains(e.target);
    const isMenuOpen = document.body.classList.contains("nav-open");

    if (!isClickInside && isMenuOpen) {
      document.body.classList.remove("nav-open");
      document.body.style.overflow ="";
    }
  });
});

// On load check for stored theme
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.setAttribute("data-theme", savedTheme);

  const themeToggleButton = document.querySelector(".theme-toggle")
  if (themeToggleButton) {
     themeToggleButton.textContent = savedTheme === "dark" ? "🌞" : "🌙";
  }
 
  // Initialize card animation style
  const cards = document.querySelectorAll('.feature-card, .product-card, .about-section');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
});


// switching of home background

const heroImages = [
  './alpha-images/OUTSIDE-2.jpg',
  './alpha-images/OUTSIDE.jpg'
];

let currentHero = 0;
const heroSection = document.getElementById('home');

setInterval (() => {
  heroSection.style.backgroundImage = `url(${heroImages[currentHero]}`;
  currentHero = (currentHero + 1) % heroImages.length;}, 8000);


// Popup with call link
function showPopup() {
  const popup = document.getElementById("popup");
  popup.classList.add("active")
}

function handleOutsideeClick(event) {
  const popup = document.getElementById("popup");
  popup.classList.remove("active");
}


document.addEventListener('DOMContentLoaded', () => {
  const roomList = [
    { id: 'one', name: 'STANDARD', img: './alpha-images/ROOM-1.jpg', rate: '35,500', caution: '15,000' },
    { id: 'two', name: 'DELUXE', img: './alpha-images/ROOM-2.jpg', rate: '37,500', caution: '15,000' },
    { id: 'three', name: 'EXECUTIVE', img: './alpha-images/ROOM-3.jpg', rate: '40,500', caution: '15,000' },
    { id: 'four', name: 'BUSINESS', img: './alpha-images/ROOM-4.jpg', rate: '47,500', caution: '15,000' },
    { id: 'five', name: 'BIG 50', img: './alpha-images/ROOM-5.jpg', rate: '55,000', caution: '15,000' },
    { id: 'six', name: 'PRESIDENTIAL', img: './alpha-images/ROOM-6.jpg', rate: '65,000', caution: '20,000' },
  ];

  const container = document.querySelector('.sect');
  const template = document.getElementById('room-card-template');
  const now = Date.now();
  const day = new Date().getDay();
  const oneDay = 86400000;
  const oneWeek = 7 * oneDay;

  // --- Shuffle Best Value (1/week) ---
  let bestIndex = parseInt(localStorage.getItem('bestValueIndex'));
  const bestTime = parseInt(localStorage.getItem('bestValueTime'));
  if (!bestTime || now - bestTime > oneWeek) {
    bestIndex = Math.floor(Math.random() * roomList.length);
    localStorage.setItem('bestValueIndex', bestIndex);
    localStorage.setItem('bestValueTime', now.toString());
  }

  // --- Shuffle Popular (2/day, weekdays only) ---
  let popularIndexes = JSON.parse(localStorage.getItem('popularIndexes') || '[]');
  const popularTime = parseInt(localStorage.getItem('popularTime'));
  if (day !== 0 && day !== 6 && (!popularTime || now - popularTime > oneDay)) {
    popularIndexes = [];
    while (popularIndexes.length < 2) {
      const rand = Math.floor(Math.random() * roomList.length);
      if (!popularIndexes.includes(rand)) popularIndexes.push(rand);
    }
    localStorage.setItem('popularIndexes', JSON.stringify(popularIndexes));
    localStorage.setItem('popularTime', now.toString());
  }

  // --- Render Cards ---
  roomList.forEach((room, i) => {
    const card = template.content.cloneNode(true);
    const el = card.querySelector('.it-em');
    const img = card.querySelector('img');
    const h4 = card.querySelector('h4');
    const p = card.querySelector('p');

    img.src = room.img;
    img.alt = `${room.name} Room`;
    img.loading = 'lazy';
    img.width = 300;
    img.height = 200;
    img.onload = () => img.classList.add('loaded');
    img.onclick = () => {
      
      window.open(room.img, '_blank');
    }
    h4.textContent = room.name;
    p.innerHTML = `Room rate: ${room.rate} <br />Caution fee: ${room.caution}`;

    // Tag injection
    if (i === bestIndex) {
      const tag = document.createElement('span');
      tag.className = 'room-tag best';
      tag.textContent = 'Best Value';
      el.prepend(tag);
      el.classList.add('has-best');
    }
    if (popularIndexes.includes(i)) {
      const tag = document.createElement('span');
      tag.className = 'room-tag popular';
      tag.textContent = 'Popular';
      el.prepend(tag);
      el.classList.add('has-popular');
    }

    container.appendChild(card);
  });

  // --- Intersection Observer for fade-in ---
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.it-em').forEach(el => observer.observe(el));
});


// Gallery Section

// Scroll animation trigger
const galleryItems = document.querySelectorAll('.gallery-item');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

galleryItems.forEach(item => observer.observe(item));

// Filter buttons
const filterButtons = document.querySelectorAll('.filter-button');
const items = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    items.forEach(item => {
      const isMatch = item.classList.contains(filter) || filter === 'all';
      item.style.display = isMatch ? 'block' : 'none';
    });
  });
});
