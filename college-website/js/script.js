document.addEventListener('DOMContentLoaded', () => {

  // --- Loader ---
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 500);
    }, 500); // Give it a little delay for effect
  });

  // --- Scrollytelling Hero Animation ---
  const scrollContainer = document.querySelector('.scroll-story-container');
  const frames = document.querySelectorAll('.story-frame');
  const root = document.documentElement;

  function updateScrollytelling() {
    if (!scrollContainer) return;

    const rect = scrollContainer.getBoundingClientRect();
    const containerTop = scrollContainer.offsetTop;
    const containerHeight = scrollContainer.clientHeight;
    const windowHeight = window.innerHeight;

    // Calculate scroll progress within container (0 to 1)
    const totalScrollable = containerHeight - windowHeight;
    if (totalScrollable <= 0) return;

    const currentScroll = window.scrollY - containerTop;
    const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

    // Calculate background scale and blur
    const bgScale = 1 + progress * 0.3; // 1 to 1.3
    const bgBlur = Math.min(progress * 8, 8); // 0px to 8px
    root.style.setProperty('--story-bg-scale', bgScale);
    root.style.setProperty('--story-bg-blur', `${bgBlur}px`);

    // Frame thresholds:
    // Frame 0 (Entrance): active 0.0 to 0.2
    // Frame 1 (Reception): active 0.2 to 0.4
    // Frame 2 (Office): active 0.4 to 0.6
    // Frame 3 (Lab): active 0.6 to 0.8
    // Frame 4 (Hero): active 0.8 to 1.0

    // Update active frame classes
    let activeIndex = 0;
    if (progress >= 0.8) activeIndex = 4;
    else if (progress >= 0.6) activeIndex = 3;
    else if (progress >= 0.4) activeIndex = 2;
    else if (progress >= 0.2) activeIndex = 1;

    frames.forEach((frame, idx) => {
      if (idx === activeIndex) {
        frame.classList.add('active');
      } else {
        frame.classList.remove('active');
      }
    });

    // --- Specific Element Animations based on local progress ---

    // 1. Entrance Gate (Frame 0)
    const gateProgress = Math.min(progress / 0.18, 1);
    root.style.setProperty('--gate-left-x', `-${gateProgress * 105}%`);
    root.style.setProperty('--gate-right-x', `${gateProgress * 105}%`);
    
    // Zoom out the gate container as we transition to Frame 1
    const gateScale = 1 + gateProgress * 0.6; // Scale up to 1.6
    const gateOpacity = progress < 0.2 ? 1 - (progress - 0.1) / 0.1 : 0;
    root.style.setProperty('--gate-scale', gateScale);
    root.style.setProperty('--gate-opacity', progress < 0.1 ? 1 : Math.max(0, gateOpacity));

    // 2. Lobby & Glass Doors (Frame 1)
    if (progress >= 0.12 && progress < 0.45) {
      const lobbyLocal = (progress - 0.15) / 0.25;
      const lobbyScale = 0.9 + Math.max(0, Math.min(1, lobbyLocal)) * 0.3;
      root.style.setProperty('--lobby-scale', lobbyScale);

      // Glass doors open between 0.25 and 0.38
      const doorProgress = Math.max(0, Math.min(1, (progress - 0.25) / 0.12));
      root.style.setProperty('--door-left-x', `-${doorProgress * 100}%`);
      root.style.setProperty('--door-right-x', `${doorProgress * 100}%`);

      let lobbyOpacity = 0;
      if (progress < 0.2) {
        lobbyOpacity = (progress - 0.12) / 0.08;
      } else if (progress > 0.36) {
        lobbyOpacity = 1 - (progress - 0.36) / 0.08;
      } else {
        lobbyOpacity = 1;
      }
      root.style.setProperty('--lobby-opacity', Math.max(0, Math.min(1, lobbyOpacity)));
    } else {
      root.style.setProperty('--lobby-opacity', 0);
    }

    // 3. Director's Office (Frame 2)
    if (progress >= 0.32 && progress < 0.65) {
      const officeLocal = (progress - 0.35) / 0.25;
      const officeScale = 0.9 + Math.max(0, Math.min(1, officeLocal)) * 0.3;
      root.style.setProperty('--office-scale', officeScale);

      let officeOpacity = 0;
      if (progress < 0.4) {
        officeOpacity = (progress - 0.32) / 0.08;
      } else if (progress > 0.56) {
        officeOpacity = 1 - (progress - 0.56) / 0.08;
      } else {
        officeOpacity = 1;
      }
      root.style.setProperty('--office-opacity', Math.max(0, Math.min(1, officeOpacity)));
    } else {
      root.style.setProperty('--office-opacity', 0);
    }

    // 4. Lab (Frame 3)
    if (progress >= 0.52 && progress < 0.85) {
      const labLocal = (progress - 0.55) / 0.25;
      const labScale = 0.9 + Math.max(0, Math.min(1, labLocal)) * 0.3;
      root.style.setProperty('--lab-scale', labScale);

      // Rotate/pivot the robotic arm segments on scroll
      const armLowerRot = -20 + Math.max(0, Math.min(1, labLocal)) * 40;
      const armUpperRot = 45 - Math.max(0, Math.min(1, labLocal)) * 50;
      root.style.setProperty('--arm-lower-rot', `${armLowerRot}deg`);
      root.style.setProperty('--arm-upper-rot', `${armUpperRot}deg`);

      let labOpacity = 0;
      if (progress < 0.6) {
        labOpacity = (progress - 0.52) / 0.08;
      } else if (progress > 0.76) {
        labOpacity = 1 - (progress - 0.76) / 0.08;
      } else {
        labOpacity = 1;
      }
      root.style.setProperty('--lab-opacity', Math.max(0, Math.min(1, labOpacity)));
    } else {
      root.style.setProperty('--lab-opacity', 0);
    }

    // 5. Boardroom / Placement Hero (Frame 4)
    if (progress >= 0.72) {
      const boardroomLocal = (progress - 0.75) / 0.25;
      const boardroomScale = 0.9 + Math.max(0, Math.min(1, boardroomLocal)) * 0.2;
      root.style.setProperty('--boardroom-scale', boardroomScale);

      let boardroomOpacity = 0;
      if (progress < 0.8) {
        boardroomOpacity = (progress - 0.72) / 0.08;
      } else {
        boardroomOpacity = 1;
      }
      root.style.setProperty('--boardroom-opacity', Math.max(0, Math.min(1, boardroomOpacity)));
    } else {
      root.style.setProperty('--boardroom-opacity', 0);
    }
  }

  window.addEventListener('scroll', updateScrollytelling);
  window.addEventListener('resize', updateScrollytelling);
  updateScrollytelling();

  // --- Sticky Navigation & Active Menu ---
  const header = document.querySelector('header');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-menu li a');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    // Sticky Header
    if (window.scrollY > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }

    // Back to top button
    if (window.scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }

    // Active Menu Highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  // --- Mobile Menu Toggle ---
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.querySelector('i').classList.remove('fa-times');
      hamburger.querySelector('i').classList.add('fa-bars');
    });
  });

  // --- Back to Top ---
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // --- Scroll Reveal Animation ---
  const reveals = document.querySelectorAll('.reveal');
  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    });
  }, revealOptions);

  reveals.forEach(reveal => {
    revealOnScroll.observe(reveal);
  });

  // --- Animated Counters ---
  const counters = document.querySelectorAll('.stat-number[data-target]');
  const counterOptions = {
    threshold: 0.5
  };

  const startCounters = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      
      const counter = entry.target;
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000; // ms
      const increment = target / (duration / 16); // 60fps
      
      let currentNum = 0;
      
      const updateCounter = () => {
        currentNum += increment;
        if (currentNum < target) {
          counter.innerText = Math.ceil(currentNum) + suffix;
          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = target + suffix;
        }
      };
      
      updateCounter();
      observer.unobserve(counter);
    });
  }, counterOptions);

  counters.forEach(counter => {
    startCounters.observe(counter);
  });

  // --- Gallery Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
          // optional small animation
          item.style.animation = 'zoomIn 0.4s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // --- Lightbox Popup ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('img').getAttribute('src');
      lightboxImg.setAttribute('src', imgSrc);
      lightbox.classList.add('active');
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
      lightbox.classList.remove('active');
    }
  });

  // --- Testimonial Slider ---
  const testiSlides = document.querySelectorAll('.testi-slide');
  const dots = document.querySelectorAll('.dot');
  const testiSlider = document.querySelector('.testi-slider');
  let currentSlide = 0;
  const slideCount = testiSlides.length;
  let slideInterval;

  function goToSlide(n) {
    testiSlider.style.transform = `translateX(-${n * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[n].classList.add('active');
    currentSlide = n;
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    goToSlide(currentSlide);
  }

  // Auto slide every 5 seconds
  if (slideCount > 0) {
    slideInterval = setInterval(nextSlide, 5000);

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        goToSlide(index);
        slideInterval = setInterval(nextSlide, 5000);
      });
    });
  }

  // --- Contact Form Validation ---
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const message = document.getElementById('message').value.trim();
      
      let isValid = true;
      let errorMsg = '';

      if (name.length < 3) {
        isValid = false;
        errorMsg = 'Name must be at least 3 characters.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        isValid = false;
        errorMsg = 'Please enter a valid email address.';
      } else if (phone && !/^\d{10}$/.test(phone)) {
        isValid = false;
        errorMsg = 'Please enter a valid 10-digit phone number.';
      } else if (message.length < 10) {
        isValid = false;
        errorMsg = 'Message must be at least 10 characters.';
      }

      if (isValid) {
        // Construct the WhatsApp message content
        const whatsappNumber = '917736235276';
        let text = `*New Message from ApexTech College Website*\n\n`;
        text += `*Name:* ${name}\n`;
        text += `*Email:* ${email}\n`;
        if (phone) {
          text += `*Phone:* ${phone}\n`;
        }
        text += `*Message:* ${message}`;
        
        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
        
        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');

        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';
        formMessage.innerText = 'Redirecting to WhatsApp to send your message...';
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.style.display = 'none';
          formMessage.className = 'form-message';
        }, 5000);
      } else {
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
        formMessage.innerText = errorMsg;
      }
    });
  }

});
