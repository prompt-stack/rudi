// Shared Header Component for RUDI
document.addEventListener('DOMContentLoaded', function() {
    // Header HTML template
    const headerHTML = `
        <nav class="nav-header">
            <div class="container nav-container">
                <div class="logo">
                    <a href="index.html">
                        <h2 style="margin: 0; color: white; font-weight: 600;">RUDI</h2>
                    </a>
                </div>
                <ul class="nav-links">
                    <li class="nav-dropdown">
                        <span class="nav-dropdown-trigger">Certifications <i class="fas fa-chevron-down" style="font-size: 0.7em; margin-left: 4px;"></i></span>
                        <ul class="dropdown-menu">
                            <li><a href="certificates-business.html">Business</a></li>
                            <li><a href="certificates-education.html">Education</a></li>
                        </ul>
                    </li>
                    <li><a href="framework.html">Framework</a></li>
                    <li><a href="ohio.html">Ohio</a></li>
                    <li><a href="research.html">Research</a></li>
                    <li><a href="resources.html">Resources</a></li>
                </ul>
                <a href="contact.html" class="nav-cta">Get Started</a>
                <button class="mobile-menu-toggle"><i class="fas fa-bars"></i></button>
            </div>
            <div class="mobile-menu">
                <a href="index.html">Home</a>
                <a href="certificates-business.html">Business Certificates</a>
                <a href="certificates-education.html">Education Certificates</a>
                <a href="framework.html">Framework</a>
                <a href="ohio.html">Ohio</a>
                <a href="research.html">Research</a>
                <a href="resources.html">Resources</a>
                <a href="contact.html">Contact</a>
            </div>
        </nav>
    `;

    // Insert header into the page
    const headerContainer = document.getElementById('site-header');
    if (headerContainer) {
        headerContainer.innerHTML = headerHTML;

        // Get current page filename
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        // Add active class to current page link in main nav
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            if(link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });

        // Add active class to current page link in mobile menu
        const mobileLinks = document.querySelectorAll('.mobile-menu a');
        mobileLinks.forEach(link => {
            if(link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });

        // Re-initialize mobile menu toggle
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');

        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', function() {
                mobileMenu.classList.toggle('active');
            });
        }
    }
});