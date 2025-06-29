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
//   './alpha-images/OUTSIDE-2.jpg',
//   './alpha-images/OUTSIDE.jpg'
// ];

// let currentHero = 0;
// const heroSection = document.getElementById('home');

// setInterval (() => {
//   heroSection.style.backgroundImage = `url(${heroImages[currentHero]}`;
//   currentHero = (currentHero + 1) % heroImages.length;}, 8000);


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

  if (!container) return;

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

if (document.getElementById('noResultsMessage')) {

  const filterButtons = document.querySelectorAll('.filter-button');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const searchInput = document.getElementById('gallerySearch');
  const noResultsMessage = document.getElementById('noResultsMessage');

  let activeFilter = 'all';
  let activeSearch = '';

  const updateGallery = () => {
    let resultsCount = 0;
    let firstMatch = null;

    galleryItems.forEach(item => {
      const label = item.querySelector('.gallery-image-label').textContent.toLowerCase();
      const matchesFilter = activeFilter === 'all' || item.classList.contains(activeFilter);
      const matchesSearch = label.includes(activeSearch);

      const shouldShow = matchesFilter && matchesSearch;
      item.style.display = shouldShow ? 'block' : 'none';

      if (shouldShow) {
        if (!firstMatch) firstMatch = item;
        setTimeout(() => item.classList.add('visible'), 10);
        resultsCount++;
        } else {
          item.classList.remove('visible');
        }
      });

      noResultsMessage.style.display = resultsCount === 0 ? 'block' : 'none';

      //Scroll to the first Match (if serching only)
      if (firstMatch && activeSearch.trim()) {
        setTimeout(() => {
        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'start'});
        }, 150);
        
      }
    };

    filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      activeFilter = button.dataset.filter;
      updateGallery();

      // Smooth scroll if not "all"
      if (activeFilter !== 'all') {
        const section = document.getElementById(activeFilter);
        if (section) {
          section.scrollIntoView({
            behavior: 'smooth', block: 'start'
          });
        }
      }
    });
  });


  searchInput.addEventListener('input', () => {
    activeSearch = searchInput.value.toLowerCase();
    updateGallery();
  });


  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  galleryItems.forEach(item => observer.observe(item));

  // Back to Top
  const goTopComet = document.getElementById('goTopComet');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      goTopComet.classList.add('show');
    } else {
      goTopComet.classList.remove('show');
    }
  });

  goTopComet.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Clear search
  const clearButton = document.getElementById('clearSearch');

  searchInput.addEventListener('input', () => {
    activeSearch = searchInput.value.toLowerCase();
    updateGallery();

    if (searchInput.value.trim()) {
      clearButton.classList.add('show');
    } else {
      clearButton.classList.remove('show');
    }
  });

  clearButton.addEventListener('click', () => {
    searchInput.value = '';
    activeSearch = '';
    updateGallery();
    clearButton.classList.remove('show');
    searchInput.focus();
  });
}

// Contact
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return; // ⛑ Only run on the contact page

  const email = document.getElementById('email');
  const toastSuccess = document.getElementById('toastSuccess');
  const toastError = document.getElementById('toastError');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Live email border validation
  email.addEventListener('input', () => {
    const value = email.value.trim();
    email.classList.toggle('valid-email', emailPattern.test(value));
    email.classList.toggle('invalid-email', value && !emailPattern.test(value));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const emailVal = email.value.trim();
    const message = form.message.value.trim();

    if (!name || !emailVal || !message) {
      showToast(toastError, '⚠ Please fill out all fields.');
      return;
    }

    if (!emailPattern.test(emailVal)) {
      showToast(toastError, '❌ Please enter a valid email address.');
      return;
    }

    form.reset();
    email.classList.remove('valid-email', 'invalid-email');
    showToast(toastSuccess, '✅ Message sent successfully!');
  });

  function showToast(el, msg) {
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 3000);
  }
});
