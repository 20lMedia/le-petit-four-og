// Wait for document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('nav');
    const navOverlay = document.querySelector('.nav-overlay');
    const navLinks = document.querySelectorAll('nav a');
    
    // Toggle mobile navigation
    function toggleMobileNav() {
        mobileToggle.classList.toggle('active');
        nav.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    }
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileNav);
        
        // Close navigation when clicking the overlay
        navOverlay.addEventListener('click', toggleMobileNav);
        
        // Close navigation when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (nav.classList.contains('active')) {
                    toggleMobileNav();
                }
            });
        });
        
        // Close navigation on resize if wider than mobile breakpoint
        window.addEventListener('resize', function() {
            if (window.innerWidth > 992 && nav.classList.contains('active')) {
                toggleMobileNav();
            }
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Premium Scroll Indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            // Get the about section for more precise scrolling
            const aboutSection = document.querySelector('#about');
            
            if (aboutSection) {
                // Adjust offset based on screen size
                let headerOffset = window.innerWidth > 768 ? 70 : 60;
                const scrollTarget = aboutSection.offsetTop - headerOffset;
                
                window.scrollTo({
                    top: scrollTarget,
                    behavior: 'smooth'
                });
            } else {
                // Fallback to approximate height if section not found
                window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Testimonials Slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    let testimonialInterval;

    if (testimonialItems.length > 0) {
        // Initialize testimonial slider
        startTestimonialSlider();

        // Click on dots to navigate
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showTestimonial(index);
            });
        });

        // Pause slider on hover
        const testimonialSlider = document.querySelector('.testimonials-slider');
        testimonialSlider.addEventListener('mouseenter', function() {
            clearInterval(testimonialInterval);
        });

        testimonialSlider.addEventListener('mouseleave', function() {
            startTestimonialSlider();
        });
    }

    function startTestimonialSlider() {
        testimonialInterval = setInterval(function() {
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    function showTestimonial(index) {
        testimonialItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialItems[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentTestimonial = index;
    }

    // Enhanced Menu Interaction
    const menuCategories = document.querySelectorAll('.menu-category');
    
    menuCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });
        
        category.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    const smoothScrollLinks = document.querySelectorAll('nav a, .scroll-indicator, .menu-cta a, .footer-column a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default for links pointing to sections
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Adjust offset based on screen size
                    let headerOffset = window.innerWidth > 768 ? 70 : 60;
                    const offsetTop = targetSection.offsetTop - headerOffset;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Reveal animations on scroll with enhanced effects
    const revealElements = document.querySelectorAll('.container, .decorative-divider');
    
    const revealOnScroll = function() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            // Adjust visible threshold based on screen size
            const elementVisible = window.innerHeight > 768 ? 150 : 100;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    // Add active class to containers
    revealElements.forEach(element => {
        element.classList.add('reveal');
    });
    
    // Call the function on load and scroll
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Newsletter Form Interaction
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
                emailInput.classList.add('error');
                return;
            }
            
            // Success animation
            emailInput.classList.remove('error');
            emailInput.value = '';
            emailInput.placeholder = 'Thank you for subscribing!';
            emailInput.disabled = true;
            
            // Reset after delay
            setTimeout(() => {
                emailInput.disabled = false;
                emailInput.placeholder = 'Your email';
            }, 3000);
        });
    }

    // Add hover effect to menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });

    // Form validation
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Simple validation
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Please enter your name');
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Please enter a message');
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // In a real application, you would submit the form data here
                showSuccessMessage(contactForm);
            }
        });
    }
    
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        
        input.classList.add('error');
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        input.classList.remove('error');
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showSuccessMessage(form) {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Your message has been sent successfully!';
        
        form.innerHTML = '';
        form.appendChild(successMessage);
    }

    // Gallery functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryModal = document.querySelector('.gallery-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalImage = document.querySelector('.modal-image .image-placeholder');
    const modalTitle = document.querySelector('.modal-caption h3');
    const modalDesc = document.querySelector('.modal-caption p');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    
    let currentIndex = 0;
    let filteredItems = [...galleryItems];
    
    // Filter gallery items
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filter items
                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || filter === category) {
                        item.style.display = 'flex';
                        // Add animation
                        item.classList.remove('fadeInUp');
                        void item.offsetWidth; // Trigger reflow
                        item.classList.add('fadeInUp');
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                // Update filtered items array for modal navigation
                filteredItems = [...galleryItems].filter(item => {
                    const category = item.getAttribute('data-category');
                    return filter === 'all' || filter === category;
                });
            });
        });
    }
    
    // Open modal when clicking gallery item
    if (galleryItems.length > 0 && galleryModal) {
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                const imageElement = this.querySelector('.gallery-image .image-placeholder');
                const titleElement = this.querySelector('.gallery-caption h4');
                const descElement = this.querySelector('.gallery-caption p');
                
                // Set modal content
                modalImage.textContent = imageElement.textContent;
                modalTitle.textContent = titleElement.textContent;
                modalDesc.textContent = descElement.textContent;
                
                // Save current index for navigation
                currentIndex = filteredItems.indexOf(this);
                
                // Open modal
                galleryModal.classList.add('open');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });
    }
    
    // Close modal
    if (modalClose && galleryModal) {
        modalClose.addEventListener('click', function() {
            galleryModal.classList.remove('open');
            document.body.style.overflow = 'auto'; // Enable scrolling
        });
        
        // Close modal when clicking outside content
        galleryModal.addEventListener('click', function(e) {
            if (e.target === galleryModal) {
                galleryModal.classList.remove('open');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && galleryModal.classList.contains('open')) {
                galleryModal.classList.remove('open');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Modal navigation
    if (prevBtn && nextBtn && galleryModal) {
        // Next image
        nextBtn.addEventListener('click', function() {
            if (filteredItems.length <= 1) return;
            
            currentIndex = (currentIndex + 1) % filteredItems.length;
            updateModalContent(currentIndex);
        });
        
        // Previous image
        prevBtn.addEventListener('click', function() {
            if (filteredItems.length <= 1) return;
            
            currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
            updateModalContent(currentIndex);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!galleryModal.classList.contains('open')) return;
            
            if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'ArrowLeft') {
                prevBtn.click();
            }
        });
    }
    
    function updateModalContent(index) {
        const item = filteredItems[index];
        const imageElement = item.querySelector('.gallery-image .image-placeholder');
        const titleElement = item.querySelector('.gallery-caption h4');
        const descElement = item.querySelector('.gallery-caption p');
        
        // Update modal content with animation
        modalImage.style.opacity = 0;
        modalTitle.style.opacity = 0;
        modalDesc.style.opacity = 0;
        
        setTimeout(() => {
            modalImage.textContent = imageElement.textContent;
            modalTitle.textContent = titleElement.textContent;
            modalDesc.textContent = descElement.textContent;
            
            modalImage.style.opacity = 1;
            modalTitle.style.opacity = 1;
            modalDesc.style.opacity = 1;
        }, 300);
    }

    // Add touch swipe for gallery and testimonials
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Touch swipe for testimonials
    if (testimonialItems.length > 0) {
        const testimonialSlider = document.querySelector('.testimonials-slider');
        
        testimonialSlider.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        testimonialSlider.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // Swipe left, show next
                currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
                showTestimonial(currentTestimonial);
            }
            
            if (touchEndX > touchStartX + 50) {
                // Swipe right, show previous
                currentTestimonial = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length;
                showTestimonial(currentTestimonial);
            }
        }
    }
    
    // Touch swipe for gallery modal
    if (galleryModal) {
        galleryModal.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        galleryModal.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleModalSwipe();
        }, false);
        
        function handleModalSwipe() {
            if (!galleryModal.classList.contains('open')) return;
            
            if (touchEndX < touchStartX - 50 && nextBtn) {
                // Swipe left, show next
                nextBtn.click();
            }
            
            if (touchEndX > touchStartX + 50 && prevBtn) {
                // Swipe right, show previous
                prevBtn.click();
            }
        }
    }

    // Premium button hover effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('btn-hover');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('btn-hover');
        });
    });
});

