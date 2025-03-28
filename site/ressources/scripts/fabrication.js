// @ts-check

/** @type {HTMLElement | null} */
const foon = document.getElementById('foon');
/** @type {HTMLElement | null} */
const ter = document.getElementById('terminal');
/** @type {HTMLElement | null} */
const terh = document.getElementById('terh');

/** @type {HTMLDivElement | null} */
const terminal = document.querySelector(".console");
const rawinputField = document.getElementById("userInput");
if (!(rawinputField instanceof HTMLTextAreaElement)) {throw new Error("problème");}
const inputField = rawinputField;

if (!terminal || !inputField) {
	console.error('pas la bonne page ?')
}


function displayLoaders() {
	if (!foon || !ter || !terh) return;
	foon.style.display = 'none';
	ter.style.display = 'flex';
	terh.style.display = 'block';
}

/** @param {string} input - Commande tapée. */
function executeCommand(input) {
	if (!terminal) return;
	const args = input.trim().split(" "); //sépare les arguments de la commande sur les espaces
	const commandName = args[0]; // En fait la commande est stockée dans les arguments, mais on ne dira rien
	const commandArgs = args.slice(1); // à partir de l'index 1, ce sont les vrais arguments

	if (commands[commandName]) {
		try {/*
			const result = commands[commandName](...commandArgs);
			if (typeof result === "string") {
				terminal.innerHTML += `<div>>>> ${input}</div><div>${result}</div>`;
			}*/
			commands[commandName](...commandArgs);
		} catch (error) {
			terminal.innerHTML += `<div>>>> ${input}</div><div>Erreur: ${error.message}</div>`;
		} 
	} else {
		terminal.innerHTML += `<div>>>> ${input}</div><div> ${commandName} n’est pas reconnu en tant que commande interne ou externe, un programme exécutable ou un fichier de commandes. Tapez 'help' pour voir les commandes disponibles.</div>`;
	}
	terminal.scrollTop = terminal.scrollHeight;
}

/** @type {{ [key: string]: (...args: string[]) => string | void }} */
const commands = {
	"help": () => "Commandes disponibles: help, clear, man 'étape', echo [string], cd 'étape', mv 'source' 'destination'", // à améliorer
	"clear": () => { if (terminal) terminal.innerHTML = ""; return ""; },
	"man": (step) => { // manuel, à remplacer par un indice de la commande suivante si besoin
		const steps = {
			"récolte": "Étape 1: La récolte consiste à cueillir les cerises de café.",
			"lavage": "Étape 2: Le lavage élimine la pulpe et nettoie les grains.",
			"séchage": "Étape 3: Le séchage réduit l'humidité des grains.",
			"torréfaction": "Étape 4: La torréfaction chauffe les grains pour développer les arômes.",
			"broyage": "Étape 5: Le broyage transforme les grains torréfiés en café moulu."
		};
		if (step === "-h") {
			return Object.entries(steps).map(([key, value]) => `${key}: ${value}`).join("\n"); // donne le contenu de steps{}
		}
		// normalement si step === "-h", man aura déjà retourné et on n'aura pas besoin de prendre en compte cette option
		return steps[step] || `${step} n'est pas une étape valide.`; 
	},

	"mv": (source, destination) => {
		if (!source || ! destination) { // normalement on va taper 'mv torréfaction broyage'
			return "Usage: mv 'source' 'destination'";
		}
		move(source, destination);
	},

	"cd": (directory) => {
		if (!directory) {
			return "Usage: cd 'étape'";
		}
		changeDirectory(directory);
	},

	"echo": (...message) => {  // echo </div> donne quoi ?
		if (message.length === 0) {
			return "";
		}
		return message.join(" "); // avec ça, tout les arguments seront pris comme un seul message, pas d'erreurs
	},
};


/**
 * Affiche un message ds le terminal
 * @param {string} message - chaîne de caractères à afficher
 * @returns {void}
 */
