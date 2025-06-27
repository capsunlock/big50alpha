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

// const heroImages = [
//   '../alphaImages/OUTSIDE.jpg',
//   '../alphaImages/OUTSIDE-2.jpg")'
// ];

// let currentHero = 0;
// const heroSection = document.getElementById('home');

// setInterval (() => {
//   heroSection.style.backgroundImage = `url(${heroImages[currentHero]}`;
//   currentHero = (currentHero + 1) % heroImages.length;}, 5000);


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
  const allRooms = document.querySelectorAll('.it-em');
  const now = Date.now();
  const day = new Date().getDay(); // 0 = Sun

  // --- Popular: Two every 24h, skip weekends ---
  if (day !== 0 && day !== 6) {
    const popTime = localStorage.getItem('popularTime');
    const popIndexes = JSON.parse(localStorage.getItem('popularIndexes') || '[]');
    const oneDay = 24 * 60 * 60 * 1000;
    let indexes = [];

    if (!popTime || now - parseInt(popTime) > oneDay) {
      while (indexes.length < 2) {
        const i = Math.floor(Math.random() * allRooms.length);
        if (!indexes.includes(i)) indexes.push(i);
      }
      localStorage.setItem('popularIndexes', JSON.stringify(indexes));
      localStorage.setItem('popularTime', now.toString());
    } else {
      indexes = popIndexes;
    }

    allRooms.forEach(room => {
      room.classList.remove('has-popular');
      const tag = room.querySelector('.room-tag.popular');
      if (tag) tag.remove();
    });

    indexes.forEach(i => {
      const tag = document.createElement('span');
      tag.className = 'room-tag popular';
      tag.textContent = 'Popular';
      allRooms[i]?.prepend(tag);
      allRooms[i]?.classList.add('has-popular');
    });
  }

  // --- Best Value: One every 7 days ---
  const bestTime = localStorage.getItem('bestValueTime');
  const storedBest = parseInt(localStorage.getItem('bestValueIndex'));
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  let bestIndex;

  if (!bestTime || now - parseInt(bestTime) > oneWeek) {
    bestIndex = Math.floor(Math.random() * allRooms.length);
    localStorage.setItem('bestValueTime', now.toString());
    localStorage.setItem('bestValueIndex', bestIndex);
  } else {
    bestIndex = storedBest;
  }

  allRoomsItems.forEach(item => {
    item.classList.remove('has-best');
    const tag = item.querySelector('.room-tag.best');
    if (tag) tag.remove();
  });

  if (bestRoom) {
    const tag = document.createElement('span');
    tag.className = 'room-tag best';
    tag.textContent = 'Best Value';
    bestRoom.prepend(tag);
    bestRoom.classList.add('has-best');
  }
})