// My first JavaScript program

if (typeof emailjs !== "undefined") {
    emailjs.init("37WAMkFLkR4MUq3I9");
}
// =========================================
// SCROLL REVEAL ANIMATION
// =========================================

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", function () {

    reveals.forEach(function(section){

        const windowHeight = window.innerHeight;

        const sectionTop = section.getBoundingClientRect().top;

        const revealPoint = 120;

        if(sectionTop < windowHeight - revealPoint){

            section.classList.add("active");

        }

    });
});
// =========================================
// STATS COUNTERS (animate once when scrolled into view)
// =========================================

const statsSection = document.querySelector(".stats");
const counters = document.querySelectorAll(".counter");

function animateCounter(counter) {

    const target = +counter.getAttribute("data-target");
    const suffix = counter.getAttribute("data-suffix") || "";

    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 100));

    function tick() {

        current += increment;

        if (current >= target) {
            counter.innerText = target + suffix;
            return;
        }

        counter.innerText = current;
        setTimeout(tick, 20);

    }

    tick();

}

if (statsSection && counters.length > 0) {

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    counters.forEach(animateCounter);

                    observer.disconnect();

                }

            });

        }, { threshold: 0.3 });

        observer.observe(statsSection);

    } else {

        counters.forEach(function (counter) {
            counter.innerText = (+counter.getAttribute("data-target")) + (counter.getAttribute("data-suffix") || "");
        });

    }

}

// =========================================
// HERO IMAGE SLIDER
// =========================================

const slides = document.querySelectorAll(".slider-wrapper .slide");

if (slides.length > 0) {

    let current = 0;

    function nextSlide() {

        slides[current].classList.remove("active");

        current = (current + 1) % slides.length;

        slides[current].classList.add("active");

    }

    setInterval(nextSlide, 4000);

}
// =========================================
// MOBILE NAVIGATION
// =========================================

const menuToggle = document.getElementById("menuToggle");

const menuClose = document.getElementById("menuClose");

const menuBackdrop = document.getElementById("menuBackdrop");

const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {

    function openMenu() {

        navLinks.classList.add("active");

        if (menuBackdrop) menuBackdrop.classList.add("active");

    }

    function closeMenu() {

        navLinks.classList.remove("active");

        if (menuBackdrop) menuBackdrop.classList.remove("active");

    }

    // Hamburger opens / closes the drawer
    menuToggle.addEventListener("click", function () {

        if (navLinks.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }

    });

    // Clean close control inside the drawer
    if (menuClose) {
        menuClose.addEventListener("click", closeMenu);
    }

    // Tap the visible page backdrop to dismiss
    if (menuBackdrop) {
        menuBackdrop.addEventListener("click", closeMenu);
    }

    // Escape key also dismisses the drawer
    document.addEventListener("keydown", function (e) {

        if (e.key === "Escape" && navLinks.classList.contains("active")) {
            closeMenu();
        }

    });

}
// =========================================
// BACK-TO-TOP BUTTON
// =========================================

const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", function () {

        if (window.pageYOffset > 300) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }

    });

    topBtn.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}
// =========================================
// CONTACT FORM — EMAILJS
// =========================================

const contactForm = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");

if (contactForm) {

    contactForm.addEventListener("submit", function(e) {

    e.preventDefault();

    sendBtn.disabled = true;
    sendBtn.innerHTML = "Sending...";

    if (typeof emailjs === "undefined") {
        sendBtn.innerHTML = "❌ Email service unavailable. Please try again later.";
        sendBtn.disabled = false;

        return;

    }

    emailjs.send(
        "service_q6iy95h",
        "template_aql1yzp",
        {
            from_name: document.getElementById("name").value,
            from_email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        }
    ).then(function () {

        sendBtn.innerHTML = "✅ Message Sent!";
        contactForm.reset();

        setTimeout(function () {
            sendBtn.innerHTML = "📩 Send Message";
            sendBtn.disabled = false;
        }, 3000);

    }).catch(function (error) {

        sendBtn.innerHTML = "❌ Try Again";
        sendBtn.disabled = false;

        console.log(error);

    });

}); 

}
// =========================================
// PORTFOLIO FILTER
// =========================================



const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        // Remove active class
        filterButtons.forEach(btn => btn.classList.remove("active"));

        // Highlight selected button
        this.classList.add("active");

        const filter = this.dataset.filter;

        portfolioItems.forEach(item => {

            if (filter === "all" || item.dataset.category === filter) {

    item.style.display = "";

} else {

    item.style.display = "none";

}

        });

    });

});
// =========================================
// PORTFOLIO GALLERY & LIGHTBOX
// =========================================