/*
function echo(message) { // le message n'est pas échappé : on peut avoir un problème si le message contient des éléments html
	if (terminal) {
		terminal.innerHTML += `<div>${message}</div>`;
		terminal.scrollTop = terminal.scrollHeight;
	}
}
*/

/**
 * Déplace les images
 * @param {string} source - étape actuelle
 * @param {string} destination - étape suivante
 * @returns {void}
 */
function move(source, destination) {
	//
}

/**
 * là j'avoue je sais pas pourquoi tu veux cette fonction
 * @param {string} directory - étape de laquelle on obtiendra des infos ??
 * @returns {void}
 */
function changeDirectory(directory) {
	//
}



inputField.addEventListener("keydown", function (event) {
	if (event.key === "Enter") {
		event.preventDefault();
		const userInput = inputField.value.trim();
		if (userInput) {
			executeCommand(userInput);
		}
		inputField.value = "";
	}
});

/*
							,ooo888888888888888oooo,
						  o8888YYYYYY77iiiiooo8888888o
						 8888YYYY77iiYY8888888888888888
						[88YYY77iiY88888888888888888888]
						88YY7iYY888888888888888888888888
					   [88YYi 88888888888888888888888888]
					   i88Yo8888888888888888888888888888i
					   i]		^^^88888888^^^	 o  [i
					  oi8  i		   o8o		  i  8io
					,77788o ^^  ,oooo8888888ooo,   ^ o88777,
					7777788888888888888888888888888888877777
					 77777888888888888888888888888888877777
					  77777788888888^7777777^8888888777777
	   ,oooo888 ooo   88888778888^7777ooooo7777^8887788888		,o88^^^^888oo
	o8888777788[];78 88888888888888888888888888888888888887 7;8^ 888888888oo^88
   o888888iii788 ]; o 78888887788788888^;;^888878877888887 o7;[]88888888888888o
   88888877 ii78[]8;7o 7888878^ ^8788^;;;;;;^878^ ^878877 o7;8 ]878888888888888
  [88888888887888 87;7oo 777888o8888^;ii;;ii;^888o87777 oo7;7[]8778888888888888
  88888888888888[]87;777oooooooooooooo888888oooooooooooo77;78]88877i78888888888
 o88888888888888 877;7877788777iiiiiii;;;;;iiiiiiiii77877i;78] 88877i;788888888
 88^;iiii^88888 o87;78888888888888888888888888888888888887;778] 88877ii;7788888
;;;iiiii7iiii^  87;;888888888888888888888888888888888888887;778] 888777ii;78888
;iiiii7iiiii7iiii77;i88888888888888888888i7888888888888888877;77i 888877777ii78
iiiiiiiiiii7iiii7iii;;;i7778888888888888ii7788888888888777i;;;;iiii 88888888888
i;iiiiiiiiiiii7iiiiiiiiiiiiiiiiiiiiiiiiii8877iiiiiiiiiiiiiiiiiii877   88888
ii;;iiiiiiiiiiiiii;;;ii^^^;;;ii77777788888888888887777iii;;  77777		   78
77iii;;iiiiiiiiii;;;ii;;;;;;;;;^^^^8888888888888888888777ii;;  ii7		 ;i78
^ii;8iiiiiiii ';;;;ii;;;;;;;;;;;;;;;;;;^^oo ooooo^^^88888888;;i7		  7;788
o ^;;^^88888^	 'i;;;;;;;;;;;;;;;;;;;;;;;;;;;^^^88oo^^^^888ii7		 7;i788
88ooooooooo		 ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; 788oo^;;		  7;i888
887ii8788888	  ;;;;;;;ii;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;^87		   7;788
887i8788888^	 ;;;;;;;ii;;;;;;;oo;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,,,	  ;;888
87787888888	 ;;;;;;;ii;;;;;;;888888oo;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;,,;i788
87i8788888^	   ';;;ii;;;;;;;8888878777ii8ooo;;;;;;;;;;;;;;;;;;;;;;;;;;i788 7
77i8788888		   ioo;;;;;;oo^^ooooo ^7i88^ooooo;;;;;;;;;;;;;;;;;;;;i7888 78
7i87788888o		 7;ii788887i7;7;788888ooooo7888888ooo;;;;;;;;;;;;;;oo ^^^ 78
i; 7888888^	  8888^o;ii778877;7;7888887;;7;7788878;878;;	;;;;;;;i78888o ^
i8 788888	   [88888^^ ooo ^^^^^;;77888^^^^;;7787^^^^ ^^;;;;  iiii;i78888888
^8 7888^		[87888 87 ^877i;i8ooooooo8778oooooo888877ii; iiiiiiii788888888
  ^^^		  [7i888 87;; ^8i;;i7888888888888888887888888   i7iiiiiii88888^^
			   87;88 o87;;;;o 87i;;;78888788888888888888^^ o 8ii7iiiiii;;
			   87;i8 877;77888o ^877;;;i7888888888888^^ 7888 78iii7iii7iiii
			   ^87; 877;778888887o 877;;88888888888^ 7ii7888 788oiiiiiiiii
				 ^ 877;7 7888888887 877i;;8888887ii 87i78888 7888888888
				  [87;;7 78888888887 87i;;888887i  87ii78888 7888888888]
				  877;7 7788888888887 887i;887i^  87ii788888 78888888888
				  87;i8 788888888888887 887ii;;^ 87ii7888888 78888888888
				 [87;i8 7888888888888887 ^^^^   87ii77888888 78888888888
				 87;;78 7888888888888887ii	  87i78888888 778888888888
				 87;788 7888888888888887i]	  87i78888888 788888888888
				[87;88 778888888888888887	   7ii78888888 788888888888
				87;;88 78888888888888887]	   ii778888888 78888888888]
				7;;788 7888888888888888]		i7888888888 78888888888'
				7;;788 7888888888888888		 'i788888888 78888888888
				7;i788 788888888888888]		  788888888 77888888888]
				'7;788 778888888888888]		 [788888888 78888888888'
				';77888 78888888888888		  8888888888 7888888888]
				 778888 78888888888888		  8888888888 7888888888]
				  78888 7888888888888]		 [8888888888 7888888888
				   7888 788888888888]		  88888888888 788888888]
					778 78888888888]		   ]888888888 778888888]
					oooooo ^88888^			  ^88888^^^^^^^^8888]
				   87;78888ooooooo8o			,oooooo oo888oooooo
				   [877;i77888888888]		  [;78887i8888878i7888;
					^877;;ii7888ii788		  ;i777;7788887787;778;
					 ^87777;;;iiii777		  ;77^^^^^^^^^^^^^^^^;;
						^^^^^^^^^ii7]		   ^ o88888888877iiioo
						   77777o			   [88777777iiiiii;;778
							77777iii			8877iiiii;;;77888888]
							77iiii;8		   [77ii;778 788888888888
							7iii;;88		   iii;78888 778888888888
						   77i;78888]		  ;;;;i88888 78888888888
						  ,7;78888888		  [;;i788888 7888888888]
						  i;788888888		   ;i7888888 7888888888
						  ;788888888]		   i77888888 788888888]
						  ';88888888'		   [77888888 788888888]
						   [[8ooo88]			 78888888 788888888
							[88888]			  78888888 788888888
							  ^^^				[7888888 77888888]
												  88888888 7888887
												  77888888 7888887
												   ;i88888 788888i
												  ,;;78888 788877i7
												 ,7;;i;777777i7i;;7
												 87778^^^ ^^^^87778
												  ^^^^ o777777o ^^^
												  o77777iiiiii7777o
												 7777iiii88888iii777
												;;;i7778888888877ii;;
				   Imperial Stormtrooper	   [i77888888^^^^8888877i]
				  (Standard Shock Trooper)	 77888^oooo8888oooo^8887]
											  [788888888888888888888888]
											  88888888888888888888888888
											  ]8888888^iiiiiiiii^888888]
												iiiiiiiiiiiiiiiiiiiiii
													^^^^^^^^^^^^^
*/