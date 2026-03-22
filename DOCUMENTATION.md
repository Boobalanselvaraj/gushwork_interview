# Project Documentation: Mangalam HDPE Pipes

Welcome to the documentation for the Mangalam HDPE Pipes web application. This document provides a comprehensive overview of the project's structure, design philosophy, and technical implementation.

---

## Project Structure

The project is organized into a clean, flat structure for simplicity and ease of maintenance:

-   `index.html`: The main entry point containing the semantic HTML5 structure.
-   `styles.css`: The central stylesheet containing all layout, design tokens, and components.
-   `script.js`: The JavaScript logic for all interactive components.
-   `assets/`: A directory containing all images, icons, and branding assets.

---

## HTML Architecture

The application follows a modular section-based layout to ensure a clean flow and easy navigation:

1.  **Header**: Contains the logo, navigation menu, and a sticky behavior logic.
2.  **Product Hero**: The primary fold featuring the product title, quick benefits, price box, and an interactive zoomable gallery.
3.  **Technical Specifications**: A data-dense section using a dark theme to contrast and present key engineering metrics in a clear table format.
4.  **Manufacturing Process**: A complex stepper-style carousel that walks the user through the 8-step production lifecycle.
5.  **Applications & Portfolio**: Showcases various industrial uses and related products using a carousel and card-based grid.
6.  **Testimonials & FAQ**: Builds social proof and answers common procurement questions.
7.  **Footer**: Comprehensive site information, contact details, and social links.

---

## CSS & Design System

The project uses **Modern Vanilla CSS** with a focus on responsiveness and premium aesthetics.

### Key Features:
-   **Design Tokens**: Utilizes CSS Variables (`:root`) for colors, spacing, and transition timing to maintain consistency throughout the site.
-   **Typography**: Leverages the *Urbanist* and *Inter* font families for a modern, high-tech industrial feel.
-   **Full-Width Backgrounds**: Uses pseudo-elements (`::before`) and the `.top-section-bg` class to create seamless, full-width section backgrounds without breaking the centered content wrapper.
-   **Responsiveness**: Implements nested media queries to adjust padding, font sizes, and layout grids for mobile, tablet, and ultra-wide screens.

---

## JavaScript Functionality

The `script.js` file handles all dynamic interactions using modern, efficient DOM manipulation:

### 1. Interactive Hero Gallery
-   **Thumbnail Switching**: Updates the main image when a user clicks a thumbnail.
-   **Navigation**: Functional 'prev' and 'next' buttons for quick browsing.
-   **Image Zoom**: A sophisticated hover-to-zoom feature that tracks the mouse position relative to the image container to provide a detailed view of the product.

### 2. FAQ Accordion
-   Implements an "Exclusive Accordion" logic where opening one item automatically closes others, keeping the view clean and focused.

### 3. Stepper Logic (Manufacturing Process)
-   Uses a data-driven approach. Instead of hardcoding 8 sections, the script updates a single container's content (title, image, checklist) dynamically based on the active step, ensuring performance and a smooth transition.

### 4. Continuous Carousel
-   The 'Applications' section features a smooth horizontal scroll carousel controlled by custom navigation buttons.

### 5. Sticky Header & Modals
-   **Sticky Header**: Adds an `is-sticky` class to the header upon scrolling past the hero section, improving site-wide navigation.
-   **Modals**: Lightweight modal logic for 'Catalogue Download' and 'Quote Request' forms, including click-to-close behavior on the backdrop for a better user experience.

---

## Future Enhancements
-   **Form Validation**: Adding client-side validation for the contact and catalogue forms.
-   **Dynamic Data**: Transitioning the manufacturing data to a JSON API for easier content management.
-   **AOS Animations**: Integrating "Animate On Scroll" for a more cinematic section transition.

---
