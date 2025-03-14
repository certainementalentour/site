// @ts-check
// initialisation
let originalTitle = document.title;

function getRandomPercentage() {
	return Math.floor(Math.random() * 101);
}

function getRandomDuration() {
	return Math.random() * (10000 - 3000) + 3000;  // nb entre 0 et 1 exclus, multiplié par la différence du délai max et min (donne une valeur pseudo-aléatoire entre 0 et intervalleMax), + 500 pour tjrs avoir une demi-seconde de délai
}

function getBassBoostedState() {
  var isBassBoosted = false;
  if (Math.random() >= .8) {
    isBassBoosted = true;
  }
  return isBassBoosted;
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

// Il faut verrouiller le curseur avant de mettre le plein écran
document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay");
    const closeBtn = document.getElementById("closeOverlay");
    const shutdownSound = document.getElementById("shutdownSound");
    const shutdownLoudSound = document.getElementById("shutdownLoudSound");
    const bassBoosted = getBassBoostedState();
    if (closeBtn) {
        closeBtn.addEventListener("click", async () => {
            try {
                // Passer en plein écran
                if (!document.fullscreenElement) {
                    await document.documentElement.requestFullscreen();
                }

                // Verrouiller le curseur
                await document.body.requestPointerLock();

                const script = document.createElement("script");
                script.src = "ressources/scripts/desactivation.js";
                document.head.appendChild(script);

                // Masquer l'overlay
                if (overlay){
                  overlay.style.display = "none";
                } else {
                  window.location.href = "/";
                }

                if (bassBoosted && shutdownLoudSound instanceof HTMLAudioElement) {
                  shutdownLoudSound.play();
                } else if (shutdownSound instanceof HTMLAudioElement){
                  shutdownSound.play(); 
                }
            } catch (error) {
                console.error("Erreur lors de la fermeture de l'overlay :", error);
            }
        });
    }

	document.addEventListener("pointerlockchange", () => {
		if (!document.pointerLockElement) {
			document.body.requestPointerLock();
		}
	});
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

  
function requestFullscreen() {
	const fullscreenEnabled = document.fullscreenEnabled;
	const onWindows = navigator.userAgent.indexOf("Windows") !== -1;

	if (!fullscreenEnabled || !onWindows) {
		window.location.href = "/";
		return;
	}

	document.documentElement.requestFullscreen();
}

/*
                          .,aad88888888888baa,.
                     ,ad8888888888888888888888888ba,
                 ,ad888888888888888888888888888888888ba,
              ,ad888888888P""'             `""Y888888888ba,
            a888888888P""                       ""Y888888888a
          a88888888""                               ""88888888a
        a888888888b,                                   "Y8888888a
      ,8888888888888b,                                   `Y8888888,
     d8888888' "888888b,                                   `8888888b
    8888888"     "Y88888b,                                   "8888888
   8888888'        "Y88888b,                                  `8888888
  d888888'     a,  8a"Y88888b,                                 `888888b
 d888888'      `8, `8) "Y88888b,                  ,ad888g,      `888888b
,888888'        8)  ]8   "Y88888b,            ,ad888888888b      `888888,
d88888P        ,8' ,8'     "Y88888b,      ,gPPR888888888888       Y88888b
888888'       ,8' ,8'        "Y88888b,,ad8""   `Y888888888P       `888888
888888        8)  8)           "Y888888"        (8888888""         888888
888888        8,  8,          ,ad8Y88888b,      d888""             888888
888888        `8, `8,     ,ad8""   "Y88888b,,ad8""                 888888
888888         `8, `" ,ad8""         "Y88888b"                     888888
Y88888,           ,gPPR8b           ,ad8Y88888b,                  ,88888P
`88888b          dP:::::Yb      ,ad8""   "Y88888b,                d88888'
 888888,         8):::::(8  ,ad8""         "Y88888b,             ,888888
 `888888,        Yb:;;;:d888""               "Y88888b,          ,888888'
  Y888888,        "8ggg8P"                     "Y88888b,       ,888888P
   Y88888b,                                      "Y88888b,    ,d88888P
    Y88888b,                                       "Y88888b, ,d88888P
     Y888888,                                        "Y888888888888P
      "888888b,                                        "8888888888"
        Y888888ba                                       a8888888P
         "Y8888888ba,                               ,ad8888888P"
            "Y88888888ba,._                   _.,ad88888888P"
               "Y88888888888bbaa,,_____,,aadd88888888888P"
                   "Y8888888888888888888888888888888P"
                       ""Y888888888888888888888P""
                             """""""""""""""
*/
