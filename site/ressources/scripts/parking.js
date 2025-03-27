//@ts-check

/** @type {HTMLElement | null} */
const parking = document.getElementById("parkingZone");

/** @type {HTMLElement | null} */
const message = document.getElementById("message");

let startTime = 0;
let dotInterval = 0;
let dotCount = 0;

/**
 * Démarre l'animation des points.
 * Crée dynamiquement un conteneur fixe pour afficher l'animation.
 */
function startDotsAnimation() {
	if (!message) return;
	message.innerText = "Stationnement en cours";
	const dotContainer = document.createElement("span");
	dotContainer.id = "dotContainer";
	dotContainer.style.display = "inline-block";
	dotContainer.style.width = "3ch";
	message.appendChild(dotContainer);
	
	dotCount = 0;
	dotInterval = window.setInterval(() => {
	dotCount = (dotCount + 1) % 4; // cycle de 0 à 3 points
	dotContainer.innerText = ".".repeat(dotCount);
	}, 500);
}

/**
 * Arrête l'animation des points.
 */
function stopDotsAnimation() {
	clearInterval(dotInterval);
}

/** @param {Event} e - évènement à annuler */
function preventEditing(e) {
	// Empêche toute modification du contenu.
	e.preventDefault();
}

function addParkingListeners() {
	if (!parking || !message) return;

	// Permet de poser le curseur sans modifier le texte.
	parking.addEventListener("keydown", preventEditing);
	parking.addEventListener("paste", preventEditing);
	parking.addEventListener("cut", preventEditing);
	parking.addEventListener("input", (e) => {
	// Réinitialise le texte en cas de tentative de modification.
	parking.innerText = "╔═════════════════════════════════════════════╗\n║                                             ║\n║            Zone de stationnement            ║\n║                                             ║\n╚═════════════════════════════════════════════╝";
	// Remet le curseur en position initiale.
	const range = document.createRange();
	const sel = window.getSelection();
	range.selectNodeContents(parking);
	range.collapse(false);
	if (sel) {
		sel.removeAllRanges();
		sel.addRange(range);
	}
	e.preventDefault();
	});

	parking.addEventListener("focus", () => {
	parking.classList.add("active");
	startTime = Date.now();
	startDotsAnimation();
	});

	parking.addEventListener("blur", () => {
		parking.classList.remove("active");
		stopDotsAnimation();
		const duration = ((Date.now() - startTime) / 1000).toFixed(2);
		message.innerText = `Vous avez stationné ${duration} secondes, reposé ?`;
	});
}
addParkingListeners();
