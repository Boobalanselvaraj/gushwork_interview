document.addEventListener('DOMContentLoaded', function () {

    // Product Gallery Thumbnails
    const thumbItems = document.querySelectorAll('.thumb');
    const heroImage = document.querySelector('.main-product-image');

    // gallery image sources
    const galleryImages = [
        "./assets/poly-pipe-item.jpg",
        "./assets/poly-pipe-item.jpg",
        "./assets/poly-pipe-item.jpg",
        "./assets/poly-pipe-item.jpg",
        "./assets/poly-pipe-item.jpg",
        "./assets/poly-pipe-item.jpg"
    ];

    // Set up thumbnail click handlers
    thumbItems.forEach(function (thumb, i) {
        // apply background preview on each thumb
        /* 
        if (galleryImages[i]) {
            thumb.style.backgroundImage = `url(${galleryImages[i]})`;
            thumb.style.backgroundSize = "cover";
        }
        */

        thumb.addEventListener('click', function () {
            // clear active state from all thumbs
            thumbItems.forEach(function (t) { t.classList.remove('active'); });
            thumb.classList.add('active');

            // swap the hero image with a quick fade
            if (heroImage && galleryImages[i]) {
                heroImage.style.opacity = '0.6';
                setTimeout(function () {
                    heroImage.src = galleryImages[i];
                    heroImage.style.opacity = '1';
                }, 120);
            }
        });
    });

    // Gallery Arrow Navigation
    const prevArrow = document.querySelector('.product-gallery .prev');
    const nextArrow = document.querySelector('.product-gallery .next');
    let activeSlide = 0;

    // switches the hero image and highlights the right thumbnail
    function switchGallerySlide(idx) {
        thumbItems.forEach(function (t) { t.classList.remove('active'); });
        if (thumbItems[idx]) thumbItems[idx].classList.add('active');

        if (heroImage && galleryImages[idx]) {
            heroImage.style.opacity = '0.6';
            setTimeout(function () {
                heroImage.src = galleryImages[idx];
                heroImage.style.opacity = '1';
            }, 120);
        }
    }

    // prev/next button handlers
    if (prevArrow && nextArrow) {
        prevArrow.addEventListener('click', function () {
            if (activeSlide === 0) {
                activeSlide = galleryImages.length - 1;
            } else {
                activeSlide--;
            }
            switchGallerySlide(activeSlide);
        });
        nextArrow.addEventListener('click', function () {
            if (activeSlide === galleryImages.length - 1) {
                activeSlide = 0;
            } else {
                activeSlide++;
            }
            switchGallerySlide(activeSlide);
        });
    }

    // Hover Zoom functionality for all image containers
    function initZoom(containerSelector, imageSelector, scale = 1.75) {
        const containers = document.querySelectorAll(containerSelector);
        containers.forEach(container => {
            const image = container.querySelector(imageSelector);
            if (!image) return;

            container.addEventListener('mousemove', function (e) {
                if (e.target.closest('button') || e.target.closest('.gallery-nav-btn')) {
                    image.style.transform = 'scale(1)';
                    image.style.transformOrigin = 'center center';
                    return;
                }

                const bounds = container.getBoundingClientRect();
                const posX = ((e.clientX - bounds.left) / bounds.width) * 100;
                const posY = ((e.clientY - bounds.top) / bounds.height) * 100;

                image.style.transformOrigin = posX + '% ' + posY + '%';
                image.style.transform = `scale(${scale})`;
            });

            container.addEventListener('mouseleave', function () {
                image.style.transform = 'scale(1)';
                image.style.transformOrigin = 'center center';
            });
        });
    }

    initZoom('.main-image-container', '.main-product-image', 1.75);
    initZoom('.app-card', 'img', 1.3);


    // FAQ Toggle (exclusive)
    const faqEntries = document.querySelectorAll('.faq-item');

    faqEntries.forEach(function (entry) {
        var trigger = entry.querySelector('.faq-header');
        trigger.addEventListener('click', function () {
            var wasOpen = entry.classList.contains('active');

            faqEntries.forEach(function (faq) {
                faq.classList.remove('active');
                faq.querySelector('.faq-body').style.display = 'none';
                faq.querySelector('.faq-toggle i').className = 'fa-solid fa-chevron-down';
            });

            if (!wasOpen) {
                entry.classList.add('active');
                entry.querySelector('.faq-body').style.display = 'block';
                entry.querySelector('.faq-toggle i').className = 'fa-solid fa-chevron-up';
            }
        });
    });

    // Modals
    const downloadModal = document.getElementById('downloadModal');
    const openDownloadBtn = document.getElementById('openDownloadModal');
    const closeDownloadBtn = document.getElementById('closeDownloadModal');

    const quoteModal = document.getElementById('quoteModal');
    const openQuoteBtn = document.getElementById('openQuoteModal');
    const closeQuoteBtn = document.getElementById('closeQuoteModal');

    // UI Logic: Show 'Download' modal
    if (openDownloadBtn && downloadModal) {
        openDownloadBtn.addEventListener('click', () => {
            downloadModal.classList.add('active');
        });
    }
    // UI Logic: Show 'Quote' modal
    if (openQuoteBtn && quoteModal) {
        openQuoteBtn.addEventListener('click', () => {
            quoteModal.classList.add('active');
        });
    }

    // UI Logic: Close buttons for modals
    if (closeDownloadBtn && downloadModal) {
        closeDownloadBtn.addEventListener('click', () => downloadModal.classList.remove('active'));
    }
    if (closeQuoteBtn && quoteModal) {
        closeQuoteBtn.addEventListener('click', () => quoteModal.classList.remove('active'));
    }

    window.addEventListener('click', (e) => {
        if (e.target === downloadModal) downloadModal.classList.remove('active');
        if (e.target === quoteModal) quoteModal.classList.remove('active');
    });

    const carouselTrack = document.querySelector('.apps-carousel');
    const scrollBtns = document.querySelectorAll('.apps-nav .nav-circle');
    var scrollStep = 474;

    if (carouselTrack && scrollBtns.length >= 2) {
        scrollBtns[0].addEventListener('click', function () {
            carouselTrack.scrollBy({ left: -scrollStep, behavior: 'smooth' });
        });
        scrollBtns[1].addEventListener('click', function () {
            carouselTrack.scrollBy({ left: scrollStep, behavior: 'smooth' });
        });
    }

    // Manufacturing Stepper
    // controls the 8-step process section with dynamic content swapping
    const processPanel = document.querySelector('.mfg-content-split');
    const stepDots = document.querySelectorAll('.mfg-step');
    const stepPrev = document.querySelector('.mfg-prev');
    const stepNext = document.querySelector('.mfg-next');

    if (processPanel && stepDots.length > 0) {
        var stepIndex = 0;

        // content for each manufacturing stage
        const mfgData = [
            {
                title: "High-Grade Raw Material Selection",
                desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
                checklist: ["PE100 grade material", "Optimal molecular weight distribution"],
                img: "./assets/poly-pipe-item.jpg"
            },
            {
                title: "Advanced Extrusion Process",
                desc: "State-of-the-art extruders maintain uniform melt temperature and steady output for consistent pipe quality.",
                checklist: ["Continuous monitoring", "Energy efficient systems"],
                img: "./assets/poly-pipe-item.jpg"
            },
            {
                title: "Precision Cooling",
                desc: "Controlled cooling baths ensure uniform structural integrity without internal stresses.",
                checklist: ["Multi-stage cooling baths", "Temperature regulated"],
                img: "./assets/poly-pipe-item.jpg"
            },
            {
                title: "Accurate Sizing",
                desc: "Vacuum calibration chambers lock exactly to specified diameters and tolerances.",
                checklist: ["Laser diameter control", "Zero tolerance deviation"],
                img: "./assets/poly-pipe-item.jpg"
            },
            {
                title: "Stringent Quality Control",
                desc: "Inline ultrasonic testing checks wall thickness and searches for structural imperfections.",
                checklist: ["Ultrasonic scanning", "Hydraulic pressure testing"],
                img: "./assets/poly-pipe-item.jpg"
            },
            {
                title: "Continuous Marking",
                desc: "Hot foil or inkjet printing applied sequentially for full batch traceability.",
                checklist: ["Standard compliance marks", "Meter marking"],
                img: "./assets/poly-pipe-item.jpg"
            },
            {
                title: "Automated Cutting",
                desc: "Planetary saws produce perfectly clean, square cuts at exact specified lengths.",
                checklist: ["Dust-free extraction", "Chamfering capabilities"],
                img: "./assets/poly-pipe-item.jpg"
            },
            {
                title: "Secure Packaging",
                desc: "Coiling or straight length bundling prepared for safe transport and outdoor storage.",
                checklist: ["UV resistant wrapping", "Secure strapping"],
                img: "./assets/poly-pipe-item.jpg"
            }
        ];

        // renders the right content for a given step index
        function renderStep(idx) {
            stepDots.forEach(function (s) { s.classList.remove('active'); });
            if (stepDots[idx]) stepDots[idx].classList.add('active');

            var heading = processPanel.querySelector('.mfg-step-title');
            var desc = processPanel.querySelector('.mfg-step-desc');
            var checkList = processPanel.querySelector('.mfg-checklist');
            var photo = processPanel.querySelector('.mfg-content-right img');

            if (heading && mfgData[idx]) heading.textContent = mfgData[idx].title;
            if (desc && mfgData[idx]) desc.textContent = mfgData[idx].desc;

            // rebuild the checklist items
            if (checkList && mfgData[idx]) {
                checkList.innerHTML = '';
                mfgData[idx].checklist.forEach(function (text) {
                    var li = document.createElement('li');
                    li.innerHTML = '<img src="./assets/icons/check-circle.svg" class="check-icon" alt="Check"> ' + text;
                    checkList.appendChild(li);
                });
            }

            if (photo && mfgData[idx]) photo.src = mfgData[idx].img;
        }

        // prev/next controls for the stepper
        if (stepPrev && stepNext) {
            stepPrev.addEventListener('click', function () {
                stepIndex = (stepIndex > 0) ? stepIndex - 1 : mfgData.length - 1;
                renderStep(stepIndex);
            });
            stepNext.addEventListener('click', function () {
                stepIndex = (stepIndex < mfgData.length - 1) ? stepIndex + 1 : 0;
                renderStep(stepIndex);
            });
        }

        // clicking a step dot jumps straight to it
        stepDots.forEach(function (dot, n) {
            dot.addEventListener('click', function () {
                stepIndex = n;
                renderStep(stepIndex);
            });
        });
    }

    // Navigation and Sticky Bar Behavior
    const siteHeader = document.querySelector('.primary-nav-bar');
    const productBanner = document.getElementById('productBanner');
    const bannerQuoteBtn = document.getElementById('bannerQuoteBtn');
    
    // Define areas where sticky bar shows up
    const targetSections = [
        document.querySelector('.production-flow'),
        document.querySelector('.use-cases-area')
    ];

    let lastScrollTop = 0;
    let isBannerArea = false;

    if (siteHeader && productBanner) {
        // Use intersection observer to track visibility
        const observerOptions = {
            threshold: 0.1 // Appear when at least 10% is visible
        };

        const sectionStates = new Map();
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                sectionStates.set(entry.target, entry.isIntersecting);
            });

            isBannerArea = Array.from(sectionStates.values()).some(state => state);
            
            if (isBannerArea) {
                productBanner.classList.add('is-visible');
                siteHeader.classList.add('is-hidden');
                productBanner.classList.add('at-top');
            } else {
                productBanner.classList.remove('is-visible');
                siteHeader.classList.remove('is-hidden');
                productBanner.classList.remove('at-top');
            }
        }, observerOptions);

        targetSections.forEach(section => {
            if (section) observer.observe(section);
        });

        window.addEventListener('scroll', function () {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Apply sticky state to nav bar
            if (scrollTop > 20) {
                siteHeader.classList.add('is-sticky');
            } else {
                siteHeader.classList.remove('is-sticky');
            }

            // In the banner area, ensure header stays hidden and banner stays at top
            if (isBannerArea) {
                siteHeader.classList.add('is-hidden');
                productBanner.classList.add('at-top');
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    // Link banner button to existing quote modal
    if (bannerQuoteBtn && typeof quoteModal !== 'undefined') {
        bannerQuoteBtn.addEventListener('click', () => {
            quoteModal.classList.add('active');
        });
    }



});

