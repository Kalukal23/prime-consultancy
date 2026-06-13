// API Base URL (change to your backend URL when deployed)
const API_URL = 'http://localhost:5000/api';

// Load data when page loads
document.addEventListener('DOMContentLoaded', () => {
  loadServices();
  loadTestimonials();
  loadStats();
  loadFeatures();
  setupForms();
  setupMobileMenu();
});

// Load services from API
async function loadServices() {
  try {
    const response = await fetch(`${API_URL}/services`);
    const services = await response.json();
    
    const servicesGrid = document.getElementById('servicesGrid');
    if (!servicesGrid) return;
    
    servicesGrid.innerHTML = services.map(service => `
      <div class="service-card">
        <div class="service-icon"><i class="fas fa-${service.icon}"></i></div>
        <h3>${service.title}</h3>
        <p>${service.description.substring(0, 120)}...</p>
        <a href="#appointment" class="learn-more" style="color: var(--orange-cta); font-weight: 600;">Learn More →</a>
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading services:', error);
    // Fallback content
    document.getElementById('servicesGrid').innerHTML = '<p>Loading services...</p>';
  }
}

// Load testimonials
async function loadTestimonials() {
  try {
    const response = await fetch(`${API_URL}/testimonials`);
    const testimonials = await response.json();
    
    const grid = document.getElementById('testimonialsGrid');
    if (!grid) return;
    
    if (testimonials.length === 0) {
      // Default testimonials if none in DB
      grid.innerHTML = getDefaultTestimonials();
    } else {
      grid.innerHTML = testimonials.map(t => `
        <div class="testimonial-card">
          <div class="stars">${'★'.repeat(t.rating)}${'☆'.repeat(5-t.rating)}</div>
          <div class="quote-text">"${t.content}"</div>
          <div class="author">
            <div class="author-avatar">${t.clientName.charAt(0)}</div>
            <div><strong>${t.clientName}</strong><br>${t.company || ''}</div>
          </div>
        </div>
      `).join('');
    }
  } catch (error) {
    document.getElementById('testimonialsGrid').innerHTML = getDefaultTestimonials();
  }
}

function getDefaultTestimonials() {
  return `
    <div class="testimonial-card">
      <div class="stars">★★★★★</div>
      <div class="quote-text">"Prime Consultancy transformed our business strategy. Their insights were invaluable."</div>
      <div class="author"><div class="author-avatar">AT</div><div><strong>Abebe Tadesse</strong><br>CEO, Tech Solutions</div></div>
    </div>
    <div class="testimonial-card">
      <div class="stars">★★★★★</div>
      <div class="quote-text">"Professional, data-driven, and deeply committed to our organization's growth."</div>
      <div class="author"><div class="author-avatar">SM</div><div><strong>Sara Mohammed</strong><br>Director, Green Agri</div></div>
    </div>
    <div class="testimonial-card">
      <div class="stars">★★★★★</div>
      <div class="quote-text">"Their feasibility study was thorough and enabled confident investment decisions."</div>
      <div class="author"><div class="author-avatar">DB</div><div><strong>Dawit Bekele</strong><br>National Bank</div></div>
    </div>
  `;
}

// Load stats
function loadStats() {
  const statsContainer = document.getElementById('statsContainer');
  if (statsContainer) {
    statsContainer.innerHTML = `
      <div class="stat-item"><h3>50+</h3><p>Projects Completed</p></div>
      <div class="stat-item"><h3>25+</h3><p>Expert Consultants</p></div>
      <div class="stat-item"><h3>100%</h3><p>Client Satisfaction</p></div>
    `;
  }
}

// Load features
function loadFeatures() {
  const featuresList = document.getElementById('featuresList');
  if (featuresList) {
    featuresList.innerHTML = `
      <div class="feature-item"><div class="feature-icon"><i class="fas fa-check"></i></div><div><h4>Expert Consultants</h4><p>Experienced professionals with multidisciplinary expertise</p></div></div>
      <div class="feature-item"><div class="feature-icon"><i class="fas fa-chart-line"></i></div><div><h4>Results-Oriented Approach</h4><p>Solutions focused on measurable outcomes</p></div></div>
      <div class="feature-item"><div class="feature-icon"><i class="fas fa-industry"></i></div><div><h4>Industry Experience</h4><p>Serving public, private, and nonprofit sectors</p></div></div>
      <div class="feature-item"><div class="feature-icon"><i class="fas fa-pen-ruler"></i></div><div><h4>Customized Solutions</h4><p>Tailored recommendations for every client</p></div></div>
    `;
  }
}

// Setup form submissions
function setupForms() {
  // Appointment form
  const appointmentForm = document.getElementById('appointmentForm');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        company: document.getElementById('company').value,
        service: document.getElementById('service').value,
        preferredDate: document.getElementById('preferredDate').value,
      };
      
      try {
        const response = await fetch(`${API_URL}/appointments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        
        const result = await response.json();
        showMessage('formMessage', result.message || 'Appointment request sent!', 'success');
        appointmentForm.reset();
      } catch (error) {
        showMessage('formMessage', 'Error submitting form. Please try again.', 'error');
      }
    });
  }
  
  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = {
        fullName: document.getElementById('msgName').value,
        email: document.getElementById('msgEmail').value,
        companyName: document.getElementById('msgCompany').value,
        phone: document.getElementById('msgPhone').value,
        service: document.getElementById('msgService').value,
        message: document.getElementById('msgMessage').value,
      };
      
      try {
        const response = await fetch(`${API_URL}/contacts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        
        const result = await response.json();
        showMessage('contactMessage', result.message || 'Message sent successfully!', 'success');
        contactForm.reset();
      } catch (error) {
        showMessage('contactMessage', 'Error sending message. Please try again.', 'error');
      }
    });
  }
}

function showMessage(elementId, message, type) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = message;
    element.className = `form-message ${type}`;
    setTimeout(() => {
      element.style.display = 'none';
    }, 5000);
  }
}

function setupMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
}