$(document).ready(function() {
    // Initialize the page
    initializeAnimations();
    createParticles();
    startProgressAnimation();
    startCountdown();
    
    // Typing animation for main title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.text('');
        
        function type() {
            if (i < text.length) {
                element.text(element.text() + text.charAt(i));
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Initialize all animations
    function initializeAnimations() {
        // Start typing animation after a delay
        setTimeout(function() {
            const titleText = $('.typing-text').data('text');
            typeWriter($('.typing-text'), titleText, 120);
        }, 1000);
        
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
    
    // Easter egg: Konami code for admin access
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
    
    $(document).keydown(function(event) {
        konamiCode.push(event.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            showAdminPanel();
            konamiCode = [];
        }
    });
    
    function showAdminPanel() {
        const adminPanel = $(`
            <div id="admin-panel" style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 2rem;
                border-radius: 10px;
                z-index: 1000;
                text-align: center;
                border: 2px solid #4fd1c7;
            ">
                <h3>🏥 Admin Access Detected</h3>
                <p>System status: Upgrading patient care systems</p>
                <p>Database integrity: ✅ 100%</p>
                <p>Security protocols: ✅ Active</p>
                <button id="close-admin" style="
                    margin-top: 1rem;
                    padding: 0.5rem 1rem;
                    background: #4fd1c7;
                    color: black;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                ">Close</button>
            </div>
        `);
        
        $('body').append(adminPanel);
        adminPanel.hide().fadeIn(500);
        
        $('#close-admin').click(function() {
            adminPanel.fadeOut(500, function() {
                adminPanel.remove();
            });
        });
        
        // Auto-close after 10 seconds
        setTimeout(function() {
            if ($('#admin-panel').length) {
                $('#admin-panel').fadeOut(500, function() {
                    $(this).remove();
                });
            }
        }, 10000);
    }
    
    // Add glitch effect to medical icon occasionally
    function addGlitchEffect() {
        const medicalIcon = $('.medical-icon i');
        medicalIcon.addClass('glitch-effect');
        
        setTimeout(function() {
            medicalIcon.removeClass('glitch-effect');
        }, 500);
    }
    
    // Trigger glitch effect randomly
    setInterval(function() {
        if (Math.random() < 0.1) { // 10% chance every 5 seconds
            addGlitchEffect();
        }
    }, 5000);
    
    // Add CSS for glitch effect dynamically
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .glitch-effect {
                animation: glitch 0.5s !important;
            }
            
            @keyframes glitch {
                0% { transform: scale(1) skew(0deg); filter: hue-rotate(0deg); }
                10% { transform: scale(1.05) skew(1deg); filter: hue-rotate(90deg); }
                20% { transform: scale(0.95) skew(-1deg); filter: hue-rotate(180deg); }
                30% { transform: scale(1.02) skew(0.5deg); filter: hue-rotate(270deg); }
                40% { transform: scale(0.98) skew(-0.5deg); filter: hue-rotate(0deg); }
                50% { transform: scale(1.01) skew(0.2deg); filter: hue-rotate(45deg); }
                60% { transform: scale(0.99) skew(-0.2deg); filter: hue-rotate(135deg); }
                70% { transform: scale(1.03) skew(0.3deg); filter: hue-rotate(225deg); }
                80% { transform: scale(0.97) skew(-0.3deg); filter: hue-rotate(315deg); }
                90% { transform: scale(1.01) skew(0.1deg); filter: hue-rotate(45deg); }
                100% { transform: scale(1) skew(0deg); filter: hue-rotate(0deg); }
            }
        `)
        .appendTo('head');
    
    // Console message for developers
    console.log('%c🏥 Spinal Surgery Center - Maintenance Mode', 'color: #4fd1c7; font-size: 18px; font-weight: bold;');
    console.log('%cSystem Status: Upgrading for better patient care', 'color: #667eea; font-size: 12px;');
    console.log('%cEstimated completion: 2 hours', 'color: #764ba2; font-size: 12px;');
    
    // Performance monitoring
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`%cPage loaded in ${Math.round(loadTime)}ms`, 'color: #4fd1c7; font-size: 12px;');
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
});
