// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            const isActive = navMenu.style.display === 'flex';
            
            if (isActive) {
                navMenu.style.display = 'none';
                mobileToggle.classList.remove('active');
            } else {
                navMenu.style.display = 'flex';
                mobileToggle.classList.add('active');
                
                // Position menu below header
                const headerHeight = document.querySelector('.header').offsetHeight;
                navMenu.style.top = `${headerHeight + 20}px`;
                navMenu.style.left = '20px';
                navMenu.style.right = '20px';
                navMenu.style.position = 'fixed';
                navMenu.style.flexDirection = 'column';
                navMenu.style.background = 'var(--glass-bg)';
                navMenu.style.backdropFilter = 'blur(10px)';
                navMenu.style.borderRadius = 'var(--border-radius-lg)';
                navMenu.style.padding = '20px';
                navMenu.style.zIndex = '1000';
                navMenu.style.border = '1px solid var(--glass-border)';
                navMenu.style.boxShadow = 'var(--glass-shadow)';
            }
        });
    }
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                navMenu.style.display = 'none';
                mobileToggle.classList.remove('active');
            }
        });
    });
    
    // Animated counter for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
    
    // Start counters when in viewport
    function checkCounters() {
        statNumbers.forEach(stat => {
            const rect = stat.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100 && !stat.classList.contains('animated')) {
                stat.classList.add('animated');
                animateCounter(stat);
            }
        });
    }
    
    // Initial check
    checkCounters();
    
    // Check on scroll
    window.addEventListener('scroll', checkCounters);
    
    // Modal functionality
    const signupBtn = document.getElementById('signup-btn');
    const modal = document.getElementById('signup-modal');
    const modalClose = document.querySelector('.modal-close');
    
    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Coverage form submission
    const coverageForm = document.querySelector('.coverage-form .form-btn');
    const coverageResult = document.querySelector('.coverage-result');
    
    if (coverageForm) {
        coverageForm.addEventListener('click', function(e) {
            e.preventDefault();
            const addressInput = document.querySelector('.form-input');
            
            if (addressInput.value.trim() === '') {
                addressInput.style.borderColor = 'var(--accent)';
                addressInput.focus();
                return;
            }
            
            // Show loading
            coverageResult.innerHTML = `
                <div class="result-icon">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
                <div class="result-text">
                    <h4>Checking availability...</h4>
                    <p>Searching our database</p>
                </div>
            `;
            coverageResult.style.display = 'flex';
            
            // Simulate API call
            setTimeout(() => {
                // Random result (80% chance of availability)
                const isAvailable = Math.random() > 0.2;
                
                if (isAvailable) {
                    coverageResult.innerHTML = `
                        <div class="result-icon">
                            <i class="fas fa-check"></i>
                        </div>
                        <div class="result-text">
                            <h4>Available at your location!</h4>
                            <p>Speeds up to 2.5Gbps are available</p>
                        </div>
                        <button class="btn btn-small">Sign Up Now</button>
                    `;
                    coverageResult.style.background = 'rgba(0, 255, 170, 0.1)';
                    coverageResult.style.borderColor = 'rgba(0, 255, 170, 0.2)';
                } else {
                    coverageResult.innerHTML = `
                        <div class="result-icon">
                            <i class="fas fa-times"></i>
                        </div>
                        <div class="result-text">
                            <h4>Not currently available</h4>
                            <p>We're expanding our network</p>
                        </div>
                        <button class="btn btn-small">Join Waitlist</button>
                    `;
                    coverageResult.style.background = 'rgba(255, 51, 102, 0.1)';
                    coverageResult.style.borderColor = 'rgba(255, 51, 102, 0.2)';
                }
            }, 1500);
        });
    }
    
    // Plan selection animation
    const planButtons = document.querySelectorAll('.plan-btn');
    
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planCard = this.closest('.plan-card');
            const planName = planCard.querySelector('h3').textContent;
            const planPrice = planCard.querySelector('.plan-price').textContent;
            
            // Add animation class
            planCard.classList.add('selected');
            
            // Remove after animation
            setTimeout(() => {
                planCard.classList.remove('selected');
                
                // Open modal with plan details
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Update modal title
                const modalTitle = modal.querySelector('.modal-header h3');
                modalTitle.textContent = `Get Started with ${planName}`;
                
                // Add plan info to form
                const form = modal.querySelector('.signup-form');
                const planInput = document.createElement('input');
                planInput.type = 'hidden';
                planInput.name = 'selected_plan';
                planInput.value = `${planName} - ${planPrice}`;
                form.appendChild(planInput);
            }, 300);
        });
    });
    
    // Form submission
    const signupForm = document.querySelector('.signup-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message
            const modalBody = modal.querySelector('.modal-body');
            modalBody.innerHTML = `
                <div style="text-align: center; padding: 40px 20px;">
                    <div style="width: 80px; height: 80px; background: var(--secondary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 30px;">
                        <i class="fas fa-check" style="font-size: 2rem; color: var(--dark);"></i>
                    </div>
                    <h3 style="font-size: 1.8rem; margin-bottom: 15px;">Application Submitted!</h3>
                    <p style="color: var(--gray); margin-bottom: 30px;">Thank you for choosing NexusNet. Our team will contact you within 24 hours to complete your setup.</p>
                    <button class="btn btn-primary" id="close-modal">Close</button>
                </div>
            `;
            
            // Add event listener to close button
            setTimeout(() => {
                document.getElementById('close-modal').addEventListener('click', function() {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    location.reload(); // Reset form
                });
            }, 100);
            
            // Log data (in real implementation, send to server)
            console.log('Form submitted:', data);
        });
    }
    
    // Parallax effect on scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // Move floating elements
            const floatingElements = document.querySelectorAll('.floating-element');
            floatingElements.forEach((el, index) => {
                const speed = 0.1 + (index * 0.05);
                el.style.transform = `translateY(${rate * speed}px)`;
            });
            
            // Update active nav link
            updateActiveNavLink();
        }, 10);
    });
    
    // Active nav link on scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Initialize
    updateActiveNavLink();
    
    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Speedometer needle animation
    function updateSpeedometer() {
        const needle = document.querySelector('.needle');
        if (!needle) return;
        
        // Random speed between 2.0 and 2.5 Gbps
        const speed = 2.0 + Math.random() * 0.5;
        const speedValue = document.querySelector('.speed-value');
        const angle = 30 + (speed - 2.0) * 60; // Map 2.0-2.5 to 30-60 degrees
        
        // Smooth animation
        needle.style.transition = 'transform 1s ease-in-out';
        needle.style.transform = `translate(-50%, -100%) rotate(${angle}deg)`;
        
        // Update speed display
        if (speedValue) {
            speedValue.textContent = speed.toFixed(1);
        }
    }
    
    // Update speedometer every few seconds
    setInterval(updateSpeedometer, 3000);
    
    // Initialize speedometer
    updateSpeedometer();
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.width = '100px';
            ripple.style.height = '100px';
            ripple.style.marginLeft = '-50px';
            ripple.style.marginTop = '-50px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});