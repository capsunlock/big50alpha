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

// Room
if (document.getElementById('room-sort')) {
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.sect');
    const template = document.getElementById('room-card-template');
    const sortSelect = document.getElementById('room-sort');

    const sheetURL = 'https://sheetdb.io/api/v1/82cpthih32y10'; // SheetDB API
    const jsonFallback = './data/rooms.json';

    const now = Date.now();
    const day = new Date().getDay();
    const oneDay = 86400000;
    const threeDays = 3 * oneDay;
    const isWeekday = day >= 1 && day <= 5;

    // Best Value (based on ID)
    let bestId = localStorage.getItem('bestValueId');
    const bestTime = parseInt(localStorage.getItem('bestValueTime'));
    if (!bestTime || (isWeekday && now - bestTime > threeDays)) {
      bestId = null; // Will pick fresh ID after data loads
      localStorage.setItem('bestValueTime', now.toString());
    }

    // Popular (based on ID)
    let popularIds = JSON.parse(localStorage.getItem('popularIds') || '[]');
    const popularTime = parseInt(localStorage.getItem('popularTime'));
    if (isWeekday && (!popularTime || now - popularTime > oneDay)) {
      popularIds = [];
      localStorage.setItem('popularTime', now.toString());
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    let currentRooms = [];

    const toNumber = val => parseInt(val.replace(/[^\d]/g, ''));

    function renderRoomCards(roomList) {
      container.innerHTML = '';
      currentRooms = roomList;

      // 💫 Choose bestId if missing
      if (!bestId || !roomList.some(r => r.id === bestId)) {
        const randomBest = roomList[Math.floor(Math.random() * roomList.length)];
        bestId = randomBest.id;
        localStorage.setItem('bestValueId', bestId);
      }

      // 💫 Choose popularIds if missing or mismatched
      if (popularIds.length !== 2 || !popularIds.every(pid => roomList.some(r => r.id === pid))) {
        popularIds = [];
        while (popularIds.length < 2) {
          const rand = Math.floor(Math.random() * roomList.length);
          const id = roomList[rand].id;
          if (!popularIds.includes(id)) popularIds.push(id);
        }
        localStorage.setItem('popularIds', JSON.stringify(popularIds));
      }

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
        img.onclick = () => window.open(room.img, '_blank');

        h4.textContent = room.name;
        p.innerHTML = `Room rate: ${room.rate} <br />Caution fee: ${room.caution}`;

        if (room.id === bestId) {
          const tag = document.createElement('span');
          tag.className = 'room-tag best';
          tag.textContent = 'Best Value';
          tag.style.animationDelay = `${i * 80}ms`;
          el.prepend(tag);
          el.classList.add('has-best');
        }

        if (popularIds.includes(room.id)) {
          const tag = document.createElement('span');
          tag.className = 'room-tag popular';
          tag.textContent = 'Popular';
          tag.style.animationDelay = `${i * 100}ms`;
          el.prepend(tag);
          el.classList.add('has-popular');
        }

        container.appendChild(card);
        observer.observe(el);
      });
    }

    sortSelect.addEventListener('change', () => {
      const sorted = [...currentRooms];
      const sortBy = sortSelect.value;

      if (sortBy === 'price-asc') {
        sorted.sort((a, b) => toNumber(a.rate) - toNumber(b.rate));
      } else if (sortBy === 'price-desc') {
        sorted.sort((a, b) => toNumber(b.rate) - toNumber(a.rate));
      }

      renderRoomCards(sortBy === 'default' ? currentRooms : sorted);
    });

    fetch(sheetURL)
      .then(res => {
        if (!res.ok) throw new Error('SheetDB fetch failed');
        return res.json();
      })
      .then(data => renderRoomCards(data))
      .catch(() => {
        fetch(jsonFallback)
          .then(res => res.json())
          .then(data => renderRoomCards(data))
          .catch(() => {
            container.innerHTML = '<p style="text-align:center;">Failed to load rooms.</p>';
          });
      });
  });
}
  // --- Intersection Observer for fade-in ---
  // const observer = new IntersectionObserver(entries => {
  //   entries.forEach(entry => {
  //     if (entry.isIntersecting) {
  //       entry.target.classList.add('visible');
  //       observer.unobserve(entry.target);
  //     }
  //   });
  // }, { threshold: 0.1 });

  // document.querySelectorAll('.it-em').forEach(el => observer.observe(el));


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
      if (firstMatch && activeSearch.trim() && document.activeElement === searchInput) {
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
    searchInput.scrollIntoView({
      behavior: 'smooth', block: 'center'
    });
  })
}

// Back to Top
if (document.getElementById('goTopComet')) {
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
}

// Contact
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const email = document.getElementById('email');
  const toastSuccess = document.getElementById('toastSuccess');
  const toastError = document.getElementById('toastError');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 🔴 Email input live validation
  email.addEventListener('input', () => {
    const value = email.value.trim();
    email.classList.toggle('valid-email', emailPattern.test(value));
    email.classList.toggle('invalid-email', value && !emailPattern.test(value));
  });

  // 🚀 AJAX form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name').trim();
    const emailVal = formData.get('email').trim();
    const message = formData.get('message').trim();

    // ✅ Simple client-side validation
    if (!name || !emailVal || !message) {
      showToast(toastError, '⚠ Please fill out all fields.');
      return;
    }

    if (!emailPattern.test(emailVal)) {
      showToast(toastError, '❌ Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (response.ok) {
        form.reset();
        email.classList.remove('valid-email', 'invalid-email');
        showToast(toastSuccess, '✅ Message sent successfully!');
      } else {
        showToast(toastError, '❌ Something went wrong. Please try again.');
      }
    } catch (error) {
      showToast(toastError, '❌ Network error. Please try again later.');
    }
  });

  // 🌟 Reusable toast function
  function showToast(el, msg) {
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 3000);
  }
});

// Footer
document.addEventListener('DOMContentLoaded', () => {
  const footerBottom = document.querySelector('.footer-bottom');

  if (footerBottom) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          footerBottom.classList.add('visible');
        }
      });
    }, { threshold: 0.5 });

    observer.observe(footerBottom);
  }
});
