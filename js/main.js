document.addEventListener('DOMContentLoaded', () => {
  // ========================================
  // Theme Toggle
  // ========================================
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('.theme-icon');
  const savedTheme = localStorage.getItem('theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  themeIcon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeIcon.textContent = next === 'dark' ? '🌙' : '☀️';
  });

  // ========================================
  // Mobile Navigation
  // ========================================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  navLinks.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // ========================================
  // Navbar Scroll Effect
  // ========================================
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveNav();
  });

  // ========================================
  // Active Nav Link Highlighting
  // ========================================
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');

  function highlightActiveNav() {
    const scrollPos = window.scrollY + 100;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        allNavLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ========================================
  // Typing Animation
  // ========================================
  const typedElement = document.getElementById('typed-text');
  const words = ['Developer', 'Designer', 'Problem Solver', 'Creator'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typedElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Pause before next word
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // ========================================
  // Fetch & Render Skills
  // ========================================
  async function loadSkills() {
    const container = document.getElementById('skills-container');
    try {
      const res = await fetch('/api/skills');
      const json = await res.json();

      if (!json.success || !json.data || Object.keys(json.data).length === 0) {
        container.innerHTML = '<div class="empty-state"><p>Skills coming soon...</p></div>';
        return;
      }

      const categoryIcons = { Frontend: '🎨', Backend: '⚙️', Tools: '🛠️' };

      let html = '<div class="skills-grid">';
      for (const [category, skills] of Object.entries(json.data)) {
        html += `
          <div class="skill-category reveal">
            <h3 class="skill-category-title">
              <span>${categoryIcons[category] || '📦'}</span> ${category}
            </h3>
            ${skills
              .map(
                (skill) => `
              <div class="skill-item">
                <div class="skill-info">
                  <span class="skill-name">${skill.name}</span>
                  <span class="skill-level">${skill.proficiencyLevel}%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-bar-fill" data-width="${skill.proficiencyLevel}"></div>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        `;
      }
      html += '</div>';
      container.innerHTML = html;

      // Re-observe for scroll animations
      observeElements();
    } catch (error) {
      console.warn('Backend skills API unavailable, using local skills data:', error);
      const fallbackSkills = {
        Frontend: [
          { name: 'HTML5', proficiencyLevel: 95 },
          { name: 'CSS3 / Sass', proficiencyLevel: 90 },
          { name: 'JavaScript (ES6+)', proficiencyLevel: 92 },
          { name: 'React', proficiencyLevel: 85 },
          { name: 'Tailwind CSS', proficiencyLevel: 88 },
        ],
        Backend: [
          { name: 'Node.js', proficiencyLevel: 90 },
          { name: 'Express.js', proficiencyLevel: 88 },
          { name: 'MongoDB', proficiencyLevel: 85 },
          { name: 'REST APIs', proficiencyLevel: 92 },
        ],
        Tools: [
          { name: 'Git & GitHub', proficiencyLevel: 90 },
          { name: 'VS Code', proficiencyLevel: 95 },
          { name: 'Postman', proficiencyLevel: 85 },
          { name: 'Linux / CLI', proficiencyLevel: 82 },
        ],
      };

      const categoryIcons = { Frontend: '🎨', Backend: '⚙️', Tools: '🛠️' };
      let html = '<div class="skills-grid">';
      for (const [category, skills] of Object.entries(fallbackSkills)) {
        html += `
          <div class="skill-category reveal">
            <h3 class="skill-category-title">
              <span>${categoryIcons[category] || '📦'}</span> ${category}
            </h3>
            ${skills.map((skill) => `
              <div class="skill-item">
                <div class="skill-info">
                  <span class="skill-name">${skill.name}</span>
                  <span class="skill-level">${skill.proficiencyLevel}%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-bar-fill" data-width="${skill.proficiencyLevel}"></div>
                </div>
              </div>
            `).join('')}
          </div>
        `;
      }
      html += '</div>';
      container.innerHTML = html;
      observeElements();
    }
  }

  // ========================================
  // Fetch & Render Projects
  // ========================================
  async function loadProjects() {
    const container = document.getElementById('projects-container');
    let projectsData = [];

    try {
      const res = await fetch('/api/projects');
      const json = await res.json();
      if (json.success && json.data && json.data.length > 0) {
        projectsData = json.data;
      }
    } catch (apiErr) {
      console.warn('Backend projects API unavailable, fetching directly from GitHub API:', apiErr.message);
      try {
        const ghRes = await fetch('https://api.github.com/users/Nirjan4102/repos?sort=updated');
        if (ghRes.ok) {
          const ghRepos = await ghRes.json();
          projectsData = ghRepos.map((repo) => ({
            title: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
            description: repo.description || `Open-source web application built with ${repo.language || 'modern web technologies'}.`,
            techStack: [repo.language || 'JavaScript', ...(repo.topics || [])].filter(Boolean),
            liveUrl: repo.homepage || '',
            githubUrl: repo.html_url,
            featured: Boolean(repo.homepage),
          }));
        }
      } catch (ghErr) {
        console.error('Failed to fetch from GitHub API:', ghErr);
      }
    }

    if (!projectsData || projectsData.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>Projects coming soon...</p></div>';
      return;
    }

    let html = '<div class="projects-grid">';
    projectsData.forEach((project) => {
      const featuredBadge = project.featured
        ? '<span class="project-featured-badge">⭐ Featured</span>'
        : '';

      const techTags = (project.techStack || ['JavaScript'])
        .map((tech) => `<span class="tech-tag">${tech}</span>`)
        .join('');

      const liveLink = project.liveUrl
        ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">Live Demo</a>`
        : '';

      const githubLink = project.githubUrl
        ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline">GitHub</a>`
        : '';

      html += `
        <div class="project-card reveal">
          <div class="project-body">
            ${featuredBadge}
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">${techTags}</div>
            <div class="project-links">
              ${liveLink}
              ${githubLink}
            </div>
          </div>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
    observeElements();
  }

  // ========================================
  // Contact Form Handler
  // ========================================
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formStatus = document.getElementById('form-status');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formStatus.innerHTML = '';

    // Client-side validation
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const subject = contactForm.subject.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !subject || !message) {
      showStatus('Please fill in all fields.', 'error');
      return;
    }

    if (message.length < 10) {
      showStatus('Message must be at least 10 characters.', 'error');
      return;
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    // Show loading state
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        showStatus('Message sent successfully! I\'ll get back to you soon. 🎉', 'success');
        contactForm.reset();
      } else if (json.errors) {
        const errorMsg = json.errors.map((err) => err.msg).join(', ');
        showStatus(errorMsg, 'error');
      } else {
        showStatus(json.error || 'Something went wrong. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      showStatus('Network error. Please check your connection and try again.', 'error');
    } finally {
      setLoading(false);
    }
  });

  function setLoading(loading) {
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    submitBtn.disabled = loading;
    btnText.style.display = loading ? 'none' : 'inline';
    btnLoading.style.display = loading ? 'inline' : 'none';
  }

  function showStatus(message, type) {
    formStatus.innerHTML = `<div class="form-${type}">${message}</div>`;
    // Auto-clear after 5 seconds
    setTimeout(() => {
      formStatus.innerHTML = '';
    }, 5000);
  }

  // ========================================
  // Intersection Observer for Scroll Reveals
  // ========================================
  function observeElements() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate skill bars inside this element
            const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
            skillBars.forEach((bar) => {
              const width = bar.getAttribute('data-width');
              bar.style.width = `${width}%`;
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });
  }

  // ========================================
  // Footer Year
  // ========================================
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ========================================
  // Fetch & Render Profile
  // ========================================
  async function loadProfile() {
    try {
      const res = await fetch('/api/profile');
      const json = await res.json();
      if (!json.success || !json.data) return;

      const profile = json.data;
      const heroName = document.querySelector('.hero-name');
      if (heroName && profile.name) heroName.textContent = profile.name;

      const heroDesc = document.querySelector('.hero-description');
      if (heroDesc && profile.tagline) heroDesc.textContent = profile.tagline;
    } catch (err) {
      console.warn('Could not load profile dynamically:', err.message);
    }
  }

  // ========================================
  // Initialize
  // ========================================
  loadProfile();
  loadSkills();
  loadProjects();
  observeElements();
});
