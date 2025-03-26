// page d'exemples de fonctions de gestion de cookies


function obtenirValeurcookie(cookieName) {
	const name = cookieName + "=";
	const decodedCookie = decodeURIComponent(document.cookie);
	const cookieArray = decodedCookie.split('; ');
  
	for (let i = 0; i < cookieArray.length; i++) {
	  if (cookieArray[i].indexOf(name) === 0) {
		return cookieArray[i].substring(name.length);
	  }
	}
	return null; // Si le cookie n'existe pas
} function depotCookie(cookieName, value, daysToLive, options) {
	//depotCookie('cle', 'valeur', int, { path: '/', domain: 'example.tld', secure: true });
	let expires = ""
	if (daysToLive) {
		let date = new Date();
		date.setTime(date.getTime() + (daysToLive * 24 * 60 *1000));
		expires = "; expires=" + date.toUTCString();
	} else {
		expires = "";
	}
	let cookie = cookieName + "=" + (value || "") + expires;
	if (options) {
		for (let key in options) {
			cookie += `; ${key}=${options[key]}`;
		}
	}
	document.cookie = cookie;
} function retirerCookie(cookieName) {depotCookie(cookieName, "", -1);}

function verificationConfientialite() {
	const valeurCookie = obtenirValeurcookie('validationConfidentialite');
	if (valeurCookie) {
		return true;
	} else {
		return false;
	}
}


//let valide = false;
//depotCookie('validationConfidentialite', valide, 5);


/*
                                                     ___
                     ( )_ ____                ___.--'   `--(  )
                     //      \      __.------'              ||
                    //        `----'                        ||
                   //    XXXXXX XXXXXXX XX XXXXXXXX X XXXX  ||
                  //                                        ||
                 //        J69QN-8FHK3-P7GYJ-WFWMA-R3KTQ    ||
   ,,,,,        //                                  ,,,,,   ||
  ;;;;;\      ,/(_/     Xx Xxxxxx xxxxx Xxxxxxxxx  ;;;;;\   ||
  ';;C '\   .'//     ____                    /--'-'';;C '\-\|-:
   );  _) .' //\____'    `----.____.--`\----'       );  _)  / :
 .'=. (  '/|//                                    .'=. (   / /
|   )`-\.' __/                                    |   )`-\/ /|
\   \ ,'\///                                      \   \ /  /||
 ;.  '  ///                                        ;.  '  / ||
 | `._,'//                                         | `._,'|-||:
 \     //                                          \      )-||:
  )===//]                                           )=====] ||
 /   // \                                          /       \||
 \_ (/   |                                         \_      )||
  \      |\                                        \\      |
  \      | \                                        \\     |
  |      |  )                                       ||     /
  |     /  /                                        ||    |
   \    | /                                         \\    |
   |    |/                                          ||    |
  /|    |                                           ||    |
 /\|    |                                           ||    |
/`.|    |                                           ||    |
`=.[____)                                           |[___/
    )  '`--.                                        ))  '`--.
    `='===='                                        ``='===='
*/