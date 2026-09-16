document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. HEADER — CHANGE ON SCROLL
    ===================================================== */

    const header = document.getElementById("header");

    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleHeaderScroll);

    handleHeaderScroll();


    /* =====================================================
       2. MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mobileNav = document.getElementById("mobileNav");

    if (menuToggle && mobileNav) {

        menuToggle.addEventListener("click", () => {

            mobileNav.classList.toggle("active");

            menuToggle.classList.toggle("active");

        });


        // Close menu after clicking a link

        const mobileLinks = mobileNav.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileNav.classList.remove("active");

                menuToggle.classList.remove("active");

            });

        });

    }


    /* =====================================================
       3. SMOOTH SCROLL
    ===================================================== */

    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                targetId.length <= 1
            ) {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       4. SCROLL REVEAL ANIMATIONS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       5. STAGGER CARD ANIMATIONS
    ===================================================== */

    const cardGroups = [
        ".why-card",
        ".service-card",
        ".process-step"
    ];

    cardGroups.forEach(selector => {

        const cards =
            document.querySelectorAll(selector);

        cards.forEach((card, index) => {

            card.style.transitionDelay =
                `${index * 80}ms`;

        });

    });


    /* =====================================================
       6. PROCESS PROGRESS LINE
    ===================================================== */

    const processSection =
        document.querySelector(".process-section");

    const processProgress =
        document.getElementById("processProgress");

    if (processSection && processProgress) {

        const processObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            processProgress.style.width = "100%";

                            processObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.25
                }
            );

        processObserver.observe(processSection);

    }


    /* =====================================================
       7. JAPAN → CARIBBEAN SHIP ANIMATION
    ===================================================== */

    const routeSection =
        document.querySelector(".route-section");

    const routeShip =
        document.getElementById("routeShip");

    if (routeSection && routeShip) {

        let routeAnimated = false;

        const routeObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting &&
                            !routeAnimated
                        ) {

                            routeAnimated = true;

                            animateShip();

                        }

                    });

                },
                {
                    threshold: 0.3
                }
            );

        routeObserver.observe(routeSection);


        function animateShip() {

            const track =
                document.querySelector(".route-track");

            if (!track) {
                return;
            }

            const trackWidth =
                track.offsetWidth;

            let position = 0;

            const duration = 5000;

            const startTime = performance.now();


            function moveShip(currentTime) {

                const elapsed =
                    currentTime - startTime;

                const progress =
                    Math.min(elapsed / duration, 1);

                /*
                    Ease-in-out movement
                */

                const eased =
                    progress < 0.5
                        ? 2 * progress * progress
                        : 1 -
                          Math.pow(
                              -2 * progress + 2,
                              2
                          ) / 2;

                position =
                    eased *
                    (trackWidth - 44);

                routeShip.style.transform =
                    `translateX(${position}px)`;

                if (progress < 1) {

                    requestAnimationFrame(
                        moveShip
                    );

                } else {

                    /*
                        Restart after a short delay
                    */

                    setTimeout(() => {

                        routeShip.style.transform =
                            "translateX(0)";

                        setTimeout(() => {

                            animateShip();

                        }, 700);

                    }, 1200);

                }

            }

            requestAnimationFrame(moveShip);

        }

    }


    /* =====================================================
       8. FAQ ACCORDION
    ===================================================== */

    const faqItems =
        document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");


        if (!question || !answer) {
            return;
        }


        question.addEventListener("click", () => {

            const isActive =
                item.classList.contains("active");


            /*
                Close all other FAQ items
            */

            faqItems.forEach(otherItem => {

                if (otherItem !== item) {

                    otherItem.classList.remove(
                        "active"
                    );

                    const otherAnswer =
                        otherItem.querySelector(
                            ".faq-answer"
                        );

                    if (otherAnswer) {

                        otherAnswer.style.maxHeight =
                            null;

                    }

                }

            });


            /*
                Toggle current FAQ
            */

            if (isActive) {

                item.classList.remove("active");

                answer.style.maxHeight = null;

            } else {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        });

    });


    /* =====================================================
       9. BACK TO TOP BUTTON
    ===================================================== */

    const backToTop =
        document.getElementById("backToTop");


    if (backToTop) {

        function updateBackToTop() {

            if (window.scrollY > 600) {

                backToTop.classList.add(
                    "visible"
                );

            } else {

                backToTop.classList.remove(
                    "visible"
                );

            }

        }


        window.addEventListener(
            "scroll",
            updateBackToTop
        );


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );


        updateBackToTop();

    }


    /* =====================================================
       10. FOOTER CURRENT YEAR
    ===================================================== */

    const currentYear =
        document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       11. CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", event => {

        if (!mobileNav || !menuToggle) {
            return;
        }


        const clickedInsideMenu =
            mobileNav.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);


        if (
            !clickedInsideMenu &&
            !clickedToggle
        ) {

            mobileNav.classList.remove(
                "active"
            );

            menuToggle.classList.remove(
                "active"
            );

        }

    });


    /* =====================================================
       12. BUTTON RIPPLE EFFECT
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn, .nav-whatsapp"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function(event) {

                const ripple =
                    document.createElement("span");

                ripple.classList.add(
                    "button-ripple"
                );

                const rect =
                    this.getBoundingClientRect();

                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );

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

            }
        );

    });


    /* =====================================================
       13. ACTIVE NAVIGATION LINK
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".desktop-nav a"
        );


    function updateActiveNav() {

        let currentSection = "";

        const scrollPosition =
            window.scrollY +
            window.innerHeight * 0.25;


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

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNav
    );


    updateActiveNav();


    /* =====================================================
       14. IMAGE PARALLAX — HERO
    ===================================================== */

    const heroImage =
        document.querySelector(
            ".hero-image-wrapper"
        );


    if (
        heroImage &&
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        window.addEventListener(
            "scroll",
            () => {

                const scroll =
                    window.scrollY;

                if (scroll < window.innerHeight) {

                    const movement =
                        scroll * 0.08;

                    heroImage.style.transform =
                        `translateY(${movement}px)`;

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       15. CURSOR GLOW — DESKTOP ONLY
    ===================================================== */

    if (
        window.innerWidth > 900 &&
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        const cursorGlow =
            document.createElement("div");

        cursorGlow.className =
            "cursor-glow";

        document.body.appendChild(
            cursorGlow
        );


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


    /* =====================================================
       16. PAGE LOADED
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );

});
