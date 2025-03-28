//@ts-check

/** @type {HTMLElement | null} */
const parking = document.getElementById("parkingZone");

/** @type {HTMLElement | null} */
const message = document.getElementById("message");

/** @type {HTMLElement | null} */
const dots = document.getElementById("newtons-cradle");

let startTime = 0;
let dotInterval = 0;
let dotCount = 0;

/**
 * Démarre l'animation des points.
 * Crée dynamiquement un conteneur fixe pour afficher l'animation.
 */
function startDotsAnimation() {
	if (!dots || !message) return;
	dots.style.display = "flex";
	message.innerText = ``;
}

/**
 * Arrête l'animation des points.
 */
function stopDotsAnimation() {
	clearInterval(dotInterval);
	if (!dots) return;
	dots.style.display = "none";	
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
	startTime = Date.now();  // Avec cette méthode, le compteur se réinitialise lors d'un changement d'onglet
	startDotsAnimation();
	});

	parking.addEventListener("focusout", () => {
		parking.classList.remove("active");
		stopDotsAnimation();
		if (startTime === 0) {
			console.log("Erreur : startTime n'est pas défini correctement.");
			return;
		}
		const duration = ((Date.now() - startTime) / 1000).toFixed(16);
		message.innerText = `Vous avez stationné ${duration} secondes, reposé ?`;
	});
}
addParkingListeners();
