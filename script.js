document.addEventListener('DOMContentLoaded', () => {

  // ========== ACTIVE NAVBAR ==========
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  function setActiveNav() {
    let current = '';
    const scrollY = window.scrollY;
    sections.forEach(section => {
      if (scrollY >= section.offsetTop - 100) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', setActiveNav);
  setActiveNav();

  // ========== BACK TO TOP ==========
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========== TAHUN FOOTER ==========
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // ========== AOS ==========
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true, offset: 50 });
  }

  // ========== PRELOADER ==========
  // ========== PRELOADER ==========
const preloader = document.getElementById('preloader');
if (preloader) {
  const hidePreloader = () => {
    preloader.classList.add('hide');
    setTimeout(() => {
      if (preloader.parentNode) preloader.remove();
    }, 500);
  };

  // Fallback: sembunyikan paksa setelah 3 detik
  const timeout = setTimeout(hidePreloader, 3000);

  // Sembunyikan saat halaman selesai dimuat (normal)
  window.addEventListener('load', () => {
    clearTimeout(timeout);  // batalkan timeout jika load terjadi duluan
    hidePreloader();
  });

  // Jika DOM sudah selesai sebelum script berjalan (kasus langka)
  if (document.readyState === 'complete') {
    clearTimeout(timeout);
    hidePreloader();
  }
}

});