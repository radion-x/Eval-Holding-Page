$(document).ready(function() {
    // Initialize the page
    initializeAnimations();
    createParticles();
    startProgressAnimation();
    startCountdown();
    
    // Initialize all animations
    function initializeAnimations() {
        // No typing animation logic needed - CSS handles it
        
        // Add hover effects to feature items
        $('.feature-item').hover(
            function() {
                $(this).css('transform', 'translateY(-10px) scale(1.05)');
            },
            function() {
                $(this).css('transform', 'translateY(0) scale(1)');
            }
        );
        
        // Medical icon pulse interaction
        $('.medical-icon i').click(function() {
            $(this).addClass('fa-pulse');
            setTimeout(() => {
                $(this).removeClass('fa-pulse');
            }, 2000);
        });
    }
    
    // Create floating particles
    function createParticles() {
        const particleContainer = $('#particles');
        const particleCount = 15;
        
        for (let i = 0; i < particleCount; i++) {
            createParticle(particleContainer);
        }
        
        // Create new particles periodically
        setInterval(function() {
            createParticle(particleContainer);
        }, 3000);
    }
    
    function createParticle(container) {
        const particle = $('<div class="particle"></div>');
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 10 + 8; // 8-18 seconds
        const delay = Math.random() * 2; // 0-2 seconds delay
        
        particle.css({
            left: startX + 'px',
            animationDuration: duration + 's',
            animationDelay: delay + 's'
        });
        
        container.append(particle);
        
        // Remove particle after animation
        setTimeout(function() {
            particle.remove();
        }, (duration + delay) * 1000);
    }
    
    // Progress bar animation
    function startProgressAnimation() {
        let progress = 0;
        const targetProgress = 75;
        const animationDuration = 10000; // 10 seconds
        const intervalTime = 50; // Update every 50ms
        const increment = (targetProgress / animationDuration) * intervalTime;
        
        setTimeout(function() {
            const progressInterval = setInterval(function() {
                progress += increment;
                
                if (progress >= targetProgress) {
                    progress = targetProgress;
                    clearInterval(progressInterval);
                }
                
                $('.progress-percentage').text(Math.round(progress) + '%');
            }, intervalTime);
        }, 3500); // Start after 3.5 seconds
    }
    
    // Countdown timer
    function startCountdown() {
        // Set target time to 2 hours from now
        const targetTime = new Date().getTime() + (2 * 60 * 60 * 1000);
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetTime - now;
            
            if (distance > 0) {
                const hours = Math.floor(distance / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                $('#countdown').text(timeString);
            } else {
                $('#countdown').text('00:00:00');
            }
        }
        
        // Update immediately and then every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // Add smooth scrolling effect (if content becomes scrollable)
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });
    
    // Handle window resize for responsive adjustments
    $(window).on('resize', function() {
        // Adjust typing animation container for mobile
        const titleText = $('.typing-text').data('text');
        if (window.innerWidth <= 768) {
            if (titleText.length > 20) {
                $('.main-title').css('height', 'auto');
                $('.main-title').css('min-height', '2.8rem');
                $('.main-title').css('padding', '0.5rem 0');
            }
        } else {
            $('.main-title').css('height', '4.2rem');
            $('.main-title').css('padding', '0');
        }
    });
    
    // Handle visibility change (tab switching)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            $('title').text('🏥 Please come back - Maintenance in progress');
        } else {
            $('title').text('Dr. Martinez Spinal Surgery - Maintenance');
        }
    });
    
    // Add special effects for different times of day
    function adjustForTimeOfDay() {
        const hour = new Date().getHours();
        let greeting = '';
        
        if (hour >= 5 && hour < 12) {
            greeting = 'Good morning! ';
        } else if (hour >= 12 && hour < 17) {
            greeting = 'Good afternoon! ';
        } else if (hour >= 17 && hour < 22) {
            greeting = 'Good evening! ';
        } else {
            greeting = 'Working late? ';
        }
        
        // Update the description with time-appropriate greeting
        const originalText = $('.description').text();
        if (!originalText.includes('Good')) {
            $('.description').text(greeting + originalText);
        }
    }
    
    // Apply time-based adjustments after initial animations
    setTimeout(adjustForTimeOfDay, 5000);
    
    // Mobile optimization for typing animation
    // Check on load and after animation completes
    setTimeout(function() {
        if (window.innerWidth <= 768) {
            const titleElement = $('.main-title');
            const typingElement = $('.typing-text');
            
            // Ensure text doesn't overflow on small screens
            if (typingElement.width() > titleElement.width()) {
                titleElement.css('height', 'auto');
                titleElement.css('min-height', '2.8rem');
            }
        }
    }, 6000); // Check after typing animation (4s) + delay (1s) + buffer
});
