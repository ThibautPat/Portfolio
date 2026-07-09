function setActiveSection(sectionId) {
	document.querySelectorAll('#nav .links li').forEach(function (li) {
		var link = li.querySelector('a[data-section]');
		li.classList.toggle('active', link && link.dataset.section === sectionId);
	});

	document.querySelectorAll('.side-nav-btn').forEach(function (btn) {
		btn.classList.toggle('active', btn.dataset.section === sectionId);
	});
}

function showSection(sectionId, event) {
	if (event) {
		event.preventDefault();
	}

	document.querySelectorAll('.content-section').forEach(function (section) {
		section.style.display = 'none';
	});

	var targetSection = document.getElementById(sectionId);
	if (targetSection) {
		targetSection.style.display = 'block';
	}

	var header = document.getElementById('header');
	var headerHeight = header ? header.offsetHeight : 0;
	window.scrollTo({
		top: headerHeight + 200,
		behavior: 'smooth'
	});

	setActiveSection(sectionId);
}

function initStarfield() {
	var wrapper = document.getElementById('wrapper');
	if (!wrapper || wrapper.querySelector('.starfield-canvas')) {
		return;
	}

	var canvas = document.createElement('canvas');
	canvas.className = 'starfield-canvas';
	canvas.setAttribute('aria-hidden', 'true');
	wrapper.insertBefore(canvas, wrapper.firstChild);

	var ctx = canvas.getContext('2d');
	var stars = [];
	var resizeTimer;

	function drawStars() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		var count = Math.min(65, Math.max(35, Math.floor(width * height / 22000)));

		canvas.width = width;
		canvas.height = height;
		stars = [];

		for (var i = 0; i < count; i++) {
			stars.push({
				x: Math.random() * width,
				y: Math.random() * height,
				r: Math.random() * 1.1 + 0.3,
				o: Math.random() * 0.38 + 0.14,
				cool: Math.random() > 0.78
			});
		}

		ctx.clearRect(0, 0, width, height);

		for (var j = 0; j < stars.length; j++) {
			var star = stars[j];
			ctx.beginPath();
			ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
			ctx.fillStyle = star.cool
				? 'rgba(200, 210, 255, ' + star.o + ')'
				: 'rgba(255, 255, 255, ' + star.o + ')';
			ctx.fill();
		}
	}

	function onResize() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(drawStars, 150);
	}

	drawStars();
	window.addEventListener('resize', onResize);
}

function initSideNav() {
	var nav = document.getElementById('nav');
	var main = document.getElementById('main');
	var sideNav = document.getElementById('side-nav');
	if (!nav || !sideNav || !main) {
		return;
	}

	var ticking = false;

	function updateSideNav() {
		var navBottom = nav.getBoundingClientRect().bottom;
		var mainTop = main.getBoundingClientRect().top;
		var show = navBottom <= 0 && mainTop < window.innerHeight * 0.9;
		sideNav.classList.toggle('is-visible', show);
		ticking = false;
	}

	function onScroll() {
		if (!ticking) {
			ticking = true;
			requestAnimationFrame(updateSideNav);
		}
	}

	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll, { passive: true });
	updateSideNav();

	sideNav.querySelectorAll('[data-section]').forEach(function (link) {
		link.addEventListener('click', function (event) {
			showSection(link.dataset.section, event);
		});
	});
}

function initCarousels() {
	document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
		var track = carousel.querySelector('.carousel-track');
		var slides = carousel.querySelectorAll('.carousel-slide');
		var prevBtn = carousel.querySelector('.carousel-btn--prev');
		var nextBtn = carousel.querySelector('.carousel-btn--next');
		var dotsContainer = carousel.querySelector('.carousel-dots');
		var current = 0;
		var autoplayTimer = null;
		var autoplayDelay = 10000;

		if (!track || slides.length === 0) {
			return;
		}

		function goTo(index) {
			current = (index + slides.length) % slides.length;
			track.style.transform = 'translateX(-' + (current * 100) + '%)';

			if (dotsContainer) {
				dotsContainer.querySelectorAll('.carousel-dot').forEach(function (dot, i) {
					dot.classList.toggle('active', i === current);
					dot.setAttribute('aria-selected', i === current ? 'true' : 'false');
				});
			}
		}

		function startAutoplay() {
			stopAutoplay();
			autoplayTimer = setInterval(function () {
				goTo(current + 1);
			}, autoplayDelay);
		}

		function stopAutoplay() {
			if (autoplayTimer) {
				clearInterval(autoplayTimer);
				autoplayTimer = null;
			}
		}

		function resetAutoplay() {
			startAutoplay();
		}

		if (dotsContainer) {
			slides.forEach(function (_, index) {
				var dot = document.createElement('button');
				dot.type = 'button';
				dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
				dot.setAttribute('role', 'tab');
				dot.setAttribute('aria-label', 'Projet ' + (index + 1));
				dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
				dot.addEventListener('click', function () {
					goTo(index);
					resetAutoplay();
				});
				dotsContainer.appendChild(dot);
			});
		}

		if (prevBtn) {
			prevBtn.addEventListener('click', function () {
				goTo(current - 1);
				resetAutoplay();
			});
		}

		if (nextBtn) {
			nextBtn.addEventListener('click', function () {
				goTo(current + 1);
				resetAutoplay();
			});
		}

		carousel.addEventListener('mouseenter', stopAutoplay);
		carousel.addEventListener('mouseleave', startAutoplay);
		carousel.addEventListener('focusin', stopAutoplay);
		carousel.addEventListener('focusout', function (event) {
			if (!carousel.contains(event.relatedTarget)) {
				startAutoplay();
			}
		});

		document.addEventListener('visibilitychange', function () {
			if (document.hidden) {
				stopAutoplay();
			} else {
				startAutoplay();
			}
		});

		startAutoplay();
	});
}

function bindSectionLinks(selector) {
	document.querySelectorAll(selector).forEach(function (link) {
		link.addEventListener('click', function (event) {
			showSection(link.dataset.section, event);
		});
	});
}

document.addEventListener('DOMContentLoaded', function () {
	initStarfield();
	initSideNav();
	initCarousels();
	bindSectionLinks('#nav .links a[data-section]');
});
