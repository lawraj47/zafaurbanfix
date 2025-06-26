document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    

    // Initialize testimonial carousel
    if ($('.testimonial-carousel').length) {
        $('.testimonial-carousel').owlCarousel({
            loop: true,
            margin: 20,
            nav: true,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                }
            }
        });
    }

    // Smooth scrolling for anchor links
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        
        $('html, body').animate(
            {
                scrollTop: $($(this).attr('href')).offset().top - 70,
            },
            500,
            'linear'
        );
    });

 

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            document.querySelector('.navbar').classList.add('navbar-scrolled');
        } else {
            document.querySelector('.navbar').classList.remove('navbar-scrolled');
        }
    });

    // Form validation for contact page
    if (document.getElementById('contactForm')) {
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');
            
            if (name.value.trim() === '') {
                alert('Por favor ingrese su nombre');
                name.focus();
                return false;
            }
            
            if (email.value.trim() === '') {
                alert('Por favor ingrese su email');
                email.focus();
                return false;
            } else if (!isValidEmail(email.value)) {
                alert('Por favor ingrese un email válido');
                email.focus();
                return false;
            }
            
            if (message.value.trim() === '') {
                alert('Por favor ingrese su mensaje');
                message.focus();
                return false;
            }
            
            // Form submission would go here
            alert('Formulario enviado correctamente. Nos pondremos en contacto pronto.');
            contactForm.reset();
        });
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});