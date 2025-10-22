// Preloader
window.addEventListener("load", function () {
  const preloader = document.getElementById("site-preloader");
  if (preloader) {
    preloader.style.display = "none";
  }
});

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeMobileMenu();
  initializeHeaderEffects();
  initializeSmoothScrolling();
  animateOnScroll();
});

// Mobile Menu Functionality
function initializeMobileMenu() {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileMenuClose = document.querySelector(".mobile-menu-close");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
  const oldMenuToggle = document.querySelector(".offcanvas-menu-toggler");
  const header = document.querySelector(".site-header");

  // New mobile menu functionality
  if (mobileMenuToggle && mobileMenu) {
    // Open mobile menu
    mobileMenuToggle.addEventListener("click", function () {
      mobileMenu.classList.add("active");
      mobileMenuOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    // Close mobile menu function
    function closeMobileMenu() {
      mobileMenu.classList.remove("active");
      mobileMenuOverlay.classList.remove("active");
      document.body.style.overflow = "";

      // Close all submenus when closing mobile menu
      document
        .querySelectorAll(".mobile-menu .menu-item-has-children")
        .forEach((item) => {
          item.classList.remove("active");
        });
    }

    // Close menu events
    if (mobileMenuClose) {
      mobileMenuClose.addEventListener("click", closeMobileMenu);
    }

    if (mobileMenuOverlay) {
      mobileMenuOverlay.addEventListener("click", closeMobileMenu);
    }

    // Close menu when clicking on menu items (except dropdown toggles)
    const mobileMenuItems = document.querySelectorAll(".mobile-navigation a");
    mobileMenuItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        // Don't close if it's a dropdown toggle with submenu
        if (
          !this.parentElement.classList.contains("menu-item-has-children") ||
          !this.nextElementSibling ||
          !this.nextElementSibling.classList.contains("sub-menu")
        ) {
          closeMobileMenu();
        }
      });
    });

    // Dropdown toggle for mobile submenus
    document
      .querySelectorAll(".mobile-navigation .menu-item-has-children > a")
      .forEach((item) => {
        item.addEventListener("click", function (e) {
          if (window.innerWidth < 992) {
            e.preventDefault();
            const parent = this.parentElement;
            const isActive = parent.classList.contains("active");

            // Close all other dropdowns
            document
              .querySelectorAll(".mobile-menu .menu-item-has-children")
              .forEach((dropdown) => {
                if (dropdown !== parent) {
                  dropdown.classList.remove("active");
                }
              });

            // Toggle current dropdown
            parent.classList.toggle("active", !isActive);
          }
        });
      });
  }

  // Old menu toggle functionality (for backward compatibility)
  if (oldMenuToggle && header) {
    oldMenuToggle.addEventListener("click", function (e) {
      e.preventDefault();
      header.classList.toggle("menu-open");
    });
  }
}

// Header scroll effects
function initializeHeaderEffects() {
  const header = document.querySelector(".site-header");
  const masthead = document.getElementById("masthead");

  if (header || masthead) {
    window.addEventListener("scroll", function () {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const targetHeader = header || masthead;

      if (scrollTop > 100) {
        targetHeader.classList.add("scrolled");
      } else {
        targetHeader.classList.remove("scrolled");
      }
    });
  }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));

      // Only prevent default for valid anchor links that exist on the page
      if (target && this.getAttribute("href") !== "#") {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Add animation on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(
    ".process-step, .key-feature, .stat-item"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
  });
}

// Form submission handling (if forms are added later)
function handleFormSubmission(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // Add form submission logic here
      console.log("Form submitted:", formId);
    });
  }
}
