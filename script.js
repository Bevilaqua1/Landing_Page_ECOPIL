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

// ========== PRELOADER & AOS INITIALIZATION ==========
  const preloader = document.getElementById('preloader');
  
  // Fungsi untuk menjalankan AOS hanya setelah preloader selesai
  const initAOS = () => {
    if (typeof AOS !== 'undefined') {
      AOS.init({ 
        duration: 800, 
        once: true, 
        offset: 50,
        // Disable AOS di perangkat yang sangat kecil jika masih menyebabkan isu, 
        // tapi dengan overflow-x: hidden di section, harusnya aman.
      });
      // Panggil refresh untuk memastikan penghitungan offset benar
      setTimeout(() => AOS.refresh(), 100); 
    }
  };

  if (preloader) {
    const hidePreloader = () => {
      preloader.classList.add('hide');
      setTimeout(() => {
        if (preloader.parentNode) preloader.remove();
        // KUNCI: Jalankan AOS setelah preloader sepenuhnya hilang
        initAOS();
      }, 500); // 500ms adalah waktu transisi opacity
    };

    // Fallback: sembunyikan paksa setelah 2.5 detik (dipercepat sedikit)
    const timeout = setTimeout(hidePreloader, 2500);

    // Sembunyikan saat halaman selesai dimuat
    window.addEventListener('load', () => {
      clearTimeout(timeout);
      hidePreloader();
    });

    if (document.readyState === 'complete') {
      clearTimeout(timeout);
      hidePreloader();
    }
  } else {
    // Jika tidak ada preloader, langsung jalankan AOS
    initAOS();
  }

});