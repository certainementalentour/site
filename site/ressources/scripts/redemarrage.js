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
		progressElement.textContent = newMessage;
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


// Initialiser le cycle
updateProgress();