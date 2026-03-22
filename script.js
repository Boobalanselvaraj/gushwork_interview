/**
 * Main Content Loaded Listener
 * Ensures all DOM elements are available before executing scripts
 */
document.addEventListener('DOMContentLoaded', () => {

    /* --- Hero Gallery Thumbnail Switcher --- */
    // Select all thumbnail elements and the main product image container
    const thumbnails = document.querySelectorAll('.thumb');
    const mainImg = document.querySelector('.main-product-image');
    
    // placeholder images for the gallery
    const dummyImages = [
        "./assets/pipe-work.jpg",
        "./assets/pipe-work.jpg",
        "./assets/pipe-work.jpg",
        "./assets/pipe-work.jpg",
        "./assets/pipe-work.jpg",
        "./assets/pipe-work.jpg"
    ];

    /**
     * Initialize thumbnails and add click event listeners
     */
    thumbnails.forEach((thumb, index) => {
        // Set background image for the thumbnail div to show preview
        if (dummyImages[index]) {
            thumb.style.backgroundImage = `url(${dummyImages[index]})`;
            thumb.style.backgroundSize = "cover";
        }
        
        // Handle thumbnail selection
        thumb.addEventListener('click', () => {
            // UI Update: Remove active highlight from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            // UI Update: Add active highlight to the clicked thumbnail
            thumb.classList.add('active');
            
            // Logic: Switch the main image source to match the clicked thumbnail
            if (mainImg && dummyImages[index]) {
                // Visual Effect: Brief fade out before switching
                mainImg.style.opacity = '0.7';
                setTimeout(() => {
                    mainImg.src = dummyImages[index];
                    // Visual Effect: Fade back in with the new image
                    mainImg.style.opacity = '1';
                }, 100);
            }
        });
    });

    /* --- Hero Gallery Navigation Buttons --- */
    const heroPrevBtn = document.querySelector('.product-gallery .prev');
    const heroNextBtn = document.querySelector('.product-gallery .next');
    let currentHeroIndex = 0;

    /**
     * Helper function to update the hero image based on index
     * Used by both dot/thumbnail clicks and arrow navigation
     */
    const updateHeroImage = (index) => {
        // Update active state in thumbnails
        thumbnails.forEach(t => t.classList.remove('active'));
        if (thumbnails[index]) thumbnails[index].classList.add('active');
        
        // Update main image with fade effect
        if (mainImg && dummyImages[index]) {
            mainImg.style.opacity = '0.7';
            setTimeout(() => {
                mainImg.src = dummyImages[index];
                mainImg.style.opacity = '1';
            }, 100);
        }
    };

    // Initialize Hero Navigation Event Listeners
    if(heroPrevBtn && heroNextBtn) {
        heroPrevBtn.addEventListener('click', () => {
            // Loop back to end if at the beginning
            currentHeroIndex = (currentHeroIndex === 0) ? dummyImages.length - 1 : currentHeroIndex - 1;
            updateHeroImage(currentHeroIndex);
        });
        heroNextBtn.addEventListener('click', () => {
            // Loop back to start if at the end
            currentHeroIndex = (currentHeroIndex === dummyImages.length - 1) ? 0 : currentHeroIndex + 1;
            updateHeroImage(currentHeroIndex);
        });
    }

    /* --- Image Zoom Effect --- */
    // Implements a hover-to-zoom effect on the main product image
    const zoomContainer = document.querySelector('.main-image-container');
    if (zoomContainer && mainImg) {
        zoomContainer.addEventListener('mousemove', (e) => {
            const rect = zoomContainer.getBoundingClientRect();
            // Calculate mouse position relative to container as percentage (0-100)
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            // Set the transform origin to the mouse position and scale the image
            mainImg.style.transformOrigin = `${x}% ${y}%`;
            mainImg.style.transform = 'scale(1.8)';
        });
        
        // Reset zoom when mouse leaves the container
        zoomContainer.addEventListener('mouseleave', () => {
            mainImg.style.transform = 'scale(1)';
            mainImg.style.transformOrigin = 'center center';
        });
    }

    /* --- FAQ Accordion --- */
    // Implements a standard accordion where only one item can be active at a time
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Logic: Close all open FAQ items before opening the clicked one (Exclusive Accordion)
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-body').style.display = 'none';
                // Reset toggle icons to 'down'
                const icon = faq.querySelector('.faq-toggle i');
                icon.className = 'fa-solid fa-chevron-down';
            });
            
            // Logic: Open clicked item only if it wasn't already open
            if (!isActive) {
                item.classList.add('active');
                item.querySelector('.faq-body').style.display = 'block';
                // Update toggle icon to 'up'
                const icon = item.querySelector('.faq-toggle i');
                icon.className = 'fa-solid fa-chevron-up';
            }
        });
    });

    /* --- Modals --- */
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

    // UX Logic: Close modals when clicking on the darkened backdrop (outside the modal box)
    window.addEventListener('click', (e) => {
        if (e.target === downloadModal) downloadModal.classList.remove('active');
        if (e.target === quoteModal) quoteModal.classList.remove('active');
    });

    /* --- Applications Carousel Navigation --- */
    // Implements horizontal scroll control for the Applications section
    const appsCarousel = document.querySelector('.apps-carousel');
    const appsNavBtns = document.querySelectorAll('.apps-nav .nav-circle');
    
    if (appsCarousel && appsNavBtns.length >= 2) {
        const appsPrev = appsNavBtns[0];
        const appsNext = appsNavBtns[1];
        
        appsPrev.addEventListener('click', () => {
            // Scroll left by a fixed amount
            appsCarousel.scrollBy({ left: -320, behavior: 'smooth' });
        });
        appsNext.addEventListener('click', () => {
            // Scroll right by a fixed amount
            appsCarousel.scrollBy({ left: 320, behavior: 'smooth' });
        });
    }

    /* --- Manufacturing Process Carousel logic --- */
    /**
     * This section controls a complex stepper/carousel for the Manufacturing Process
     * It updates titles, descriptions, images, and checklists based on the active step
     */
    const mfgContainer = document.querySelector('.mfg-content-split');
    const mfgSteps = document.querySelectorAll('.mfg-step');
    const mfgPrevBtn = document.querySelector('.mfg-prev');
    const mfgNextBtn = document.querySelector('.mfg-next');
    
    if (mfgContainer && mfgSteps.length > 0) {
        let currentMfgIndex = 0;
        
        // Data object containing all content for the 8 steps of manufacturing
        const mfgData = [
            {
                title: "High-Grade Raw Material Selection",
                desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
                checklist: ["PE100 grade material", "Optimal molecular weight distribution"],
                img: "./assets/pipe-work.jpg"
            },
            {
                title: "Advanced Extrusion Process",
                desc: "State-of-the-art extruders maintain uniform melt temperature and steady output for consistent pipe quality.",
                checklist: ["Continuous monitoring", "Energy efficient systems"],
                img: "./assets/pipe-work.jpg"
            },
            {
                title: "Precision Cooling",
                desc: "Controlled cooling baths ensure uniform structural integrity without internal stresses.",
                checklist: ["Multi-stage cooling baths", "Temperature regulated"],
                img: "./assets/pipe-work.jpg"
            },
            {
                title: "Accurate Sizing",
                desc: "Vacuum calibration chambers lock exactly to specified diameters and tolerances.",
                checklist: ["Laser diameter control", "Zero tolerance deviation"],
                img: "./assets/pipe-work.jpg"
            },
            {
                title: "Stringent Quality Control",
                desc: "Inline ultrasonic testing checks wall thickness and searches for structural imperfections.",
                checklist: ["Ultrasonic scanning", "Hydraulic pressure testing"],
                img: "./assets/pipe-work.jpg"
            },
            {
                title: "Continuous Marking",
                desc: "Hot foil or inkjet printing applied sequentially for full batch traceability.",
                checklist: ["Standard compliance marks", "Meter marking"],
                img: "./assets/pipe-work.jpg"
            },
            {
                title: "Automated Cutting",
                desc: "Planetary saws produce perfectly clean, square cuts at exact specified lengths.",
                checklist: ["Dust-free extraction", "Chamfering capabilities"],
                img: "./assets/pipe-work.jpg"
            },
            {
                title: "Secure Packaging",
                desc: "Coiling or straight length bundling prepared for safe transport and outdoor storage.",
                checklist: ["UV resistant wrapping", "Secure strapping"],
                img: "./assets/pipe-work.jpg"
            }
        ];

        /**
         * Core UI update function for the Manufacturing Process section
         * Synchronizes text, icons, and images with the data source
         */
        const updateMfgUI = (index) => {
            // UI Update: Progress dots/timeline highlighting
            mfgSteps.forEach(s => s.classList.remove('active'));
            if(mfgSteps[index]) mfgSteps[index].classList.add('active');
            
            // Logic: Target specific DOM elements for content replacement
            const titleEl = mfgContainer.querySelector('.mfg-step-title');
            const descEl = mfgContainer.querySelector('.mfg-step-desc');
            const listEl = mfgContainer.querySelector('.mfg-checklist');
            const imgEl = mfgContainer.querySelector('.mfg-content-right img');
            
            // Logic: Update Title and Description text
            if(titleEl && mfgData[index]) titleEl.textContent = mfgData[index].title;
            if(descEl && mfgData[index]) descEl.textContent = mfgData[index].desc;
            
            // Logic: Reconstruct the checklist UL with new items
            if(listEl && mfgData[index]) {
                listEl.innerHTML = '';
                mfgData[index].checklist.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `<img src="./assets/icons/CheckCircle.svg" class="check-icon" alt="Check"> ${item}`;
                    listEl.appendChild(li);
                });
            }
            
            // Logic: Switch image source
            if(imgEl && mfgData[index]) {
                imgEl.src = mfgData[index].img;
            }
        };

        // Initialize Step Navigation (Prev/Next buttons)
        if(mfgPrevBtn && mfgNextBtn) {
            mfgPrevBtn.addEventListener('click', () => {
                currentMfgIndex = (currentMfgIndex === 0) ? mfgData.length - 1 : currentMfgIndex - 1;
                updateMfgUI(currentMfgIndex);
            });
            mfgNextBtn.addEventListener('click', () => {
                currentMfgIndex = (currentMfgIndex === mfgData.length - 1) ? 0 : currentMfgIndex + 1;
                updateMfgUI(currentMfgIndex);
            });
        }
        
        // Interaction: Allow clicking directly on the timeline steps to jump to that process
        mfgSteps.forEach((step, idx) => {
            step.addEventListener('click', () => {
                currentMfgIndex = idx;
                updateMfgUI(currentMfgIndex);
            });
        });
    }

    /* --- Sticky Header Logic --- */
    // Makes the header stick to the top after scrolling past a certain point
    const header = document.querySelector('.main-header');
    const heroSection = document.querySelector('.top-section-bg');
    
    if (header && heroSection) {
        window.addEventListener('scroll', () => {
            // Trigger point: after user scrolls past 100px from the bottom of the hero section
            const triggerPoint = heroSection.offsetHeight - 100;
            if (window.scrollY > triggerPoint) {
                header.classList.add('is-sticky');
            } else {
                header.classList.remove('is-sticky');
            }
        });
    }

});

