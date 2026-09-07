const motionButton = document.querySelector('#motion-toggle');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let paused = motionPreference.matches;
function updateMotion() {
  document.documentElement.classList.toggle('motion-paused', paused);
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.innerHTML = paused ? '<span aria-hidden="true">▷</span> Reprendre le voyage' : '<span aria-hidden="true">Ⅱ</span> Mettre en pause';
}
motionButton.addEventListener('click', () => { paused = !paused; updateMotion(); });
motionPreference.addEventListener('change', event => { paused = event.matches; updateMotion(); });
updateMotion();
document.querySelector('#year').textContent = new Date().getFullYear();
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('nav a')];
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
