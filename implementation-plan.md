# Project Execution Rules: Premium Church Website

## Development Philosophy
We are building this application **Step-by-Step**. Do not attempt to generate the entire website in a single response. We will complete one phase, verify the UI in the browser, and only proceed to the next phase when I approve.

## The Phased Roadmap

### Phase 1: Foundation & The Hero (Current Sprint)
*   **Goal:** Establish the global styles and build the first impression.
*   **Tasks:** 
    1. Configure `tailwind.config.js` with the bespoke color palette (White, Peach, Orange, Red, Grey).
    2. Implement the global layout wrapper and the transparent Glassmorphism Navbar.
    3. Build the 50/50 "Half-Circle" Hero Section using the temporary hall photo, including the typography and gradient CTA button.
*   *Wait for user approval before proceeding.*

### Phase 2: The Bento Box Dashboard
*   **Goal:** Deliver the most critical information (Mass timings) in a premium UI format.
*   **Tasks:**
    1. Build a CSS Grid bento box layout below the Hero.
    2. Create the soft-peach Mass Timings card.
    3. Create the wider "Construction Update" card.
*   *Wait for user approval before proceeding.*

### Phase 3: The 3D Scroll Journey (Advanced UI)
*   **Goal:** Implement the "Awwwards-level" parallax timeline using the Foundation Stone photos.
*   **Tasks:**
    1. Wrap the application in the `@studio-freight/lenis` smooth scroll provider.
    2. Use `framer-motion` to build a Z-axis reveal effect for the foundation photos as the user scrolls down the page.
*   *Wait for user approval before proceeding.*

### Phase 4: Community, ICYM, & Footer
*   **Goal:** Build out the typographic-heavy community grid and close out the page.
*   **Tasks:**
    1. Design a clean, 3-column card grid for ICYM and parish announcements (no images, focus on typography and hover states).
    2. Build the minimalist footer with contact info and a simple map link.