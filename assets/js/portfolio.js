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

var PROJECTS_DATA_URL = 'data/projects.json';
var TAGS_DATA_URL = 'data/tags.json';

var projectBrowserData = {
	projects: [],
	availableTags: []
};

var projectBrowserFilters = {
	all: { search: '', tag: '' },
	school: { search: '', tag: '' },
	personal: { search: '', tag: '' }
};

function createTextElement(tagName, className, text) {
	var element = document.createElement(tagName);
	if (className) {
		element.className = className;
	}
	element.textContent = text;
	return element;
}

function getProjectDescription(project) {
	if (project.descriptions && project.descriptions.length > 0) {
		return project.descriptions[0];
	}
	return 'Description a completer.';
}

function createProjectTags(tags) {
	var tagList = document.createElement('div');
	tagList.className = 'project-tags';

	(tags || []).forEach(function (tag) {
		tagList.appendChild(createTextElement('span', 'carousel-tag', tag));
	});

	return tagList;
}

function createProjectLinks(project, includeDetailLink) {
	var icons = document.createElement('div');
	icons.className = 'icons project-links';

	if (project.links && project.links.github) {
		var githubLink = document.createElement('a');
		githubLink.href = project.links.github;
		githubLink.className = 'icon brands fa-github';
		githubLink.target = '_blank';
		githubLink.rel = 'noopener';
		githubLink.appendChild(createTextElement('span', 'label', 'GitHub'));
		icons.appendChild(githubLink);
	}

	if (project.links && project.links.store) {
		var storeLink = document.createElement('a');
		storeLink.href = project.links.store;
		storeLink.target = '_blank';
		storeLink.rel = 'noopener';
		storeLink.textContent = 'Store';
		icons.appendChild(storeLink);
	}

	if (includeDetailLink !== false) {
		var detailLink = document.createElement('a');
		detailLink.href = 'project.html?project=' + encodeURIComponent(project.slug);
		detailLink.className = 'button small project-detail-link';
		detailLink.textContent = 'Voir le projet';
		icons.appendChild(detailLink);
	}

	return icons;
}

function isProjectInProgress(project) {
	return project.status && project.status.trim().toLowerCase() === 'en cours';
}

function createCarouselSlideMeta(project) {
	var meta = document.createElement('div');
	meta.className = 'carousel-slide-meta';
	meta.dataset.tags = JSON.stringify(project.tags || []);

	if (project.status) {
		meta.appendChild(createTextElement('span', 'carousel-tag project-status', project.status));
	}

	(project.tags || []).forEach(function (tag) {
		meta.appendChild(createTextElement('span', 'carousel-tag carousel-tag--item', tag));
	});

	return meta;
}

function getCarouselMetaMaxHeight(meta, maxLines) {
	var probe = meta.querySelector('.carousel-tag');
	if (!probe) {
		return 0;
	}

	var style = window.getComputedStyle(meta);
	var gap = parseFloat(style.rowGap) || parseFloat(style.gap) || 0;
	var lineHeight = probe.offsetHeight;

	return lineHeight * maxLines + gap * Math.max(0, maxLines - 1);
}

function carouselMetaFits(meta, maxLines) {
	return meta.scrollHeight <= getCarouselMetaMaxHeight(meta, maxLines) + 1;
}

function applyCarouselMetaTrim(meta) {
	var maxLines = 1;
	var tagLabels = [];

	try {
		tagLabels = JSON.parse(meta.dataset.tags || '[]');
	} catch (error) {
		tagLabels = [];
	}

	meta.querySelectorAll('.carousel-tag--item, .carousel-tag--more').forEach(function (element) {
		element.remove();
	});

	tagLabels.forEach(function (tag) {
		meta.appendChild(createTextElement('span', 'carousel-tag carousel-tag--item', tag));
	});

	var items = Array.prototype.slice.call(meta.querySelectorAll('.carousel-tag--item'));

	while (!carouselMetaFits(meta, maxLines) && items.length > 0) {
		var removedTag = items.pop();
		removedTag.remove();
	}

	if (items.length < tagLabels.length) {
		meta.appendChild(createTextElement('span', 'carousel-tag carousel-tag--more', '...'));

		while (!carouselMetaFits(meta, maxLines) && items.length > 0) {
			items.pop().remove();
		}
	}
}

function trimAllCarouselMetas() {
	document.querySelectorAll('.carousel-slide-meta').forEach(applyCarouselMetaTrim);
}

var carouselMetaResizeTimer;

