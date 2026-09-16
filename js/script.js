/* =========================================================
   RAHEEL ZAIDI VEHICLE EXPORTER
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       ELEMENTS
       ========================================================= */

    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");
    const backToTop = document.getElementById("backToTop");
    const currentYear = document.getElementById("currentYear");

    const processProgress = document.getElementById("processProgress");
    const routeShip = document.getElementById("routeShip");


    /* =========================================================
       CURRENT YEAR
       ========================================================= */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =========================================================
       HEADER SCROLL EFFECT
       ========================================================= */

    function handleHeader() {
        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleHeader, { passive: true });
    handleHeader();


    /* =========================================================
       MOBILE MENU
       ========================================================= */

    if (menuToggle && mobileNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mobileNav.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            document.body.classList.toggle("menu-open", isOpen);
        });


        /* Close mobile menu when clicking a link */

        const mobileLinks = mobileNav.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileNav.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

                document.body.classList.remove("menu-open");
            });

        });


        /* Close when clicking outside */

        document.addEventListener("click", (event) => {

            if (
                mobileNav.classList.contains("active") &&
                !mobileNav.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                mobileNav.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

                document.body.classList.remove("menu-open");
            }

        });

    }


    /* =========================================================
       SMOOTH SCROLLING
       ========================================================= */

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 80;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =========================================================
       SCROLL REVEAL ANIMATIONS
       ========================================================= */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("active");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


        revealElements.forEach((element, index) => {

            element.style.transitionDelay =
                `${Math.min(index * 0.05, 0.3)}s`;

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("active");
        });

    }


    /* =========================================================
       PROCESS TIMELINE PROGRESS
       ========================================================= */

    function updateProcessProgress() {

        if (!processProgress) return;

        const processSection =
            document.querySelector(".process-section");

        if (!processSection) return;

        const rect = processSection.getBoundingClientRect();

        const viewportHeight = window.innerHeight;

        const sectionTop = rect.top;
        const sectionHeight = rect.height;

        const startPoint = viewportHeight * 0.75;

        let progress =
            (startPoint - sectionTop) / sectionHeight;

        progress = Math.max(0, Math.min(1, progress));

        processProgress.style.height =
            `${progress * 100}%`;
    }

    window.addEventListener(
        "scroll",
        updateProcessProgress,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        updateProcessProgress
    );

    updateProcessProgress();


    /* =========================================================
       JAPAN → BARBADOS SHIP ANIMATION
       ========================================================= */

    function updateShipPosition() {

        if (!routeShip) return;

        const routeSection =
            document.querySelector(".route-section");

        if (!routeSection) return;

        const rect =
            routeSection.getBoundingClientRect();

        const viewportHeight =
            window.innerHeight;

        const start =
            viewportHeight * 0.85;

        const end =
            -rect.height * 0.25;

        let progress =
            (start - rect.top) /
            (start - end);

        progress =
            Math.max(0, Math.min(1, progress));

        routeShip.style.left =
            `${15 + progress * 70}%`;
    }

    window.addEventListener(
        "scroll",
        updateShipPosition,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        updateShipPosition
    );

    updateShipPosition();


    /* =========================================================
       FAQ ACCORDION
       ========================================================= */

    const faqItems =
        document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");

        if (!question || !answer) return;

        question.setAttribute(
            "aria-expanded",
            "false"
        );


        question.addEventListener("click", () => {

            const isActive =
                item.classList.contains("active");


            /* Close all other FAQ items */

            faqItems.forEach(otherItem => {

                if (otherItem !== item) {

                    otherItem.classList.remove("active");

                    const otherQuestion =
                        otherItem.querySelector(".faq-question");

                    const otherAnswer =
                        otherItem.querySelector(".faq-answer");

                    if (otherQuestion) {
                        otherQuestion.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }

                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = null;
                    }

                }

            });


            /* Toggle selected item */

            if (isActive) {

                item.classList.remove("active");

                question.setAttribute(
                    "aria-expanded",
                    "false"
                );

                answer.style.maxHeight = null;

            } else {

                item.classList.add("active");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

                answer.style.maxHeight =
                    answer.scrollHeight + "px";
            }

        });

    });


    /* =========================================================
       BACK TO TOP BUTTON
       ========================================================= */

    function handleBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 600) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    }

    window.addEventListener(
        "scroll",
        handleBackToTop,
        { passive: true }
    );

    handleBackToTop();


    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =========================================================
       BUTTON RIPPLE EFFECT
       ========================================================= */

    const rippleButtons =
        document.querySelectorAll(".button-ripple");

    rippleButtons.forEach(button => {

        button.addEventListener("click", function (event) {

            const ripple =
                document.createElement("span");

            ripple.classList.add("ripple");

            const rect =
                this.getBoundingClientRect();

            const size =
                Math.max(rect.width, rect.height);

            ripple.style.width =
                `${size}px`;

            ripple.style.height =
                `${size}px`;

            ripple.style.left =
                `${event.clientX - rect.left - size / 2}px`;

            ripple.style.top =
                `${event.clientY - rect.top - size / 2}px`;

            this.appendChild(ripple);


            setTimeout(() => {
                ripple.remove();
            }, 600);

        });

    });


    /* =========================================================
       ACTIVE NAVIGATION LINK
       ========================================================= */

    const navLinks =
        document.querySelectorAll(
            '.desktop-nav a[href^="#"]'
        );

    const sections =
        document.querySelectorAll("section[id]");

    function updateActiveNav() {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 180;

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                sectionTop + sectionHeight
            ) {
                currentSection =
                    section.getAttribute("id");
            }

        });


        navLinks.forEach(link => {

            const href =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === `#${currentSection}`
            );

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        updateActiveNav
    );

    updateActiveNav();


    /* =========================================================
       HERO PARALLAX
       ========================================================= */

    const hero =
        document.querySelector(".hero");

    const heroImage =
        document.querySelector(".hero-image-wrapper");

    function heroParallax() {

        if (!hero || !heroImage) return;

        /* Disable effect on smaller screens */

        if (window.innerWidth <= 850) {

            heroImage.style.transform = "";

            return;
        }

        const scrollY =
            window.scrollY;

        if (scrollY < window.innerHeight) {

            const movement =
                scrollY * 0.08;

            heroImage.style.transform =
                `translateY(${movement}px)`;

        }

    }

    window.addEventListener(
        "scroll",
        heroParallax,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        heroParallax
    );


    /* =========================================================
       DESKTOP CURSOR GLOW
       ========================================================= */

    if (
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches
    ) {

        const cursorGlow =
            document.createElement("div");

        cursorGlow.className =
            "cursor-glow";

        document.body.appendChild(cursorGlow);


        document.addEventListener(
            "mousemove",
            event => {

                cursorGlow.style.left =
                    `${event.clientX}px`;

                cursorGlow.style.top =
                    `${event.clientY}px`;

            }
        );

    }


    /* =========================================================
       CARD HOVER EFFECT
       ========================================================= */

    const cards =
        document.querySelectorAll(
            ".service-card, .why-card, .about-card"
        );

    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (window.innerWidth <= 850) return;

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    (y - centerY) / 35;

                const rotateY =
                    (centerX - x) / 35;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-4px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =========================================================
       WHATSAPP LINKS
       ========================================================= */

    const whatsappLinks =
        document.querySelectorAll(
            'a[href*="wa.me"]'
        );

    whatsappLinks.forEach(link => {

        link.addEventListener("click", () => {

            /* Tracking hook for future analytics */

            console.log(
                "WhatsApp contact clicked"
            );

        });

    });


    /* =========================================================
       IMAGE ERROR HANDLING
       ========================================================= */

    const images =
        document.querySelectorAll("img");

    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-error"
                );

                console.warn(
                    "Image could not be loaded:",
                    image.src
                );

            }
        );

    });


    /* =========================================================
       RESIZE HANDLER
       ========================================================= */

    let resizeTimer;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {

                updateProcessProgress();
                updateShipPosition();
                updateActiveNav();
                heroParallax();

            }, 150);

        }
    );


    /* =========================================================
       REDUCED MOTION SUPPORT
       ========================================================= */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    if (reducedMotion.matches) {

        document.documentElement.style.scrollBehavior =
            "auto";

        revealElements.forEach(element => {

            element.style.transitionDelay = "0s";
            element.classList.add("active");

        });

    }


    /* =========================================================
       INITIALIZATION COMPLETE
       ========================================================= */

    console.log(
        "Raheel Zaidi Vehicle Exporter website initialized."
    );

});