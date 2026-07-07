// ============================================
// INISIALISASI AOS (Animate on Scroll)
// ============================================
document.addEventListener('DOMContentLoaded', function () {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80
    });
  }

  // Tahun otomatis di footer
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Toggle ikon chevron pada tombol "Cara Pemesanan"
  var metodePesan = document.getElementById('metodePesan');
  if (metodePesan) {
    metodePesan.addEventListener('shown.bs.collapse', function () {
      document.querySelector('.cara-pesan-toggle').setAttribute('aria-expanded', 'true');
    });
    metodePesan.addEventListener('hidden.bs.collapse', function () {
      document.querySelector('.cara-pesan-toggle').setAttribute('aria-expanded', 'false');
    });
  }
});

// ============================================
// SMOOTH SCROLL untuk semua tautan anchor internal
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var targetId = this.getAttribute('href');
    if (targetId.length > 1) {
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });

        // Tutup menu navbar mobile setelah klik (jika terbuka)
        var navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          var bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        }
      }
    }
  });
});

// ============================================
// NAVBAR: efek bayangan saat halaman di-scroll
// ============================================
var mainNav = document.getElementById('mainNav');
window.addEventListener('scroll', function () {
  if (mainNav) {
    if (window.scrollY > 40) {
      mainNav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.18)';
    } else {
      mainNav.style.boxShadow = '0 2px 15px rgba(0,0,0,0.12)';
    }
  }
});

// ============================================
// HIGHLIGHT MENU AKTIF SESUAI SECTION YANG TERLIHAT
// ============================================
var sections = document.querySelectorAll('section[id]');
var navLinks = document.querySelectorAll('.navbar-nav .nav-link');

function highlightActiveNav() {
  var scrollY = window.pageYOffset;

  sections.forEach(function (section) {
    var sectionHeight = section.offsetHeight;
    var sectionTop = section.offsetTop - 100;
    var sectionId = section.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightActiveNav);