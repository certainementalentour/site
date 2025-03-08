// initialisation
let originalTitle = document.title;

function getRandomPercentage() {
	return Math.floor(Math.random() * 101);
}

function getRandomDuration() {
	return Math.random() * (10000 - 3000) + 3000;  // nb entre 0 et 1 exclus, multiplié par la différence du délai max et min (donne une valeur pseudo-aléatoire entre 0 et intervalleMax), + 500 pour tjrs avoir une demi-seconde de délai
}

function updateProgress() {
	let percentage = getRandomPercentage();
	let newMessage = `Progression de la mise à jour : ${percentage}% -`;
	document.title = newMessage;
	let progressElement = document.getElementById("progress");
	if (progressElement) {
		progressElement.textContent = `${percentage}%`;
	}
	let nextDelay = getRandomDuration(); // Délai d'attente de la prochaine mise à jour
	let revertTitleDelay = nextDelay - 2500; // Quand remettre le titre original
	if (revertTitleDelay < 0) {
		revertTitleDelay = 0; // Si le délai est trop court, on remet le titre immédiatement
	}

	// Planifier le retour du titre
	setTimeout(() => {
		document.title = originalTitle;
	}, revertTitleDelay);

	// Planifier le prochain cycle
	setTimeout(updateProgress, nextDelay);
}

/* function requestFullscreen() {
	const fullscreenEnabled = document.fullscreenEnabled ||
							  document.webkitFullscreenEnabled || 
							  document.mozFullScreenEnabled || 
							  document.msFullscreenEnabled;
	const onWindows = navigator.userAgent.indexOf("Windows") !== -1;

	if (!fullscreenEnabled || !onWindows) {
		window.location.href = "/";
		return;
	}

	let docEl = document.documentElement;
	if (docEl.requestFullscreen) {
		docEl.requestFullscreen();
	} else if (docEl.mozRequestFullscreen) {
		docEl.mozRequestFullscreen();
	} else if (docEl.webkitRequestFullscreen) {
		docEl.webkitRequestFullscreen();
	} else if (docEl.msRequestFullscreen) {
		docEl.msRequestFullscreen();
	}
} */

document.addEventListener("DOMContentLoaded", () => {
	// Si l'utilisateur provient du bon bouton
	if (sessionStorage.getItem('fromMAJButton') === 'true') {
		// Retirer le flag pour une réutilisation ultérieure
		sessionStorage.removeItem('fromMAJButton');

		const script = document.createElement("script");
		script.src = "ressources/scripts/desactivation.js";
		document.head.appendChild(script);
	}

	// Initialiser le cycle de changement de valeur
	updateProgress();
});


/*
var count=0;
var p=setInterval(p, 10000);
function percentage()
{
  count+=1;

  if (count <= 0){
    clearInterval(percentage);
    return;
  }

  document.getElementById("progress").innerHTML=count +'%';

  if (count > 99){
    count=0;
    return;
  }
} */