// Add parallax effect to hero section with enhanced depth
window.addEventListener('scroll', function() {
    const heroSection = document.querySelector('.hero');
    const scrollY = window.scrollY;
    
    if (heroSection) {
        // Enhanced parallax with depth effect
        // Only apply parallax on devices that can handle it (disable on low-power devices)
        if (window.matchMedia('(min-width: 768px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            heroSection.style.backgroundPositionY = scrollY * 0.5 + 'px';
            
            // Fade out content slightly on scroll
            const heroContent = document.querySelector('.hero-content');
            if (heroContent && scrollY < window.innerHeight) {
                const opacity = 1 - (scrollY / (window.innerHeight * 0.5)) * 0.5;
                heroContent.style.opacity = Math.max(opacity, 0.5);
                heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
            }
        }
    }
    
    // Decorative dividers parallax - only apply on non-mobile
    if (window.matchMedia('(min-width: 768px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const dividers = document.querySelectorAll('.decorative-divider');
        dividers.forEach(divider => {
            const dividerTop = divider.getBoundingClientRect().top + scrollY;
            const distanceFromTop = scrollY - dividerTop;
            
            if (Math.abs(distanceFromTop) < window.innerHeight) {
                const dividerIcon = divider.querySelector('.divider-icon');
                if (dividerIcon) {
                    dividerIcon.style.transform = `rotate(${distanceFromTop * 0.02}deg)`;
                }
            }
        });
    }
}); 