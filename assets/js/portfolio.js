function showSection(sectionId, event) {
	event.preventDefault();

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

	document.querySelectorAll('#nav .links li').forEach(function (li) {
		li.classList.remove('active');
	});
	event.currentTarget.parentElement.classList.add('active');
}

document.addEventListener('DOMContentLoaded', function () {
	document.querySelectorAll('#nav .links a[data-section]').forEach(function (link) {
		link.addEventListener('click', function (event) {
			showSection(link.dataset.section, event);
		});
	});
});
