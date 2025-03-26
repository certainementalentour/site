// @ts-check

/** @returns {void} */
function verifyCaptcha() {
	closeVerifyWindow();
	hideReCaptcha();
/*	alert("Verified!"); */
	setCookie("rcVerified", "true", 3 / 1440, { path: "/" }); // normalement il y a 1440 min par jour, le cookie dure donc 3 min
}


/** @type {HTMLElement | null} */
const reCAPTCHA = document.getElementById("reCAPTCHA");
/** @type {HTMLElement | null} */
const checkboxWindow = document.getElementById("fkrc-checkbox-window");
/** @type {HTMLElement | null} */
const checkboxBtnSpinner = document.getElementById("fkrc-spinner");
/** @type {HTMLElement | null} */
const verifyWindow = document.getElementById("fkrc-verifywin-window");
/** @type {HTMLElement | null} */
const verifyWindowArrow = document.getElementById("fkrc-verifywin-window-arrow");
/** @type {HTMLElement | null} */
const close2025Btn = document.getElementById("close2025");

// Le paragraphe qui suit contient des horreurs incompréhensibles, mais tant que ca marche...
const rawVerifyBtn = document.getElementById("fkrc-verifywin-verify-button");
if (!(rawVerifyBtn instanceof HTMLButtonElement)) {
	throw new Error("cette fois c'est verifyBtn");
} console.clear() // tkt, erreurs réglées
const verifyBtn = rawVerifyBtn;
const rawCheckboxBtn = document.getElementById("fkrc-checkbox");
if (!(rawCheckboxBtn instanceof HTMLButtonElement)) {
	throw new Error("checkboxBtn pose problème");
}
const checkboxBtn = rawCheckboxBtn;


/** @returns {void} */
function addCaptchaListeners() {
	if (checkboxBtn && verifyBtn && close2025Btn) {
		document.addEventListener("click", function (event) {
			// Fermer la fenêtre si on clique dehors
			if (event.composedPath && verifyWindow && !event.composedPath().includes(verifyWindow) && isVerifyWindowVisible()){
				// !event.composedPath().includes(verifyWindow) -> si l'élément ayant activé l'évènement ne contient pas verifyWindow
				closeVerifyWindow();
			}
		});
		verifyBtn.addEventListener("click", function (event) {
			// Validation après le clic sur le bouton de validation
			event.preventDefault();
			verifyBtn.disabled = true;
			verifyCaptcha();
		});
		checkboxBtn.addEventListener("click", function (event) {
			// Animations de la case à cocher
			event.preventDefault();
			checkboxBtn.disabled = true;
			runClickedCheckboxEffects();
		});
		close2025Btn.addEventListener("click", function (event) {
			// Fermeture simple sans exécuter les autres fonctions
			event.preventDefault();
			checkboxBtn.disabled = true;
			hideReCaptcha();
		})
	}
}
addCaptchaListeners();

/** @returns {void} */
function addDOMListeners() {
	document.addEventListener("DOMContentLoaded", () => {
		if (getCookieValue("rcVerified")?.toLowerCase() === "true") {
			// masquer le captcha tant que le cookie de vérification est présent
			hideReCaptcha();
		}
	});
}
addDOMListeners();

/** 
 * animations de la case à cocher
 * @returns {void}
 */
function runClickedCheckboxEffects() {
	hideCaptchaCheckbox();
	setTimeout(showCaptchaLoading, 500);
	setTimeout(showVerifyWindow, 900);
}

/** @returns {void} */
function showCaptchaCheckbox() {
	if (!checkboxBtn) return;
	Object.assign(checkboxBtn.style, {
		width: "100%",
		height: "100%",
		borderRadius: "2px",
		margin: "21px 0 0 12px",
		opacity: "1",
	});
}

/** @returns {void} */
function hideCaptchaCheckbox() {
	if (!checkboxBtn) return;
	Object.assign(checkboxBtn.style, {
		width: "4px",
		height: "4px",
		borderRadius: "50%",
		marginLeft: "25px",
		marginTop: "33px",
		opacity: "0",});
}

/** @returns {void} */
function showCaptchaLoading() {
	if (!checkboxBtnSpinner) return;
		Object.assign(checkboxBtnSpinner.style, {
			visibility: "visible",
			opacity: "1"});
}

/** @returns {void} */
function hideCaptchaLoading() {
	if (!checkboxBtnSpinner) return;
		Object.assign(checkboxBtnSpinner.style, {
			visibility: "hidden",
			opacity: "0"});
}