function scheduleCarouselMetaTrim() {
	clearTimeout(carouselMetaResizeTimer);
	carouselMetaResizeTimer = setTimeout(trimAllCarouselMetas, 120);
}

function createCarouselSlide(project) {
	var slide = document.createElement('article');
	slide.className = 'glass-panel carousel-slide';

	var imageBlock = document.createElement('div');
	imageBlock.className = 'carousel-slide-image';

	var image = document.createElement('img');
	image.src = project.coverImage || (project.images && project.images[0]) || 'images/star_citizen.jpg';
	image.alt = project.name;
	imageBlock.appendChild(image);

	var content = document.createElement('div');
	content.className = 'carousel-slide-content';
	content.appendChild(createCarouselSlideMeta(project));
	content.appendChild(createTextElement('h3', '', project.name));
	content.appendChild(createTextElement('p', '', getProjectDescription(project)));

	slide.appendChild(imageBlock);
	slide.appendChild(content);

	return slide;
}

function renderCurrentProjectsCarousel(projects) {
	var track = document.querySelector('[data-current-projects]');
	if (!track) {
		return;
	}

	var inProgressProjects = projects.filter(isProjectInProgress);
	var carousel = track.closest('[data-carousel]');
	var dotsContainer = carousel ? carousel.querySelector('.carousel-dots') : null;

	track.innerHTML = '';

	if (dotsContainer) {
		dotsContainer.innerHTML = '';
	}

	if (inProgressProjects.length === 0) {
		var section = track.closest('.current-projects-section');
		if (section) {
			section.style.display = 'none';
		}
		return;
	}

	inProgressProjects.forEach(function (project) {
		track.appendChild(createCarouselSlide(project));
	});

	scheduleCarouselMetaTrim();
}

function createProjectCardMeta(project) {
	var meta = document.createElement('div');
	meta.className = 'project-card-meta';

	if (project.status) {
		meta.appendChild(createTextElement('span', 'carousel-tag project-status', project.status));
	}

	(project.tags || []).forEach(function (tag) {
		meta.appendChild(createTextElement('span', 'carousel-tag', tag));
	});

	return meta;
}

function updateProjectCardToggle(card, button) {
	var isCompact = card.classList.contains('is-compact');
	button.textContent = isCompact ? '+' : '-';
	button.title = isCompact ? 'Afficher les informations' : 'Réduire les informations';
	button.setAttribute('aria-label', isCompact ? 'Afficher les informations du projet' : 'Réduire les informations du projet');
	button.setAttribute('aria-expanded', isCompact ? 'false' : 'true');
}

function createProjectCard(project) {
	var card = document.createElement('article');
	card.className = 'glass-panel game-block project-card project-card--clickable is-compact';
	var projectUrl = 'project.html?project=' + encodeURIComponent(project.slug);

	card.setAttribute('role', 'link');
	card.setAttribute('tabindex', '0');
	card.setAttribute('aria-label', 'Voir le projet ' + project.name);

	var toggleButton = document.createElement('button');
	toggleButton.type = 'button';
	toggleButton.className = 'project-card-toggle';
	toggleButton.addEventListener('click', function (event) {
		event.stopPropagation();
		card.classList.toggle('is-compact');
		updateProjectCardToggle(card, toggleButton);
	});
	updateProjectCardToggle(card, toggleButton);

	var imageBlock = document.createElement('div');
	imageBlock.className = 'image-block';

	var image = document.createElement('img');
	image.src = project.coverImage || (project.images && project.images[0]) || 'images/star_citizen.jpg';
	image.alt = project.name;
	imageBlock.appendChild(image);

	var textBlock = document.createElement('div');
	textBlock.className = 'text-block';
	textBlock.appendChild(createTextElement('p', 'project-date', project.date || 'Date a definir'));

	if (project.status || (project.tags && project.tags.length > 0)) {
		textBlock.appendChild(createProjectCardMeta(project));
	}

	textBlock.appendChild(createTextElement('h3', '', project.name));
	textBlock.appendChild(createTextElement('p', 'project-summary', getProjectDescription(project)));
	textBlock.appendChild(createProjectLinks(project, false));

	card.appendChild(toggleButton);
	card.appendChild(imageBlock);
	card.appendChild(textBlock);

	card.addEventListener('click', function (event) {
		if (event.target.closest('.project-card-toggle, .project-links a')) {
			return;
		}
		window.location.href = projectUrl;
	});

	card.addEventListener('keydown', function (event) {
		if (event.target.closest('.project-card-toggle')) {
			return;
		}
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			window.location.href = projectUrl;
		}
	});

	return card;
}

