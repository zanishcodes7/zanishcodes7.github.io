/* --- 1. Init Specialized Smooth Scrolling (Lenis) --- */
// (Lenis handles standard document scrolling)
const lenis = new Lenis({
  lerp: 0.08, // Smoothness control (0.0 to 1.0)
  wheelMultiplier: 0.65, // Sensitivity control
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Integrate Lenis with GSAP ScrollTrigger
// This links standard scroll-based triggers to Lenis transforms
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // synchronizes gsap and lenis clocks
});
gsap.ticker.lagSmoothing(0);


/* --- 2. Advanced Parallax Scrolling Animations (GSAP) --- */

// a. Parallax Text (Layered Offset `00:06`)
// Triggering off the experience section
gsap.to('.front-text', {
    scrollTrigger: {
        trigger: '.experience-section',
        start: 'top bottom', // Start animating when section hits bottom of screen
        end: 'bottom top',   // End animating when section hits top of screen
        scrub: true,         // Links animation precisely to scroll progress
        markers: false       // set true to debug start/end points
    },
    xPercent: 12, // Move front text faster for depth (offset on X axis)
});

gsap.to('.back-text', {
    scrollTrigger: {
        trigger: '.experience-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
    },
    xPercent: -18, // Move back text slower for depth
});