/** @returns {void} */
function showVerifyWindow() {
	if (!verifyWindow || !checkboxWindow || !verifyWindowArrow) return; //vérifications ts, s'assurer que tous les éléments soient présents

	let verifyWindowHeight = verifyWindow.offsetHeight;  //obtenir la hauteur de la fenêtre
	if (verifyWindowHeight === 0) {
		// si elle est nulle (visibility: hidden), on calcule la hauteur
		verifyWindowHeight = parseInt(getComputedStyle(verifyWindow).height, 10);

		// Get computed style fait référence à tous les styles (une fois calculés) de l'élément en question (style par défaut, hérité, ajusté dynamiquement...)
		// GetComputedStyle(obj).height donne la hauteur finale de l'objet
		// En gros, c'est très pratique mais plus consommateur en ressources que de directement définir à hauteur voulue, utiliser avec modération
		//
		//parseInt(arg, 10) convertit en entier l'argument en base décimale, ignorant les caractères non numériques ("200px" -> 200)

	}
	const arrowVerticalCenter = checkboxWindow.offsetTop + 30; // Centrer sur la case à cocher

	Object.assign(verifyWindow.style, {
		display: "block",
		visibility: "visible",
		opacity: "1",
		top: `${arrowVerticalCenter - verifyWindowHeight / 2}px`,    // ça représente le positionnement de la pop-up par rapport à la case à cocher
		left: `${checkboxWindow.offsetLeft +55}px`,   				//  Position non mise à jour après un déplacement (visuel) de la case (zoom) 
	});

   if (verifyWindow.offsetTop < 5) {
	// s'assurer que la fenêtre ne soit pas trop haute
	   verifyWindow.style.top = "5px";
   }

   if (verifyWindow.offsetLeft + verifyWindow.offsetWidth > window.innerWidth - 10) {
	// ou trop à droite
	   verifyWindow.style.left =  `${checkboxWindow.offsetLeft - 8}px`;
   } else {
		Object.assign(verifyWindowArrow.style, {
			top: `${checkboxWindow.offsetTop + 30}px`,
			left: `${checkboxWindow.offsetLeft + 45}px`,  // Et on place le triangle 45 px à droite de la case à cocher, afin de ne pas se superposer
			visibility: "visible",
			opacity: "1",
		});
   }
}

/** @returns {void} */
function closeVerifyWindow() {
	if (!verifyWindow || !verifyWindowArrow || !checkboxBtn) return;
	Object.assign(verifyWindow.style, {
		display: "none",
		visibility: "hidden",
		opacity: "0"
	});
	Object.assign(verifyWindowArrow.style, {
		visibility: "hidden",
		opacity: "0"
	});
	showCaptchaCheckbox();
	hideCaptchaLoading();
	checkboxBtn.disabled = false;
	verifyBtn.disabled = false;
}

/** @returns {boolean} */
function isVerifyWindowVisible() {
	return verifyWindow ? verifyWindow.style.display !== "none" && verifyWindow.style.display !== "" : false;
}

/** @returns {void} */
function hideReCaptcha() {
	if (!reCAPTCHA) return;
	Object.assign(reCAPTCHA.style, {
		display: "none",
		visibility: "hidden",
		opacity: "0",
	});
}



/**
 * Récupère le contenu d'un cookie
 * @param {string} cookieName - le nom du cookie
 * @returns {string | null} - La valeur du cookie
 */
function getCookieValue(cookieName) {
	const name = cookieName + "=";
	const decodedCookie = decodeURIComponent(document.cookie);
	const cookieArray = decodedCookie.split('; ');

	for (let i = 0; i < cookieArray.length; i++) {
		if (cookieArray[i].indexOf(name) === 0) {
			return cookieArray[i].substring(name.length);
		}
	}
	return null; // Si le cookie n'existe pas
}

/**
 * Dépose un cookie avec les options données
 * @param {string} cookieName - le nom du cookie
 * @param {string} value - la valeur du cookie
 * @param {number} [daysToLive] - le nombre de jours avant expiration
 * @param {{ path?: string, domain?: string, secure?: boolean, sameSite?: 'Strict' | 'Lax' | 'None' }} [options] - Options supplémentaires du cookie.
 */
function setCookie(cookieName, value, daysToLive, options = {}) {
	let expires = "";
	if (daysToLive) {
		let date = new Date();
		date.setTime(date.getTime() + (daysToLive * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}

	let cookie = `${cookieName}=${encodeURIComponent(value)}${expires}`;


	for (let key in options) {
		if (options[key] === true) {
			// pour les options comme secure, qui s'écrivent directement ;secure et non ;secure=true
			cookie += `; ${key}`;
		} else if (options[key]) {
			// les autres options avec une valeur spécifique
			cookie += `; ${key}=${options[key]}`;
		}
	}
	document.cookie = cookie;
}

/**
 * supprime un cookie
 * @param {string} cookieName - le nom du cookie à supprimer
 * @returns {void}
 */
function removeCookie(cookieName) {
	setCookie(cookieName, "", -1, { path: "/"});
	// on définit une date d'expiration passée pour que le cookie se fasse supprimer
	// { path: "/"} -> assure la suppression si le cookie a été déposé avec un path spécifique
}
