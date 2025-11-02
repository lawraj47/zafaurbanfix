document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Back to top button functionality
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Gallery item hover effects (if needed)
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

   

    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    

    // Service page specific logging
    const currentPage = window.location.pathname.split('/').pop();
    switch(currentPage) {
        case 'demoliciones.html':
            console.log('ZafaUrbanFix Demoliciones page loaded successfully');
            break;
        case 'limpieza.html':
            console.log('ZafaUrbanFix Limpieza page loaded successfully');
            break;
        case 'pintura.html':
            console.log('ZafaUrbanFix Pintura page loaded successfully');
            break;
        case 'reformas.html':
            console.log('ZafaUrbanFix Reformas page loaded successfully');
            break;
        case 'vaciados.html':
            console.log('ZafaUrbanFix Vaciados page loaded successfully');
            break;
        default:
            console.log('ZafaUrbanFix page loaded successfully');
    }
});

// Additional utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}


document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapse) bsCollapse.hide();
    });
  });
});


// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const location = document.getElementById('location').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !service || !message) {
            alert('Por favor, complete todos los campos obligatorios.');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Por favor, introduzca una dirección de email válida.');
            return;
        }
        
        // Form submission would typically be done via AJAX here
        console.log('Contact form submitted:', {
            name, email, phone, service, location, message
        });
        
        // Show success message
        alert('¡Gracias por su mensaje! Nos pondremos en contacto con usted en menos de 24 horas.');
        
        // Reset form
        contactForm.reset();
    });
}


     const filterBtns = document.querySelectorAll('.filter-btn');
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterBtns.forEach(b => b.classList.remove('active'));
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    const filterValue = this.getAttribute('data-filter');
                    
                    galleryItems.forEach(item => {
                        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });
// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
            submitBtn.disabled = true;
            
            // Send form data
            fetch(this.action, {
                method: 'POST',
                body: new FormData(this)
            })
            .then(response => response.text())
            .then(data => {
                if (data === 'success') {
                    // Show success message
                    showAlert('Mensaje enviado correctamente. Te contactaremos pronto.', 'success');
                    contactForm.reset();
                } else {
                    // Show error message
                    showAlert('Error al enviar el mensaje. Por favor, inténtalo de nuevo.', 'danger');
                }
            })
            .catch(error => {
                showAlert('Error de conexión. Por favor, inténtalo de nuevo.', 'danger');
            })
            .finally(() => {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }
    
    function showAlert(message, type) {
        // Remove existing alerts
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create new alert
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        // Insert after form
        const form = document.getElementById('contactForm');
        form.parentNode.insertBefore(alertDiv, form);
        
        // Auto dismiss after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
});