const galleryModal = document.getElementById("galleryModal");
const galleryImage = document.getElementById("galleryImage");
const galleryClose = document.querySelector(".gallery-close");
const galleryPrev = document.querySelector(".gallery-prev");
const galleryNext = document.querySelector(".gallery-next");
const galleryLiveLink = document.getElementById("galleryLiveLink");

const galleryItems = Array.from(document.querySelectorAll(".portfolio-item img"));

let currentImage = 0;

function updateGalleryLiveLink(){

    const currentItem = galleryItems[currentImage].closest(".portfolio-item");

    const liveUrl = currentItem ? currentItem.getAttribute("data-live-url") : "";

    if(liveUrl){

        galleryLiveLink.href = liveUrl;

        galleryLiveLink.hidden = false;

    }else{

        galleryLiveLink.removeAttribute("href");

        galleryLiveLink.hidden = true;

    }

}

function openGallery(index){

    currentImage = index;

    galleryImage.src = galleryItems[currentImage].src;

    updateGalleryLiveLink();

    galleryModal.classList.add("active");

    document.body.style.overflow = "hidden";

}

function closeGallery(){

    galleryModal.classList.remove("active");

    document.body.style.overflow = "";

}

function showNext(){

    currentImage++;

    if(currentImage >= galleryItems.length){
        currentImage = 0;
    }

    galleryImage.src = galleryItems[currentImage].src;

    updateGalleryLiveLink();

}

function showPrev(){

    currentImage--;

    if(currentImage < 0){
        currentImage = galleryItems.length - 1;
    }

    galleryImage.src = galleryItems[currentImage].src;

    updateGalleryLiveLink();

}

galleryItems.forEach((image,index)=>{

    image.setAttribute("draggable","false");

    image.addEventListener("dragstart",e=>e.preventDefault());

    image.addEventListener("click",function(e){

        e.preventDefault();

        openGallery(index);

    });

});

galleryClose.addEventListener("click",closeGallery);

galleryNext.addEventListener("click",showNext);

galleryPrev.addEventListener("click",showPrev);

galleryModal.addEventListener("click",function(e){

    if(e.target===galleryModal){
        closeGallery();
    }

});

document.addEventListener("keydown",function(e){

    if(!galleryModal.classList.contains("active")) return;

    if(e.key==="Escape"){
        closeGallery();
    }

    if(e.key==="ArrowRight"){
        showNext();
    }

    if(e.key==="ArrowLeft"){
        showPrev();
    }

});
// =========================================
// TESTIMONIAL SLIDER
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    const track = document.querySelector(".testimonial-track");

    if (!track) return;

    const cards = document.querySelectorAll(".testimonial-card");

    let currentIndex = 0;

    function getCardsPerView() {

        if (window.innerWidth <= 768) {
            return 1;
        }

        if (window.innerWidth <= 992) {
            return 2;
        }

        return 3;

    }

    function slideTestimonials() {

        const cardsPerView = getCardsPerView();

        const maxIndex = cards.length - cardsPerView;

        currentIndex++;

        if (currentIndex > maxIndex) {
            currentIndex = 0;
        }

        const cardWidth = sliderContainer.clientWidth / cardsPerView;

        track.style.transform =
            `translateX(-${currentIndex * cardWidth}px)`;

        

    }

    const sliderContainer = document.querySelector(".testimonial-slider");

    let slider = setInterval(slideTestimonials, 4000);

    sliderContainer.addEventListener("mouseenter", function () {
        clearInterval(slider);
    });

    sliderContainer.addEventListener("mouseleave", function () {
        slider = setInterval(slideTestimonials, 4000);
    });

    window.addEventListener("resize", function () {

        currentIndex = 0;

        track.style.transform = "translateX(0)";

    });

});
// =========================================
// ACTIVE NAVIGATION
// =========================================

const sections = document.querySelectorAll("section");
const navLinksItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinksItems.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});
// =========================================
// NAVBAR SCROLL EFFECT
// =========================================

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function(){

    if(window.scrollY > 50){

        navbar.classList.add("scrolled");

    }else{

        navbar.classList.remove("scrolled");

    }

});
// =========================================
// HERO TYPING EFFECT
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    // PHASE 2C-3: when the hero carousel is present it owns #typing
    // and restarts the typewriter for every slide; the legacy loop
    // below remains as the no-carousel fallback.
    if (document.querySelector(".hero-slides")) return;

    const words = [
        "With Graphic Design.",
        "With Powerful Branding.",
        "With Modern Websites.",
        "With Smart IT Solutions."
    ];

    let wordIndex = 0;
    let letterIndex = 0;
    let currentWord = "";
    let isDeleting = false;

    const typing = document.getElementById("typing");

    function typeEffect() {

        currentWord = words[wordIndex];

        if (isDeleting) {
            typing.innerHTML = currentWord.substring(0, letterIndex--);
        } else {
           typing.innerHTML = currentWord.substring(0, letterIndex++);
        }

        let speed = isDeleting ? 60 : 120;

        if (!isDeleting && letterIndex === currentWord.length + 1) {
            speed = 1500;
            isDeleting = true;
        }

        if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();

});
// =========================================
// PRELOADER
// =========================================
// Behaviour preserved: the loader hides on window "load" after the
// same 1000ms delay as before. A failsafe only guarantees the loader
// can never trap the page if the load event is delayed.

