(function () {
  const navLinks = document.querySelectorAll('.navbar nav a');
  const path = window.location.pathname.split('/').pop();
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path) {
      link.classList.add('active');
    }
  });
})();
