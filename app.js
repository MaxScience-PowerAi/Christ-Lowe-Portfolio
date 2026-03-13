document.addEventListener('DOMContentLoaded', () => {
    // Reveal elements on scroll
    const reveals = document.querySelectorAll('.reveal');

    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    }

    // Initial check
    checkReveal();
    // Check on scroll
    window.addEventListener('scroll', checkReveal);

    // Header shrinking effect on scroll
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('py-2', 'shadow-md');
            header.classList.remove('h-20', 'py-4');
        } else {
            header.classList.add('h-20', 'py-4');
            header.classList.remove('py-2', 'shadow-md');
        }
    });
});

// Mobile Menu Toggling
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        icon.classList.replace('ph-list', 'ph-x');
    } else {
        menu.classList.add('hidden');
        icon.classList.replace('ph-x', 'ph-list');
    }
}
