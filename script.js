// Navbar scroll effect
let scrolling = false;
window.addEventListener('scroll', function () {
    if (!scrolling) {
        window.requestAnimationFrame(function () {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            scrolling = false;
        });
        scrolling = true;
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollPosition = window.scrollY + 150;

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + currentSection);
    });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Video filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const videoCards = document.querySelectorAll('.video-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        // Video kartlarını filtrele
        videoCards.forEach((card, index) => {
            // Önce tüm kartları gizle
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            setTimeout(() => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    // Küçük bir gecikme ile fade-in efekti
                    setTimeout(() => {
                        card.style.transition = 'all 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 50); // Her kart için kademeli animasyon
                } else {
                    card.style.display = 'none';
                }
            }, 200);
        });
    });
});

// Video Modal functionality
function openVideoModal(source) {
    const modal = document.getElementById('videoModal');
    const videoContainer = document.getElementById('videoContainer');

    // Temizle
    videoContainer.innerHTML = '';

    if (source.endsWith('.mp4')) {
        // Yerel MP4 Videosu
        videoContainer.innerHTML = `
            <video controls autoplay style="width: 100%; max-height: 80vh; border-radius: 10px; box-shadow: 0 5px 30px rgba(0,0,0,0.5);">
                <source src="${source}" type="video/mp4">
                Tarayıcınız video etiketini desteklemiyor.
            </video>
        `;
    } else {
        // Google Drive veya diğer linkler
        let embedUrl = source;

        if (source.includes('drive.google.com')) {
            // Google Drive linkini embed formatına çevir
            const fileId = source.match(/\/d\/(.+?)\//)?.[1] || source.match(/id=(.+?)(\&|$)/)?.[1];
            if (fileId) {
                embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
            }
        }

        // Embed player oluştur
        videoContainer.innerHTML = `
            <iframe 
                src="${embedUrl}" 
                width="100%" 
                height="600" 
                frameborder="0" 
                allow="autoplay; encrypted-media" 
                allowfullscreen
                style="border-radius: 10px; max-height: 80vh;">
            </iframe>
        `;
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const videoContainer = document.getElementById('videoContainer');

    // iframe'i kaldır (video otomatik durur)
    modal.style.display = 'none';
    videoContainer.innerHTML = '';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function (event) {
    const modal = document.getElementById('videoModal');
    if (event.target === modal) {
        closeVideoModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeVideoModal();
        closeImageModal();
    }
});

// Photo Gallery functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');

galleryItems.forEach(item => {
    item.addEventListener('click', function () {
        const img = this.querySelector('img');
        modalImage.src = img.src;
        imageModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

function closeImageModal() {
    imageModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close image modal when clicking outside
window.addEventListener('click', function (event) {
    if (event.target === imageModal) {
        closeImageModal();
    }
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Form verilerini al
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Burada form verilerini bir backend'e gönderebilir veya email servisi kullanabilirsiniz
    console.log('Form gönderildi:', { name, email, phone, message });

    // Başarı mesajı
    alert('Mesajınız başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.');

    // Formu temizle
    contactForm.reset();
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function () {
    const animatedElements = document.querySelectorAll('.service-card, .video-card, .reference-card, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

// Parallax effect removed for optimal performance and to eliminate lag

// Add fade-in animation CSS if not already in styles
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
setTimeout(() => {

document.getElementById("waPopup").style.display="block";

},2000);

setTimeout(() => {

document.getElementById("waPopup").style.display="none";

},10000);

function closeWaPopup(){

document.getElementById("waPopup").style.display="none";

}


document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".video-thumbnail video").forEach(v=>{v.muted=true;v.autoplay=true;v.loop=true;v.playsInline=true;const p=v.play();if(p){p.catch(()=>{});}});});

// Logo altındaki banner. Süre index.html içindeki data-interval-seconds alanındadır.
(function initHeroBanner() {
    const banner = document.querySelector('.hero-banner');
    if (!banner) return;

    const track = banner.querySelector('.hero-banner-track');
    const viewport = banner.querySelector('.hero-banner-viewport');
    const previous = banner.querySelector('.hero-banner-prev');
    const next = banner.querySelector('.hero-banner-next');
    const toolbar = banner.querySelector('.hero-banner-toolbar');
    const dots = banner.querySelector('.hero-banner-dots');
    const counter = banner.querySelector('.hero-banner-count');
    const countdown = banner.querySelector('.hero-banner-timer');
    const toggle = banner.querySelector('.hero-banner-toggle');
    const status = banner.querySelector('.hero-banner-status');
    const configuredSeconds = Number(banner.dataset.intervalSeconds);
    const seconds = Number.isFinite(configuredSeconds) && configuredSeconds >= 1
        ? configuredSeconds : 5;
    const duration = seconds * 1000;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let slides = Array.from(track.querySelectorAll('.hero-banner-slide'));
    let current = 0;
    let paused = reducedMotion.matches;
    let keyboardFocus = false;
    let pointerStart = null;
    let clock = null;
    let deadline = 0;

    function stopClock() {
        window.clearInterval(clock);
        clock = null;
    }

    function startClock() {
        stopClock();
        toggle.textContent = paused ? 'Oynat' : 'Duraklat';
        toggle.setAttribute('aria-label', paused ? 'Otomatik geçişi başlat' : 'Otomatik geçişi duraklat');
        toggle.setAttribute('aria-pressed', String(paused));
        if (slides.length < 2 || paused || keyboardFocus || document.hidden) {
            countdown.textContent = '—';
            return;
        }
        deadline = performance.now() + duration;
        countdown.textContent = Math.ceil(seconds) + ' sn';
        clock = window.setInterval(() => {
            const remaining = deadline - performance.now();
            if (remaining <= 0) {
                showSlide(current + 1);
            } else {
                countdown.textContent = Math.ceil(remaining / 1000) + ' sn';
            }
        }, 100);
    }

    function showSlide(index, announce = false) {
        if (!slides.length) return;
        current = (index + slides.length) % slides.length;
        track.style.transform = 'translateX(-' + current * 100 + '%)';
        slides.forEach((slide, i) => {
            slide.setAttribute('aria-hidden', String(i !== current));
            slide.inert = i !== current;
        });
        Array.from(dots.children).forEach((dot, i) => {
            dot.setAttribute('aria-current', String(i === current));
        });
        counter.textContent = (current + 1) + ' / ' + slides.length;
        if (announce) status.textContent = (current + 1) + '. görsel / ' + slides.length;
        startClock();
    }

    function refreshSlides() {
        slides = Array.from(track.querySelectorAll('.hero-banner-slide'));
        banner.hidden = slides.length === 0;
        previous.hidden = next.hidden = toolbar.hidden = slides.length < 2;
        dots.replaceChildren();
        slides.forEach((slide, i) => {
            slide.setAttribute('role', 'group');
            slide.setAttribute('aria-roledescription', 'slayt');
            slide.setAttribute('aria-label', (i + 1) + ' / ' + slides.length);
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'hero-banner-dot';
            dot.setAttribute('aria-label', (i + 1) + '. görsele git');
            dot.setAttribute('aria-controls', track.id);
            dot.addEventListener('click', () => showSlide(i, true));
            dots.appendChild(dot);
        });
        stopClock();
        if (slides.length) showSlide(Math.min(current, slides.length - 1));
    }

    previous.addEventListener('click', () => showSlide(current - 1, true));
    next.addEventListener('click', () => showSlide(current + 1, true));
    toggle.addEventListener('click', () => {
        paused = !paused;
        startClock();
    });
    banner.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            showSlide(current + (event.key === 'ArrowRight' ? 1 : -1), true);
        }
    });
    // Klavyeyle görsel seçerken otomatik geçiş bekler; fare tıklaması akışı durdurmaz.
    banner.addEventListener('focusin', event => {
        keyboardFocus = event.target !== toggle && event.target.matches(':focus-visible');
        startClock();
    });
    banner.addEventListener('focusout', event => {
        if (!banner.contains(event.relatedTarget)) {
            keyboardFocus = false;
            startClock();
        }
    });
    viewport.addEventListener('pointerdown', event => {
        if (event.pointerType !== 'touch' || !event.isPrimary || event.target.closest('button')) return;
        pointerStart = { x: event.clientX, y: event.clientY };
        viewport.setPointerCapture(event.pointerId);
        stopClock();
    });
    viewport.addEventListener('pointerup', event => {
        if (!pointerStart) return;
        const dx = event.clientX - pointerStart.x;
        const dy = event.clientY - pointerStart.y;
        pointerStart = null;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
            showSlide(current + (dx < 0 ? 1 : -1), true);
        } else {
            startClock();
        }
    });
    viewport.addEventListener('pointercancel', () => {
        pointerStart = null;
        startClock();
    });
    document.addEventListener('visibilitychange', startClock);
    reducedMotion.addEventListener('change', event => {
        paused = event.matches;
        startClock();
    });
    // Yanlış dosya adı ya da silinmiş görsel, ziyaretçiye boş banner göstermez.
    slides.forEach(slide => {
        const img = slide.querySelector('img');
        function skipMissingImage() {
            slide.remove();
            refreshSlides();
        }
        if (!img) {
            skipMissingImage();
            return;
        }
        img.draggable = false;
        img.addEventListener('error', skipMissingImage, { once: true });
        if (img.complete && img.naturalWidth === 0) skipMissingImage();
    });
    refreshSlides();
})();
