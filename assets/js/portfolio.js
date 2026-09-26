document.querySelectorAll('[data-year]').forEach(element => {
  element.textContent = new Date().getFullYear();
});
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('nav a[href^="#"]')];
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      links.forEach(link => {
        const active = link.hash === '#' + entry.target.id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -45% 0px' });
  document.querySelectorAll('main > section').forEach(section => observer.observe(section));
}
