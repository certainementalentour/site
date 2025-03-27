// @ts-check

document.addEventListener("DOMContentLoaded", () => {
	/** @type {HTMLTextAreaElement | null} */
	const userInput = document.querySelector("#userInput");
	
	if (userInput) {
		userInput.addEventListener("click", () => {
		/** @type {HTMLElement | null} */
		const textElement = document.querySelector(".tbtxt span");
		const script = document.createElement("script");
		script.src = "ressources/scripts/desactivation.js";
		document.head.appendChild(script);
	
		if (textElement && textElement.textContent) {
			textElement.textContent = textElement.textContent.replace(
			"Assurez vous de bien avoir lu notre politique de confidentialité",
			"Assurez nous de bien avoir lu notre politique de confidentialité"
			);
		}
	 });
   }
});

	

const fullText = `Notre site web peut utiliser des cookies et autres technologies liées (par simplification, toutes ces technologies sont désignées par le terme « cookies »). Des cookies sont également placés par des tierces parties que nous avons engagées. Dans le document ci-dessous, nous vous informons de l’utilisation des cookies sur notre site web. Que sont les cookies ? Un cookie est un petit fichier simple envoyé avec les pages de ce site web et stocké par votre navigateur sur le disque dur de votre ordinateur ou d’un autre appareil. Les informations qui y sont stockées peuvent être renvoyées à nos serveurs ou aux serveurs des tierces parties concernées lors d’une visite ultérieure. Votre activité sur ce service peut être utilisée pour créer ou améliorer un profil vous concernant à des fins de publicité ou de contenu personnalisé. Si vous sautez cette ligne, vous acceptez que Alain Dumeige vienne chez vous la nuit et vous regarde dormir en se tenant à côté de votre lit. Si vous lisez ceci, cette clause sera nulle et non avenue. Les performances de la publicité et du contenu peuvent être mesurées. Des rapports peuvent être générés en fonction de votre activité et de celle des autres. Certains partenaires ne demandent pas votre consentement pour le traitement de vos données, et s'appuient plutôt sur leur intérêt légitime. Consultez notre liste de partenaires pour voir les finalités pour lesquelles ils pensent avoir un intérêt légitime et comment vous pourrez vous y opposer.`;
/*
const fullText = `N`
*/
const referenceText = /** @type {HTMLElement} */ (document.getElementById("referenceText"));
const userInput = /** @type {HTMLTextAreaElement} */ (document.getElementById("userInput"));
const validateButton = /** @type {HTMLButtonElement} */ (document.getElementById("validate"));


/** @returns {string} */
function getPlainTextFromFullText() {
	const tempEl = document.createElement("div");
	tempEl.innerHTML = fullText;
	return tempEl.innerText;
}

function updateReferenceText() {
	const plainFullText = getPlainTextFromFullText();
	const allowedChars = new Set(plainFullText);

	allowedChars.add("«");
	allowedChars.add("»");
	allowedChars.add("“");
	allowedChars.add("”");
	allowedChars.add("’");
	allowedChars.add("‘");
	allowedChars.add("'");
	allowedChars.add('"');

	
	// Filtrer la saisie
	let userText = userInput.value;
	let filteredUserText = "";
	for (const ch of userText) {
		if (allowedChars.has(ch)) {
		filteredUserText += ch;
		}
	}
	if (filteredUserText !== userText) {
		userText = filteredUserText;
		userInput.value = filteredUserText;
	}

	let formattedText = "";
	let userIndex = 0; // indice pour la saisie utilisateur
	let correctCount = 0;

	// Fonction pour gérer les différents guillemets
	function isSpecialQuote(ch) {
		return ["«", "»", "“", "”", "’", "‘", "'", '"'].includes(ch);
	}
	
	for (let i = 0; i < plainFullText.length; i++) {
		const expectedChar = plainFullText[i];
	
		if (userIndex < userText.length) {
			const userChar = userText[userIndex];
			if (userChar === expectedChar) {
				formattedText += expectedChar;
				correctCount++;
			} else if (isSpecialQuote(expectedChar) && (userChar === "'" || userChar === '"')) {
				// On considère la saisie comme correcte et on remplace par le caractère tapé
				formattedText += userChar;
				correctCount++;
			} else {
				formattedText += `<span class="incorrect">${expectedChar}</span>`;
			}
			userIndex++;
			} else {
			formattedText += expectedChar;
			}
		}
		
		referenceText.innerHTML = formattedText;
		referenceText.scrollTop = userInput.scrollTop;
		
		const percentage = correctCount / plainFullText.length;
		// Afficher le bouton dès que 90% des caractères sont cjustes
		validateButton.classList.toggle("hidden", percentage < 0.9);
	}
		
	userInput.addEventListener("input", () => {
		updateReferenceText();
	});
		
	userInput.addEventListener("scroll", () => {
		referenceText.scrollTop = userInput.scrollTop;
	});
		
	// Initialisation
	updateReferenceText();