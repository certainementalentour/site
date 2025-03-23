//Le pépin est que chaque frame est téléchargée à chaque affichage, même lorsque la boucle redémarre
// @ts-check

const frames2 = [
	'ressources/favicon/animation/cafe2/frame_00.png',
	'ressources/favicon/animation/cafe2/frame_01.png',
	'ressources/favicon/animation/cafe2/frame_02.png',
	'ressources/favicon/animation/cafe2/frame_03.png',
	'ressources/favicon/animation/cafe2/frame_04.png',
	'ressources/favicon/animation/cafe2/frame_05.png',
	'ressources/favicon/animation/cafe2/frame_06.png',
	'ressources/favicon/animation/cafe2/frame_07.png',
	'ressources/favicon/animation/cafe2/frame_08.png',
	'ressources/favicon/animation/cafe2/frame_09.png',
	'ressources/favicon/animation/cafe2/frame_10.png',
	'ressources/favicon/animation/cafe2/frame_11.png',
	'ressources/favicon/animation/cafe2/frame_12.png',
	'ressources/favicon/animation/cafe2/frame_13.png',
	'ressources/favicon/animation/cafe2/frame_14.png',
	'ressources/favicon/animation/cafe2/frame_15.png',
	'ressources/favicon/animation/cafe2/frame_16.png',
	'ressources/favicon/animation/cafe2/frame_17.png',
	'ressources/favicon/animation/cafe2/frame_18.png',
	'ressources/favicon/animation/cafe2/frame_19.png',
	'ressources/favicon/animation/cafe2/frame_20.png',
	'ressources/favicon/animation/cafe2/frame_21.png',
	'ressources/favicon/animation/cafe2/frame_22.png',
	'ressources/favicon/animation/cafe2/frame_23.png',
	'ressources/favicon/animation/cafe2/frame_24.png',
	'ressources/favicon/animation/cafe2/frame_25.png',
	'ressources/favicon/animation/cafe2/frame_26.png',
	'ressources/favicon/animation/cafe2/frame_27.png',
	'ressources/favicon/animation/cafe2/frame_28.png',
	'ressources/favicon/animation/cafe2/frame_29.png',
	'ressources/favicon/animation/cafe2/frame_30.png',
	'ressources/favicon/animation/cafe2/frame_31.png',
	'ressources/favicon/animation/cafe2/frame_32.png',
	'ressources/favicon/animation/cafe2/frame_33.png',
	'ressources/favicon/animation/cafe2/frame_34.png',
	'ressources/favicon/animation/cafe2/frame_35.png',
	'ressources/favicon/animation/cafe2/frame_36.png',
	'ressources/favicon/animation/cafe2/frame_37.png',
	'ressources/favicon/animation/cafe2/frame_38.png',
	'ressources/favicon/animation/cafe2/frame_39.png',
	'ressources/favicon/animation/cafe2/frame_40.png',
	'ressources/favicon/animation/cafe2/frame_41.png',
	'ressources/favicon/animation/cafe2/frame_42.png',
	'ressources/favicon/animation/cafe2/frame_43.png',
	'ressources/favicon/animation/cafe2/frame_44.png',
	'ressources/favicon/animation/cafe2/frame_45.png',
	'ressources/favicon/animation/cafe2/frame_46.png',
	'ressources/favicon/animation/cafe2/frame_47.png',
	'ressources/favicon/animation/cafe2/frame_48.png',
	'ressources/favicon/animation/cafe2/frame_49.png',
	'ressources/favicon/animation/cafe2/frame_50.png',
	'ressources/favicon/animation/cafe2/frame_51.png',
	'ressources/favicon/animation/cafe2/frame_52.png',
	'ressources/favicon/animation/cafe2/frame_53.png',
	'ressources/favicon/animation/cafe2/frame_54.png',
	'ressources/favicon/animation/cafe2/frame_55.png',
	'ressources/favicon/animation/cafe2/frame_56.png',
	'ressources/favicon/animation/cafe2/frame_57.png',
	'ressources/favicon/animation/cafe2/frame_58.png',
	'ressources/favicon/animation/cafe2/frame_59.png',
];
const frames1 = [
	'ressources/favicon/animation/cafe1/frame_00.png',
	'ressources/favicon/animation/cafe1/frame_00.png',
	'ressources/favicon/animation/cafe1/frame_02.png',
	'ressources/favicon/animation/cafe1/frame_03.png',
	'ressources/favicon/animation/cafe1/frame_04.png',
	'ressources/favicon/animation/cafe1/frame_05.png',
	'ressources/favicon/animation/cafe1/frame_06.png',
	'ressources/favicon/animation/cafe1/frame_07.png',
	'ressources/favicon/animation/cafe1/frame_08.png',
	'ressources/favicon/animation/cafe1/frame_09.png',
	'ressources/favicon/animation/cafe1/frame_10.png',
	'ressources/favicon/animation/cafe1/frame_11.png',
	'ressources/favicon/animation/cafe1/frame_12.png',
	'ressources/favicon/animation/cafe1/frame_13.png',
	'ressources/favicon/animation/cafe1/frame_14.png',
];
const animation = frames1;
let index = 0;
const interval = 100; // Intervalle entre chaque image en ms

function changeFavicon() {

	console.log("Index : " + index);

  const img = new Image();
  img.src = animation[index];
  img.crossOrigin = "anonymous"; // Évite les problèmes si les images viennent d'un autre domaine

  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");  // contexte
	if (!ctx) return;

    const size = 64; // Taille du favicon
    canvas.width = size;
    canvas.height = size;

    // Dessiner l'arrondi
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // Dessiner l'image
    ctx.drawImage(img, 0, 0, size, size);

    // Supprimer l'ancien favicon
	/** @type {HTMLLinkElement|null} */
    let link = document.querySelector("link[rel='icon']");
    if (!(link instanceof HTMLLinkElement)) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = canvas.toDataURL("image/png");
  };

  index = (index + 1) % animation.length;
}

setInterval(changeFavicon, interval);

/*
                      _____
                   ,-'     `._
                 ,'           `.        ,-.
               ,'               \       ),.\
     ,.       /                  \     /(  \;
    /'\\     ,o.        ,ooooo.   \  ,'  `-')
    )) )`. d8P"Y8.    ,8P"""""Y8.  `'  .--"'
   (`-'   `Y'  `Y8    dP       `'     /
    `----.(   __ `    ,' ,---.       (
           ),--.`.   (  ;,---.        )
          / \O_,' )   \  \O_,'        |
         ;  `-- ,'       `---'        |
         |    -'         `.           |
        _;    ,            )          :
     _.'|     `.:._   ,.::" `..       |
  --'   |   .'     """         `      |`.
        |  :;      :   :     _.       |`.`.-'--.
        |  ' .     :   :__.,'|/       |  \
        `     \--.__.-'|_|_|-/        /   )
         \     \_   `--^"__,'        ,    |
   -hrr- ;  `    `--^---'          ,'     |
          \  `                    /      /
           \   `    _ _          /
            \           `       /
             \           '    ,'
              `.       ,   _,'
                `-.___.---'
*/