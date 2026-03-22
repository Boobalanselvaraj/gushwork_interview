document.addEventListener('DOMContentLoaded', () => {

    /* --- Hero Gallery Thumbnail Switcher --- */
    const thumbnails = document.querySelectorAll('.thumb');
    const mainImg = document.querySelector('.main-product-image');
    
    // Use the local image for all thumbnails and main image
    const dummyImages = [
        "./assets/pipe-work.jpg",
        "./assets/pipe-work.jpg",
        "./assets/pipe-work.jpg",
        "./assets/pipe-work.jpg",
        "./assets/pipe-work.jpg",
        "./assets/pipe-work.jpg"
    ];

    thumbnails.forEach((thumb, index) => {
        // Set background image to thumbnail 
        if (dummyImages[index]) {
            thumb.style.backgroundImage = `url(${dummyImages[index]})`;
            thumb.style.backgroundSize = "cover";
        }
        
        thumb.addEventListener('click', () => {
            // Remove active class from all
            thumbnails.forEach(t => t.classList.remove('active'));
            // Add active to clicked
            thumb.classList.add('active');
            
            // Switch main image using the corresponding source array
            if (mainImg && dummyImages[index]) {
                // smooth fade effect
                mainImg.style.opacity = '0.7';
                setTimeout(() => {
                    mainImg.src = dummyImages[index];
                    mainImg.style.opacity = '1';
                }, 100);
            }
        });
    });

    /* --- Hero Gallery Navigation Buttons --- */
    const heroPrevBtn = document.querySelector('.product-gallery .prev');
    const heroNextBtn = document.querySelector('.product-gallery .next');
    let currentHeroIndex = 0;

    const updateHeroImage = (index) => {
        thumbnails.forEach(t => t.classList.remove('active'));
        if (thumbnails[index]) thumbnails[index].classList.add('active');
        if (mainImg && dummyImages[index]) {
            mainImg.style.opacity = '0.7';
            setTimeout(() => {
                mainImg.src = dummyImages[index];
                mainImg.style.opacity = '1';
            }, 100);
        }
    };

    if(heroPrevBtn && heroNextBtn) {
        heroPrevBtn.addEventListener('click', () => {
            currentHeroIndex = (currentHeroIndex === 0) ? dummyImages.length - 1 : currentHeroIndex - 1;
            updateHeroImage(currentHeroIndex);
        });
        heroNextBtn.addEventListener('click', () => {
            currentHeroIndex = (currentHeroIndex === dummyImages.length - 1) ? 0 : currentHeroIndex + 1;
            updateHeroImage(currentHeroIndex);
        });
    }

    /* --- Image Zoom Effect --- */
    const zoomContainer = document.querySelector('.main-image-container');
    if (zoomContainer && mainImg) {
        zoomContainer.addEventListener('mousemove', (e) => {
            const rect = zoomContainer.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            mainImg.style.transformOrigin = `${x}% ${y}%`;
            mainImg.style.transform = 'scale(1.8)';
        });
        
        zoomContainer.addEventListener('mouseleave', () => {
            mainImg.style.transform = 'scale(1)';
            mainImg.style.transformOrigin = 'center center';
        });
    }

    /* --- FAQ Accordion --- */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        header.addEventListener('click', () => {
            // Check if active
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-body').style.display = 'none';
                // Reset icon to down arrow
                const icon = faq.querySelector('.faq-toggle i');
                icon.className = 'fa-solid fa-chevron-down';
            });
            
            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                item.querySelector('.faq-body').style.display = 'block';
                // Change icon to up arrow
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

    // Open Modals
    if (openDownloadBtn && downloadModal) {
        openDownloadBtn.addEventListener('click', () => {
            downloadModal.classList.add('active');
        });
    }
    if (openQuoteBtn && quoteModal) {
        openQuoteBtn.addEventListener('click', () => {
            quoteModal.classList.add('active');
        });
    }

    // Close Modals with Buttons
    if (closeDownloadBtn && downloadModal) {
        closeDownloadBtn.addEventListener('click', () => downloadModal.classList.remove('active'));
    }
    if (closeQuoteBtn && quoteModal) {
        closeQuoteBtn.addEventListener('click', () => quoteModal.classList.remove('active'));
    }

    // Close Modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === downloadModal) downloadModal.classList.remove('active');
        if (e.target === quoteModal) quoteModal.classList.remove('active');
    });

    /* --- Applications Carousel Navigation --- */
    const appsCarousel = document.querySelector('.apps-carousel');
    const appsNavBtns = document.querySelectorAll('.apps-nav .nav-circle');
    
    if (appsCarousel && appsNavBtns.length >= 2) {
        const appsPrev = appsNavBtns[0];
        const appsNext = appsNavBtns[1];
        
        appsPrev.addEventListener('click', () => {
            appsCarousel.scrollBy({ left: -320, behavior: 'smooth' });
        });
        appsNext.addEventListener('click', () => {
            appsCarousel.scrollBy({ left: 320, behavior: 'smooth' });
        });
    }

    /* --- Manufacturing Process Carousel logic --- */
    const mfgContainer = document.querySelector('.mfg-content-split');
    const mfgSteps = document.querySelectorAll('.mfg-step');
    const mfgPrevBtn = document.querySelector('.mfg-prev');
    const mfgNextBtn = document.querySelector('.mfg-next');
    
    if (mfgContainer && mfgSteps.length > 0) {
        let currentMfgIndex = 0;
        
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

        const updateMfgUI = (index) => {
            // update step dots
            mfgSteps.forEach(s => s.classList.remove('active'));
            if(mfgSteps[index]) mfgSteps[index].classList.add('active');
            
            // update content text
            const titleEl = mfgContainer.querySelector('.mfg-step-title');
            const descEl = mfgContainer.querySelector('.mfg-step-desc');
            const listEl = mfgContainer.querySelector('.mfg-checklist');
            const imgEl = mfgContainer.querySelector('.mfg-content-right img');
            
            if(titleEl && mfgData[index]) titleEl.textContent = mfgData[index].title;
            if(descEl && mfgData[index]) descEl.textContent = mfgData[index].desc;
            
            if(listEl && mfgData[index]) {
                listEl.innerHTML = '';
                mfgData[index].checklist.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `<img src="./assets/icons/CheckCircle.svg" class="check-icon" alt="Check"> ${item}`;
                    listEl.appendChild(li);
                });
            }
            
            if(imgEl && mfgData[index]) {
                imgEl.src = mfgData[index].img;
            }
        };

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
        
        // Make timeline clickable
        mfgSteps.forEach((step, idx) => {
            step.addEventListener('click', () => {
                currentMfgIndex = idx;
                updateMfgUI(currentMfgIndex);
            });
        });
    }

    /* --- Sticky Header Logic --- */
    const header = document.querySelector('.main-header');
    const heroSection = document.querySelector('.top-section-bg');
    
    if (header && heroSection) {
        window.addEventListener('scroll', () => {
            const triggerPoint = heroSection.offsetHeight - 100;
            if (window.scrollY > triggerPoint) {
                header.classList.add('is-sticky');
            } else {
                header.classList.remove('is-sticky');
            }
        });
    }

});
