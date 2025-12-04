(function () {
  const page = document.body.dataset.page;
  const activeLink = document.querySelector(`[data-link="${page}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
})();
