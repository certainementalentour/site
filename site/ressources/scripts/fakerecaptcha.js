// @ts-check

/** @returns {void} */
function verifyCaptcha() {
	closeVerifyWindow();
	hideReCaptcha();
/*	alert("Verified!"); */
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
}
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
			if (event.composedPath && verifyWindow && !event.composedPath().includes(verifyWindow) && isVerifyWindowVisible()){
				closeVerifyWindow();
			}
		});
		verifyBtn.addEventListener("click", function (event) {
			event.preventDefault();
			verifyBtn.disabled = true;
			verifyCaptcha();
		});
		checkboxBtn.addEventListener("click", function (event) {
			event.preventDefault();
			checkboxBtn.disabled = true;
			runClickedCheckboxEffects();
		});
		close2025Btn.addEventListener("click", function (event) {
			event.preventDefault();
			closeCaptcha();
		})
	}
}
addCaptchaListeners();

/** @returns {void} */
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

	const verifyWindowHeight = verifyWindow.offsetHeight;
	const arrowVerticalCenter = checkboxWindow.offsetTop + 30;  //+30 car on a déjà bougé le curseur

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
function closeCaptcha() {
	closeVerifyWindow();
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