function normalizeSearchValue(value) {
	return (value || '').trim().toLowerCase();
}

function projectMatchesCategory(project, browserKey) {
	if (browserKey === 'school') {
		return project.category === 'school';
	}

	if (browserKey === 'personal') {
		return project.category === 'personal';
	}

	return true;
}

function getFilteredProjects(browserKey) {
	var filters = projectBrowserFilters[browserKey] || { search: '', tag: '' };
	var searchQuery = normalizeSearchValue(filters.search);
	var selectedTag = filters.tag || '';

	return projectBrowserData.projects.filter(function (project) {
		if (!projectMatchesCategory(project, browserKey)) {
			return false;
		}

		if (searchQuery && normalizeSearchValue(project.name).indexOf(searchQuery) === -1) {
			return false;
		}

		if (selectedTag && (project.tags || []).indexOf(selectedTag) === -1) {
			return false;
		}

		return true;
	});
}

function getEmptyProjectsMessage(browserKey, filters) {
	var hasActiveFilters = normalizeSearchValue(filters.search) || filters.tag;

	if (hasActiveFilters) {
		return 'Aucun projet ne correspond à votre recherche.';
	}

	if (browserKey === 'school' || browserKey === 'personal') {
		return 'Aucun projet pour le moment.';
	}

	return 'Aucun projet pour le moment.';
}

function renderProjectList(browserKey) {
	var container = document.querySelector('[data-project-list="' + browserKey + '"]');
	if (!container) {
		return;
	}

	var filters = projectBrowserFilters[browserKey] || { search: '', tag: '' };
	var matchingProjects = getFilteredProjects(browserKey);

	container.innerHTML = '';

	if (matchingProjects.length === 0) {
		container.appendChild(createTextElement('p', 'project-empty', getEmptyProjectsMessage(browserKey, filters)));
		return;
	}

	matchingProjects.forEach(function (project) {
		container.appendChild(createProjectCard(project));
	});
}

function renderAllProjectLists() {
	['all', 'school', 'personal'].forEach(renderProjectList);
}

function updateTagFilterButtons(browser) {
	var browserKey = browser.dataset.projectBrowser;
	var filters = projectBrowserFilters[browserKey] || { search: '', tag: '' };
	var tagButtons = browser.querySelectorAll('[data-project-tag]');

	tagButtons.forEach(function (button) {
		var isActive = button.dataset.projectTag === filters.tag;
		button.classList.toggle('is-active', isActive);
		button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
	});
}

function createTagFilterButton(browserKey, tag) {
	var button = document.createElement('button');
	button.type = 'button';
	button.className = 'project-tag-filter-btn';
	button.dataset.projectTag = tag;
	button.textContent = tag;
	button.setAttribute('aria-pressed', 'false');

	button.addEventListener('click', function () {
		var filters = projectBrowserFilters[browserKey];
		filters.tag = filters.tag === tag ? '' : tag;
		renderProjectList(browserKey);
		updateTagFilterButtons(button.closest('[data-project-browser]'));
	});

	return button;
}

function initProjectBrowser(browser) {
	var browserKey = browser.dataset.projectBrowser;
	if (!browserKey || !projectBrowserFilters[browserKey]) {
		return;
	}

	var searchInput = browser.querySelector('[data-project-search]');
	var tagList = browser.querySelector('[data-project-tag-list]');

	if (tagList) {
		tagList.innerHTML = '';

		projectBrowserData.availableTags.forEach(function (tag) {
			tagList.appendChild(createTagFilterButton(browserKey, tag));
		});
	}

	if (searchInput) {
		searchInput.value = projectBrowserFilters[browserKey].search;

		searchInput.addEventListener('input', function () {
			projectBrowserFilters[browserKey].search = searchInput.value;
			renderProjectList(browserKey);
		});
	}

	updateTagFilterButtons(browser);
}

function initProjectBrowsers() {
	document.querySelectorAll('[data-project-browser]').forEach(initProjectBrowser);
}

function extractTagsFromProjects(projects) {
	var tagMap = {};

	projects.forEach(function (project) {
		(project.tags || []).forEach(function (tag) {
			tagMap[tag] = true;
		});
	});

	return Object.keys(tagMap).sort(function (a, b) {
		return a.localeCompare(b, 'fr', { sensitivity: 'base' });
	});
}

