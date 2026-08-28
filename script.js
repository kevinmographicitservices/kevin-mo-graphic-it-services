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

const galleryItems = Array.from(document.querySelectorAll(".portfolio-item img"));

let currentImage = 0;

function openGallery(index){

    currentImage = index;

    galleryImage.src = galleryItems[currentImage].src;

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

}

function showPrev(){

    currentImage--;

    if(currentImage < 0){
        currentImage = galleryItems.length - 1;
    }

    galleryImage.src = galleryItems[currentImage].src;

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