(function () {

    const preloader = document.getElementById("preloader");

    if (!preloader) return;

    function hidePreloader() {

        preloader.classList.add("hide");

    }

    // Primary trigger (unchanged behaviour: fires once every asset has
    // finished loading, then waits the same 1000ms as before).
    window.addEventListener("load", function () {

        setTimeout(hidePreloader, 1000);

    });

    // Failsafe: if the window "load" event is held up (slow third-party
    // script, stalled asset), release the page after 7s regardless.
    // It never fires earlier than the primary trigger would.
    setTimeout(function () {

        if (!preloader.classList.contains("hide")) {
            hidePreloader();
        }

    }, 7000);

})();
// =========================================
// SCROLL PROGRESS BAR
// =========================================

const progressBar = document.getElementById("progressBar");

window.addEventListener("scroll", function () {

    const scrollTop = document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = progress + "%";

});
// =========================================
// MOBILE MENU AUTO-CLOSE
// =========================================

const mobileLinks = document.querySelectorAll(".nav-links a");

mobileLinks.forEach(link => {

    link.addEventListener("click", function(){

        navLinks.classList.remove("active");

        if (menuBackdrop) menuBackdrop.classList.remove("active");

    });

});

// =========================================
// DARK / LIGHT THEME TOGGLE (PERSISTED)
// =========================================
(function () {
    "use strict";

    // Supports both the navbar toggle and the off-canvas drawer toggle
    var themeToggles = document.querySelectorAll(".theme-toggle");

    if (!themeToggles.length) return;

    var STORAGE_KEY = "kmog_theme";
    var DARK_MODE = "dark-mode";

    function applyTheme(isDark) {
        document.body.classList.toggle(DARK_MODE, isDark);

        themeToggles.forEach(function (btn) {
            btn.textContent = isDark ? "☀️" : "🌙";

            btn.setAttribute(
                "aria-label",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );
        });
    }

    var saved = null;
    try {
        saved = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
        saved = null;
    }

    var prefersDark = window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    var isDark = saved === null ? prefersDark : saved === "dark";

    applyTheme(isDark);

    themeToggles.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var nowDark = document.body.classList.toggle(DARK_MODE);
            try {
                localStorage.setItem(STORAGE_KEY, nowDark ? "dark" : "light");
            } catch (e) {
                /* storage unavailable (private mode) */
            }
            applyTheme(nowDark);
        });
    });
})();
// =========================================
// PHASE 2C-3 — HERO CAROUSEL
// Crossfade + subtle Ken Burns, arrows on
// desktop/tablet, dots on all devices,
// autoplay with hover / tab / reduced-motion
// handling, and a per-slide typewriter that
// restarts for every slide. The Featured
// Projects .slider-wrapper crossfade and its
// hero1-4.jpg images are untouched.
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    var slider = document.querySelector(".hero-slider");
    var slides = document.querySelectorAll(".hero-slides .hero-slide");

    if (!slider || slides.length < 2) return;

    var dotsWrap = slider.querySelector(".hero-dots");
    var prevBtn = slider.querySelector(".hero-arrow-prev");
    var nextBtn = slider.querySelector(".hero-arrow-next");

    var badgeText = document.getElementById("heroBadgeText");
    var subEl = document.getElementById("heroSub");
    var typeEl = document.getElementById("typing");
    var ctaPrimary = document.getElementById("heroCtaPrimary");
    var ctaSecondary = document.getElementById("heroCtaSecondary");

    var slideData = [
        {
            badge: "GRAPHIC DESIGN",
            type: "Design that sells.",
            sub: "Logos, flyers and brand identity crafted to make your business look professional and memorable.",
            primary: "Start a Project",
            primaryHref: "#contact",
            secondary: "View Our Work",
            secondaryHref: "#portfolio"
        },
        {
            badge: "BRANDING",
            type: "Powerful branding.",
            sub: "Complete identity systems — colour, typography and creative direction that build trust.",
            primary: "Request a Quote",
            primaryHref: "#contact",
            secondary: "Explore Branding",
            secondaryHref: "#portfolio"
        },
        {
            badge: "WEB DEVELOPMENT",
            type: "Modern websites.",
            sub: "Fast, responsive websites engineered to grow your business and win customers online.",
            primary: "Build My Website",
            primaryHref: "#contact",
            secondary: "See Our Work",
            secondaryHref: "#portfolio"
        },
        {
            badge: "IT SOLUTIONS",
            type: "Smart IT solutions.",
            sub: "Reliable IT support and digital tools that keep your operations running smoothly.",
            primary: "Get IT Support",
            primaryHref: "#contact",
            secondary: "Our Services",
            secondaryHref: "#services"
        }
    ];

    var currentIndex = 0;

    var timer = null;
    var typeTimer = null;
    var typeState = null;

    var reduceMotion = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---------- TYPEWRITER (restarts per slide) ----------
    function stopTypewriter() {
        if (typeTimer) clearTimeout(typeTimer);
        typeTimer = null;
        typeState = null;
    }

    function typeStep() {
        if (!typeState || !typeEl) return;

        var s = typeState;

        if (s.phase === "typing") {
            s.i++;
            typeEl.textContent = s.phrase.substring(0, s.i);

            if (s.i >= s.phrase.length) {
                s.phase = "hold";
                typeTimer = setTimeout(typeStep, 2000);
            } else {
                typeTimer = setTimeout(typeStep, 55);
            }
        } else if (s.phase === "hold") {
            s.phase = "deleting";
            typeTimer = setTimeout(typeStep, 40);
        } else if (s.phase === "deleting") {
            s.i--;
            typeEl.textContent = s.phrase.substring(0, s.i);

            if (s.i > 0) {
                typeTimer = setTimeout(typeStep, 40);
            }
        }
    }

    function startTypewriter(phrase) {
        stopTypewriter();
        if (!typeEl) return;

        typeEl.textContent = "";
        typeState = { phrase: phrase, i: 0, phase: "typing" };
        typeTimer = setTimeout(typeStep, 55);
    }

    // ---------- SLIDE SWAP ----------
    function goToSlide(index) {
        var total = slides.length;
        currentIndex = ((index % total) + total) % total;

        slides.forEach(function (img, i) {
            var active = i === currentIndex;
            img.classList.toggle("active", active);
            img.setAttribute("aria-hidden", active ? "false" : "true");
        });

        dots.forEach(function (dot, i) {
            dot.classList.toggle("active", i === currentIndex);
            dot.setAttribute("aria-selected", i === currentIndex ? "true" : "false");
            dot.tabIndex = i === currentIndex ? 0 : -1;
        });

        var data = slideData[currentIndex];

        if (badgeText) badgeText.textContent = data.badge;
        if (subEl) subEl.textContent = data.sub;

        if (ctaPrimary) {
            ctaPrimary.setAttribute("href", data.primaryHref);
            ctaPrimary.innerHTML = data.primary + ' <span>→</span>';
        }

        if (ctaSecondary) {
            ctaSecondary.setAttribute("href", data.secondaryHref);
            ctaSecondary.textContent = data.secondary;
        }

        startTypewriter(data.type);
    }

    // ---------- AUTOPLAY ----------
    function startAutoplay() {
        if (reduceMotion) return;

        stopAutoplay();

        timer = setInterval(function () {
            goToSlide(currentIndex + 1);
        }, 6000);
    }

    function stopAutoplay() {
        if (timer) clearInterval(timer);
        timer = null;
    }

    // ---------- DOTS (built by JS) ----------
    var dots = [];

    slides.forEach(function (img, i) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "hero-dot" + (i === 0 ? " active" : "");
        dot.setAttribute("role", "tab");
        dot.setAttribute("aria-label", "Go to slide " + (i + 1));
        dot.setAttribute("aria-selected", i === 0 ? "true" : "false");
        dot.setAttribute("data-hero-dot", i);

        dot.addEventListener("click", function () {
            goToSlide(i);
            startAutoplay();
        });

        if (dotsWrap) dotsWrap.appendChild(dot);
        dots.push(dot);
    });

    // ---------- ARROWS ----------
    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            goToSlide(currentIndex - 1);
            startAutoplay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            goToSlide(currentIndex + 1);
            startAutoplay();
        });
    }

    // ---------- PAUSE ON HOVER / FOCUS ----------
    slider.addEventListener("mouseenter", stopAutoplay);
    slider.addEventListener("mouseleave", startAutoplay);

    slider.addEventListener("focusin", stopAutoplay);
    slider.addEventListener("focusout", function () {
        if (!slider.contains(document.activeElement)) {
            startAutoplay();
        }
    });

    // ---------- PAUSE ON HIDDEN TAB ----------
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });

    // ---------- KEYBOARD NAVIGATION ----------
    slider.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            goToSlide(currentIndex - 1);
            startAutoplay();
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            goToSlide(currentIndex + 1);
            startAutoplay();
        }
    });

    // ---------- INIT ----------
    slides.forEach(function (img, i) {
        img.setAttribute("aria-hidden", i === 0 ? "false" : "true");
    });

    goToSlide(0);
    startAutoplay();

});