function loadPortfolioData() {
	var projectsPromise = fetch(PROJECTS_DATA_URL).then(function (response) {
		if (!response.ok) {
			throw new Error('Chargement impossible: ' + response.status);
		}
		return response.json();
	});

	var tagsPromise = fetch(TAGS_DATA_URL)
		.then(function (response) {
			if (!response.ok) {
				return { tags: [] };
			}
			return response.json();
		})
		.catch(function () {
			return { tags: [] };
		});

	return Promise.all([projectsPromise, tagsPromise]).then(function (results) {
		var projectsData = results[0];
		var tagsData = results[1];
		var projects = projectsData.projects || [];
		var availableTags = (tagsData.tags || []).slice();

		if (availableTags.length === 0) {
			availableTags = extractTagsFromProjects(projects);
		}

		return {
			projects: projects,
			availableTags: availableTags
		};
	});
}

function renderProjectDetail(projects) {
	var container = document.querySelector('[data-project-detail]');
	if (!container) {
		return;
	}

	var params = new URLSearchParams(window.location.search);
	var slug = params.get('project');
	var project = projects.find(function (item) {
		return item.slug === slug;
	});

	container.innerHTML = '';

	if (!project) {
		container.appendChild(createTextElement('h2', '', 'Projet introuvable'));
		container.appendChild(createTextElement('p', '', "Le projet demandé n'existe pas encore dans data/projects.json."));
		return;
	}

	document.title = project.name + ' - Portfolio';

	var header = document.createElement('header');
	header.className = 'major project-detail-header';
	header.appendChild(createTextElement('span', 'date project-date', project.date || 'Date a definir'));
	header.appendChild(createTextElement('h2', '', project.name));
	header.appendChild(createProjectTags(project.tags));

	var panel = document.createElement('article');
	panel.className = 'glass-panel project-detail-panel';

	var gallery = document.createElement('div');
	gallery.className = 'project-gallery';

	(project.images || [project.coverImage]).filter(Boolean).forEach(function (imagePath) {
		var figure = document.createElement('figure');
		var image = document.createElement('img');
		image.src = imagePath;
		image.alt = project.name;
		figure.appendChild(image);
		gallery.appendChild(figure);
	});

	var content = document.createElement('div');
	content.className = 'project-detail-content';

	if (project.status) {
		content.appendChild(createTextElement('span', 'carousel-tag project-status', project.status));
	}

	(project.descriptions || []).forEach(function (description) {
		content.appendChild(createTextElement('p', '', description));
	});

	content.appendChild(createProjectLinks(project, false));
	panel.appendChild(gallery);
	panel.appendChild(content);

	container.appendChild(header);
	container.appendChild(panel);
}

function showProjectError(error) {
	document.querySelectorAll('[data-project-list], [data-project-detail]').forEach(function (container) {
		container.innerHTML = '';
		container.appendChild(createTextElement('p', 'project-empty', 'Impossible de charger les projets pour le moment.'));
	});

	var currentProjectsTrack = document.querySelector('[data-current-projects]');
	if (currentProjectsTrack) {
		currentProjectsTrack.innerHTML = '';
		var section = currentProjectsTrack.closest('.current-projects-section');
		if (section) {
			section.style.display = 'none';
		}
	}

	if (window.console) {
		console.error(error);
	}
}

function initProjects() {
	var needsProjects = document.querySelector('[data-project-list], [data-project-detail], [data-current-projects]');
	if (!needsProjects) {
		return;
	}

	loadPortfolioData()
		.then(function (data) {
			projectBrowserData.projects = data.projects;
			projectBrowserData.availableTags = data.availableTags;

			initProjectBrowsers();
			renderAllProjectLists();
			renderProjectDetail(data.projects);
			renderCurrentProjectsCarousel(data.projects);
			initCarousels();
		})
		.catch(showProjectError);
}

function bindSectionLinks(selector) {
	document.querySelectorAll(selector).forEach(function (link) {
		link.addEventListener('click', function (event) {
			showSection(link.dataset.section, event);
		});
	});
}

function initInitialSection() {
	var sectionId = window.location.hash.replace('#', '');
	var section = document.getElementById(sectionId);
	if (section && section.classList.contains('content-section')) {
		showSection(sectionId);
	}
}

document.addEventListener('DOMContentLoaded', function () {
	initStarfield();
	initSideNav();
	initProjects();
	bindSectionLinks('#nav .links a[data-section]');
	initInitialSection();
	window.addEventListener('resize', scheduleCarouselMetaTrim, { passive: true });
});
