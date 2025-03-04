var pages = [ // chemins relatifs au scripts svp
	"../../Fabrication.html",
	"../../FunFact.html",
	"../../index.html",
	"../../machine.html",
	"../../Pousse.html",
	"../../Recolte.html",
];

function getCurrentIndex() {
	var currentPath = window.location.pathname;
	var currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);
	return pages.indexOf(currentPage);
}

function previousPage() {
	var index = getCurrentIndex();
	if (index === -1) {
		console.error("Page introuvable.");
		return;
	}
	if (index > 0) {
		window.location.href = pages[index - 1];
	} else {
		window.location.href = pages[pages.length - 1];
	}
}

function nextPage() {
	var index = getCurrentIndex();
	if (index < pages.length - 1) {
		window.location.href = pages[index + 1];
	} else {
		window.location.href = pages[0];
	}
}