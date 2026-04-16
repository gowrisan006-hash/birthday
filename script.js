// Particle System (Floating Hearts)
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = 20;
    const types = ['❤️', '💖', '✨', '🎈', '🌸'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'heart';
        particle.innerHTML = types[Math.floor(Math.random() * types.length)];
        
        const size = Math.random() * 20 + 10;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;

        particle.style.fontSize = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.setProperty('--duration', `${duration}s`);
        particle.style.animationDelay = `${delay}s`;

        container.appendChild(particle);

        // Remove and recreate to keep it going
        particle.addEventListener('animationiteration', () => {
            particle.style.left = `${Math.random() * 100}%`;
        });
    }
}

// Typing Effect
function typeWriter(text, elementId, speed = 50, callback) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let i = 0;
    element.innerHTML = "";
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    
    type();
}

// Memory Reveal Logic
function initMemoryReveal() {
    const memoryBtn = document.getElementById('memoryBtn');
    const memorySlider = document.getElementById('memorySlider');

    if (memoryBtn && memorySlider) {
        memoryBtn.addEventListener('click', () => {
            memoryBtn.style.display = 'none'; // Hide button immediately
            spawnHeartBurst(); // Trigger colorful heart explosion
            
            // Wait for 1.2 seconds before showing the picture modal
            setTimeout(() => {
                memorySlider.style.display = 'block';
                setTimeout(() => {
                    memorySlider.classList.add('visible');
                    initSlider(); // Initialize slider logic once visible
                }, 10);
            }, 1200);
        });
    }
}

// Heart Burst Animation
function spawnHeartBurst() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    // Smooth central glowing aura instead of a giant rigid emoji
    const aura = document.createElement('div');
    aura.style.position = 'fixed';
    aura.style.left = '50%';
    aura.style.top = '50%';
    aura.style.width = '100px';
    aura.style.height = '100px';
    aura.style.borderRadius = '50%';
    aura.style.background = 'radial-gradient(circle, rgba(255,126,179,0.8) 0%, rgba(161,140,209,0) 70%)';
    aura.style.zIndex = '1900';
    aura.style.pointerEvents = 'none';
    aura.style.transform = `translate(-50%, -50%) scale(0)`;
    aura.style.transition = 'all 1.5s ease-out';
    container.appendChild(aura);
    
    setTimeout(() => {
        aura.style.transform = `translate(-50%, -50%) scale(15)`;
        aura.style.opacity = '0';
    }, 50);

    setTimeout(() => aura.remove(), 1500);
    
    // Natural floating hearts (blooming fountain effect)
    const heartTypes = ['❤️', '💖', '✨', '🤍', '🌸'];
    
    for(let i = 0; i < 40; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        
        heart.style.position = 'fixed';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.fontSize = (Math.random() * 25 + 10) + 'px';
        heart.style.zIndex = '2000';
        heart.style.pointerEvents = 'none';
        
        // Natural ease-out float
        heart.style.transition = `all ${Math.random() * 1.5 + 1}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        heart.style.transform = `translate(-50%, -50%) scale(0) rotate(0deg)`;
        heart.style.opacity = '1';
        container.appendChild(heart);
        
        setTimeout(() => {
            // Emulate gravity and wind (blooming mostly outwards and upwards)
            const angle = (Math.random() * Math.PI * 2); 
            const distance = Math.random() * 250 + 50; 
            const x = Math.cos(angle) * distance; 
            const y = Math.sin(angle) * distance - (Math.random() * 150); // slight upward bias
            
            // Gentle natural rotation
            const randomRotation = (Math.random() - 0.5) * 120;
            
            heart.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1) rotate(${randomRotation}deg)`;
            heart.style.opacity = '0';
        }, 50);

        setTimeout(() => {
            heart.remove();
        }, 2500);
    }
}



// Slider Logic
function initSlider() {
    const slides = document.getElementById('slides');
    const slideElements = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dotsContainer');
    
    if (!slides) return;

    let currentIndex = 0;
    const totalSlides = slideElements.length;

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.dot');

    function updateSlider() {
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    // Auto Slide
    let autoSlideInterval = setInterval(nextSlide, 5000);

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
}

// Music Logic
const musicBtn = document.getElementById('musicToggle');
const audio = document.getElementById('bgMusic');
let isPlaying = false;

if (musicBtn && audio) {
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            document.getElementById('musicIcon').innerHTML = '🎵';
        } else {
            audio.play().catch(e => console.log("Audio play failed, user interaction needed first"));
            document.getElementById('musicIcon').innerHTML = '⏸️';
        }
        isPlaying = !isPlaying;
    });

    // Attempt autoplay from script as fallback
    window.addEventListener('load', () => {
        setTimeout(() => {
            audio.play().then(() => {
                isPlaying = true;
                document.getElementById('musicIcon').innerHTML = '⏸️';
            }).catch(e => {
                console.log("Autoplay blocked by browser. User will need to manually click the play button.");
            });
        }, 300);
    });
}

// Initialize on load
window.addEventListener('load', () => {
    createParticles();
});
