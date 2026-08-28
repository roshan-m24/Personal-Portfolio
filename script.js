/* =========================================================
   ROSHAN MaIiakkal — PORTFOLIO INTERACTIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    /* =====================================================
       1. THEME TOGGLE
       ===================================================== */

    const themeToggle = document.getElementById("themeToggle");
    const html = document.documentElement;

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme) {
        html.setAttribute("data-theme", savedTheme);
    }

    const updateThemeIcon = () => {
        if (!themeToggle) return;

        const currentTheme = html.getAttribute("data-theme");

        themeToggle.textContent =
            currentTheme === "light" ? "☀️" : "🌙";
    };

    updateThemeIcon();

    themeToggle?.addEventListener("click", () => {
        const currentTheme = html.getAttribute("data-theme");

        const newTheme =
            currentTheme === "light" ? "dark" : "light";

        html.setAttribute("data-theme", newTheme);

        localStorage.setItem("portfolio-theme", newTheme);

        updateThemeIcon();
    });


    /* =====================================================
       2. MOBILE NAVIGATION
       ===================================================== */

    const navToggle = document.getElementById("navToggle");
    const siteNav = document.querySelector(".site-nav");

    navToggle?.addEventListener("click", () => {
        siteNav?.classList.toggle("is-open");
        navToggle.classList.toggle("is-active");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            siteNav?.classList.remove("is-open");
            navToggle?.classList.remove("is-active");
        });
    });


    /* =====================================================
       3. TYPING ANIMATION
       ===================================================== */

    const typingText = document.getElementById("typingText");

    if (typingText) {
        const roles = [
            "MCA Student at VIT Chennai",
            "Data Science AI & Data Analytics Enthusiast",
            "Experience in Software Developement"
        ];

        let roleIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        const typingSpeed = 90;
        const deletingSpeed = 45;
        const pauseAfterTyping = 1500;
        const pauseAfterDeleting = 500;

        function typeRole() {
            const currentRole = roles[roleIndex];

            if (!deleting) {
                typingText.textContent =
                    currentRole.substring(0, characterIndex + 1);

                characterIndex++;

                if (characterIndex === currentRole.length) {
                    deleting = true;

                    setTimeout(typeRole, pauseAfterTyping);
                    return;
                }

                setTimeout(typeRole, typingSpeed);
            } else {
                typingText.textContent =
                    currentRole.substring(0, characterIndex - 1);

                characterIndex--;

                if (characterIndex === 0) {
                    deleting = false;

                    roleIndex =
                        (roleIndex + 1) % roles.length;

                    setTimeout(typeRole, pauseAfterDeleting);
                    return;
                }

                setTimeout(typeRole, deletingSpeed);
            }
        }

        typeRole();
    }


    /* =====================================================
       4. SCROLL REVEAL ANIMATIONS
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section, .skill-card, .project-card, .work-card, .contact-inner"
    );

    revealElements.forEach((element, index) => {
        element.classList.add("reveal");

        // Small stagger effect
        if (
            element.classList.contains("skill-card") ||
            element.classList.contains("project-card") ||
            element.classList.contains("work-card")
        ) {
            element.style.setProperty(
                "--reveal-delay",
                `${(index % 4) * 80}ms`
            );
        }
    });

    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");

                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -60px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       5. ACTIVE NAVIGATION WHILE SCROLLING
       ===================================================== */

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navLinks = document.querySelectorAll(
        ".nav-link"
    );

    const sectionObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;

                    navLinks.forEach(link => {
                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            `#${sectionId}`
                        ) {
                            link.classList.add("active");
                        }
                    });
                }
            });
        },
        {
            threshold: 0.35
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* =====================================================
       6. HEADER SCROLL EFFECT
       ===================================================== */

    const header = document.querySelector(".site-header");

    function handleHeaderScroll() {
        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );

    handleHeaderScroll();


    /* =====================================================
       7. SCROLL PROGRESS BAR
       ===================================================== */

    let scrollProgress =
        document.getElementById("scrollProgress");

    // Create it if it doesn't exist in HTML
    if (!scrollProgress) {
        scrollProgress = document.createElement("div");

        scrollProgress.id = "scrollProgress";
        scrollProgress.className = "scroll-progress";

        document.body.appendChild(scrollProgress);
    }

    function updateScrollProgress() {
        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
                : 0;

        scrollProgress.style.width =
            `${percentage}%`;
    }

    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );

    updateScrollProgress();


    /* =====================================================
       8. BACK TO TOP BUTTON
       ===================================================== */

    const scrollTopButton =
        document.getElementById("scrollTop");

    function updateScrollTopButton() {
        if (!scrollTopButton) return;

        if (window.scrollY > 500) {
            scrollTopButton.classList.add("is-visible");
        } else {
            scrollTopButton.classList.remove("is-visible");
        }
    }

    window.addEventListener(
        "scroll",
        updateScrollTopButton,
        { passive: true }
    );

    updateScrollTopButton();

    scrollTopButton?.addEventListener(
        "click",
        () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    );


    /* =====================================================
       9. PROJECT FILTERING
       ===================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projectCards =
        document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter =
                button.dataset.filter;

            // Update active filter
            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            projectCards.forEach(card => {
                const category =
                    card.dataset.category;

                const shouldShow =
                    filter === "all" ||
                    category === filter;

                if (shouldShow) {
                    card.style.display = "";

                    // Force animation restart
                    card.classList.remove(
                        "filter-show"
                    );

                    requestAnimationFrame(() => {
                        card.classList.add(
                            "filter-show"
                        );
                    });
                } else {
                    card.classList.remove(
                        "filter-show"
                    );

                    card.style.display = "none";
                }
            });
        });
    });


    /* =====================================================
       10. PROJECT CARD 3D TILT
       ===================================================== */

    const supportsHover =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;

    if (supportsHover) {
        projectCards.forEach(card => {

            card.addEventListener(
                "pointermove",
                event => {

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

                    const rotateY =
                        ((x - centerX) /
                            centerX) * 4;

                    const rotateX =
                        ((centerY - y) /
                            centerY) * 4;

                    card.style.transform =
                        `perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-6px)`;
                }
            );

            card.addEventListener(
                "pointerleave",
                () => {
                    card.style.transform = "";
                }
            );
        });
    }


    /* =====================================================
       11. WORK EXPERIENCE TIMELINE
       ===================================================== */

    const workExperience =
        document.querySelector(".work-exp");

    if (workExperience) {

        let timelineLine =
            workExperience.querySelector(
                ".timeline-progress"
            );

        if (!timelineLine) {
            timelineLine =
                document.createElement("div");

            timelineLine.className =
                "timeline-progress";

            workExperience.prepend(
                timelineLine
            );
        }

        function updateTimeline() {

            const cards =
                workExperience.querySelectorAll(
                    ".work-card"
                );

            if (!cards.length) return;

            const containerRect =
                workExperience.getBoundingClientRect();

            const viewportCenter =
                window.innerHeight * 0.55;

            let progress = 0;

            cards.forEach((card, index) => {

                const rect =
                    card.getBoundingClientRect();

                const cardCenter =
                    rect.top + rect.height / 2;

                if (
                    cardCenter <=
                    viewportCenter
                ) {
                    progress =
                        Math.max(
                            progress,
                            index + 1
                        );
                }
            });

            const percentage =
                (progress / cards.length) * 100;

            timelineLine.style.height =
                `${percentage}%`;

            // Reveal cards as they become visible
            cards.forEach(card => {

                const rect =
                    card.getBoundingClientRect();

                if (
                    rect.top <
                    window.innerHeight * 0.85
                ) {
                    card.classList.add(
                        "timeline-visible"
                    );
                }
            });
        }

        window.addEventListener(
            "scroll",
            updateTimeline,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            updateTimeline
        );

        updateTimeline();
    }


    /* =====================================================
       12. MOUSE FOLLOWING GLOW
       ===================================================== */

    if (supportsHover) {

        let cursorGlow =
            document.querySelector(
                ".cursor-glow"
            );

        if (!cursorGlow) {
            cursorGlow =
                document.createElement("div");

            cursorGlow.className =
                "cursor-glow";

            document.body.appendChild(
                cursorGlow
            );
        }

        let mouseX = 0;
        let mouseY = 0;

        let glowX = 0;
        let glowY = 0;

        document.addEventListener(
            "pointermove",
            event => {
                mouseX = event.clientX;
                mouseY = event.clientY;
            },
            { passive: true }
        );

        function animateGlow() {

            glowX +=
                (mouseX - glowX) * 0.08;

            glowY +=
                (mouseY - glowY) * 0.08;

            cursorGlow.style.transform =
                `translate3d(
                    ${glowX}px,
                    ${glowY}px,
                    0
                )`;

            requestAnimationFrame(
                animateGlow
            );
        }

        animateGlow();
    }


    /* =====================================================
       13. SOCIAL LINK HOVER EFFECT
       ===================================================== */

    const socialLinks =
        document.querySelectorAll(
            ".social-link"
        );

    socialLinks.forEach(link => {

        link.addEventListener(
            "pointerenter",
            () => {
                link.classList.add(
                    "social-hover"
                );
            }
        );

        link.addEventListener(
            "pointerleave",
            () => {
                link.classList.remove(
                    "social-hover"
                );
            }
        );
    });


    /* =====================================================
       14. BUTTON RIPPLE EFFECT
       ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn, .filter-btn, .pill-link"
        );

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                const rect =
                    button.getBoundingClientRect();

                const ripple =
                    document.createElement("span");

                ripple.className =
                    "button-ripple";

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
                    `${event.clientX -
                        rect.left -
                        size / 2}px`;

                ripple.style.top =
                    `${event.clientY -
                        rect.top -
                        size / 2}px`;

                button.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        );
    });


    /* =====================================================
       15. FOOTER YEAR
       ===================================================== */

    const footerYear =
        document.getElementById(
            "footerYear"
        );

    if (footerYear) {
        footerYear.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       16. CONTACT FORM
       ===================================================== */

    const contactForm =
        document.querySelector(
            ".contact-form"
        );

    const toast =
        document.getElementById("toast");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                if (toast) {
                    toast.textContent =
                        "Thanks! Your message has been received.";

                    toast.classList.add(
                        "show"
                    );

                    setTimeout(() => {
                        toast.classList.remove(
                            "show"
                        );
                    }, 4000);
                }

                contactForm.reset();
            }
        );
    }


    /* =====================================================
       17. SMOOTH ANCHOR SCROLL
       ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const targetId =
                        anchor.getAttribute(
                            "href"
                        );

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) return;

                    event.preventDefault();

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight -
                        15;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });
                }
            );
        });


    /* =====================================================
       18. IMAGE LOAD EFFECT
       ===================================================== */

    document
        .querySelectorAll(
            ".project-img-wrap img, .profile-pic"
        )
        .forEach(image => {

            if (image.complete) {
                image.classList.add(
                    "image-loaded"
                );
            } else {
                image.addEventListener(
                    "load",
                    () => {
                        image.classList.add(
                            "image-loaded"
                        );
                    }
                );
            }
        });


    /* =====================================================
       19. KEYBOARD ACCESSIBILITY
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            // Escape closes mobile navigation
            if (event.key === "Escape") {
                siteNav?.classList.remove(
                    "is-open"
                );

                navToggle?.classList.remove(
                    "is-active"
                );
            }
        }
    );


    /* =====================================================
       20. REDUCED MOTION SUPPORT
       ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    if (reducedMotion.matches) {

        document.documentElement
            .classList.add(
                "reduced-motion"
            );
    }

    console.log(
        "✨ Roshan's portfolio interactions loaded."
    );
});
