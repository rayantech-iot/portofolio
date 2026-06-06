/* =============================================
   JAVASCRIPT – Portfolio Rayan Beni BANGUINA
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- PARTICLES BACKGROUND ---- */
  const particlesBg = document.getElementById('particles-bg');
  const particleCount = 35;
  const colors = ['#6c63ff', '#a855f7', '#3b82f6', '#818cf8', '#c084fc'];
  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 4 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.cssText = `
      width:${size}px; height:${size}px;
      background:${color};
      left:${Math.random() * 100}%;
      animation-duration:${Math.random() * 20 + 12}s;
      animation-delay:${Math.random() * 12}s;
      box-shadow:0 0 ${size * 3}px ${color};
    `;
    particlesBg.appendChild(p);
  }

  /* ---- CUSTOM CURSOR ---- */
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursorFollower');
  let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();
  document.querySelectorAll('a, button, .skill-card, .project-card, .hobby-card, .cert-card, .timeline-card, .tab-btn').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); cursorFollower.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); cursorFollower.classList.remove('hover'); });
  });

  /* ---- NAVBAR SCROLL ---- */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 50);
    backToTop.classList.toggle('visible', scrollY > 400);
    highlightNavLink();
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---- THEME TOGGLE ---- */
  const themeToggle = document.getElementById('themeToggle');
  const THEME_KEY = 'portfolio-theme';

  // Appliquer le thème sauvegardé au chargement
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  }

  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');

    // Mini animation ripple sur le bouton
    themeToggle.style.transform = 'scale(0.88)';
    setTimeout(() => { themeToggle.style.transform = ''; }, 180);
  });

  /* ---- HAMBURGER ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ---- ACTIVE NAV LINK ---- */
  function highlightNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
      if (navLink) {
        if (scrollY >= top && scrollY < top + height) {
          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  }

  /* ---- TYPED TEXT ---- */
  const typedEl = document.getElementById('typedText');
  const words = [
    'Concepteur Développeur Full Stack',
    'Master IA & Data Science',
    'Spécialiste en Génie Logiciel',
    'Passionné de Cybersécurité',
    'Explorateur de l\'IA & Big Data',
  ];
  let wordIndex = 0, charIndex = 0, isDeleting = false;
  function type() {
    const current = words[wordIndex];
    const speed = isDeleting ? 55 : 90;
    typedEl.textContent = isDeleting
      ? current.substring(0, charIndex--)
      : current.substring(0, charIndex++);
    if (!isDeleting && charIndex > current.length) {
      setTimeout(() => { isDeleting = true; type(); }, 2200);
      return;
    }
    if (isDeleting && charIndex < 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(type, speed);
  }
  type();

  /* ---- AOS (Animate On Scroll) ---- */
  const aosElements = document.querySelectorAll('[data-aos]');
  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.aosDelay || 0);
        setTimeout(() => { entry.target.classList.add('aos-animate'); }, delay);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  aosElements.forEach(el => aosObserver.observe(el));

  /* ---- STATS COUNTER ---- */
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let current = 0;
        const duration = 1500;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = Math.floor(current);
          if (current >= target) { el.textContent = target + '+'; clearInterval(timer); }
        }, 16);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNumbers.forEach(el => statsObserver.observe(el));

  /* ---- SKILL BARS ANIMATION ---- */
  const skillBars = document.querySelectorAll('.skill-bar');
  const skillsSection = document.getElementById('skills');
  const skillObserver = new IntersectionObserver(() => {
    skillBars.forEach(bar => {
      bar.style.width = bar.dataset.width + '%';
    });
  }, { threshold: 0.3 });
  if (skillsSection) skillObserver.observe(skillsSection);

  /* ---- TABS ---- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById('tab-' + tabId);
      if (panel) {
        panel.classList.add('active');
        // Animate skill bars in newly shown tab
        panel.querySelectorAll('.skill-bar').forEach(bar => {
          bar.style.width = '0';
          setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 100);
        });
      }
    });
  });

  /* ---- CONTACT FORM ---- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const mailtoLink = document.getElementById('mailtoLink');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('nameInput').value;
    const email = document.getElementById('emailInput').value;
    const subject = document.getElementById('subjectInput').value || 'Contact depuis Portfolio';
    const message = document.getElementById('messageInput').value;
    const mailtoHref = `mailto:banguinabeni09@gmail.com?subject=${encodeURIComponent(subject + ' - de ' + name)}&body=${encodeURIComponent('Nom: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;
    if (mailtoLink) mailtoLink.href = mailtoHref;
    formSuccess.style.display = 'flex';
    formSuccess.style.alignItems = 'center';
    formSuccess.style.gap = '8px';
    // Auto-open mail client
    window.location.href = mailtoHref;
  });

  /* ---- SMOOTH SCROLLING for all anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- PROFILE IMAGE FALLBACK ---- */
  function createAvatarCanvas(size) {
    const canvas = document.createElement('canvas');
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext('2d');
    // Circle clip
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    // Gradient background
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, '#6c63ff');
    grad.addColorStop(1, '#a855f7');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    // Initials
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.font = `bold ${size * 0.32}px "Space Grotesk", Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('RB', size / 2, size / 2);
    return canvas;
  }
  function handleImgError(img, size) {
    const canvas = createAvatarCanvas(size);
    img.parentNode.replaceChild(canvas, img);
    canvas.style.cssText = img.style.cssText;
    canvas.className = img.className;
    canvas.id = img.id || '';
    canvas.style.borderRadius = '50%';
  }
  const heroPhoto = document.getElementById('heroPhoto');
  const aboutPhoto = document.querySelector('.about-photo');
  if (heroPhoto) heroPhoto.onerror = () => handleImgError(heroPhoto, 200);
  if (aboutPhoto) aboutPhoto.onerror = () => handleImgError(aboutPhoto, 400);

  /* ---- TILT EFFECT ON PROJECT CARDS ---- */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-8px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ---- GLITCH effect on hero name (subtle) ---- */
  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    setInterval(() => {
      heroName.style.textShadow = `${Math.random() * 4 - 2}px 0 rgba(108,99,255,0.5)`;
      setTimeout(() => { heroName.style.textShadow = ''; }, 80);
    }, 3500);
  }

});
