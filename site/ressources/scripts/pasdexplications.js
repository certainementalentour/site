// @ts-check
document.addEventListener("DOMContentLoaded", () => {
	const bouton = document.getElementById("lebouton");
	const son = document.getElementById("son");
	const son2 = document.getElementById("son2");
	const meslo = document.querySelectorAll(".mesloLGS");
	let boutonBouge = true;

	bouton.addEventListener("mouseover", () => {
		if (boutonBouge) {
			document.addEventListener("mousemove", suivreSouris);
		}
	});
	
	function suivreSouris(event) {
		if (boutonBouge) {
			bouton.style.left = event.pageX + 10 + "px";
			bouton.style.top = event.pageY + 10 + "px";
		}
		}
	
		// Lorsque l'utilisateur clique sur le bouton, il devient immobile
		bouton.addEventListener("click", () => {
		boutonBouge = false; // Désactive le déplacement
		document.removeEventListener("mousemove", suivreSouris);
		
		meslo.forEach(element => {
			element.innerText = "ﴣ";
		});
		const elementsToChange = document.querySelectorAll("p, span, h1, h2, h3, h4, h5, h6, img, a, label, input, button");
        elementsToChange.forEach(element => {
            if (element.tagName.toLowerCase() === "img") {
                const span = document.createElement("span");
				span.style.fontFamily = 'mesloLGS';
				span.innerText = "ﴣ";
				span.style.fontSize = "100px";
				element.replaceWith(span);
            } else if (element.tagName.toLowerCase() === "input") {
                const span = document.createElement("span");
				span.style.fontFamily = 'mesloLGS';
				span.innerText = "ﴣ";
				element.replaceWith(span);
            } else {
                element.innerText = "ﴣ";
				element.style.fontFamily = 'mesloLGS';
            }
        });


		setTimeout(() => {
			bouton.style.backgroundColor = "red";
			bouton.innerHTML = '<img src="ressources/Images/j.png">';
			son.play();

			son.onended = () => {
				bouton.style.backgroundColor = "black";
				son2.play();
				bouton.innerHTML = '<img src="ressources/images/png.png" width="132" height="150">';
			};
			son2.onended = () => {

			};
		}, 2000);
		});
	});


/*
iIYVVVVXVVVVVVVVVYVYVYYVYYYYIIIIYYYIYVVVYYYYYYYYYVVYVVVVXVVVVVYI+.
tYVXXXXXXVXXXXVVVYVVVVVVVVVVVVYVVVVVVVVVVVVVVVVVXXXXXVXXXXXXXVVYi.
iYXRXRRRXXXXXXXXXXXVVXVXVVVVVVVVXXXVXVVXXXXXXXXXXXXXXRRRRRRRRRXVi.
tVRRRRRRRRRRRRRRRXRXXXXXXXXXXXXXXRRXXXXRRRRXXXXXXXRRRRRRRRRRRRXV+.
tVRRBBBRMBRRRRRRRRRXXRRRRRXt=+;;;;;==iVXRRRRXXXXRRRRRRRRMMBRRRRXi,
tVRRBMBBMMBBBBBMBBRBBBRBX++=++;;;;;;:;;;IRRRRXXRRRBBBBBBMMBBBRRXi,
iVRMMMMMMMMMMMMMMBRBBMMV==iIVYIi=;;;;:::;;XRRRRRRBBMMMMMMMMBBRRXi.
iVRMMMMMMMMMMMMMMMMMMMY;IBWWWWMMXYi=;:::::;RBBBMMMMMMMMMMMMMMBBXi,
+VRMMRBMMMMMMMMMMMMMMY+;VMMMMMMMRXIi=;:::::=VVXXXRRRMMMMMMMMBBMXi;
=tYYVVVXRRRXXRBMMMMMV+;=RBBMMMXVXXVYt;::::::ttYYVYVVRMMMMMMBXXVI+=
;=tIYYVYYYYYYVVVMMMBt=;;+i=IBi+t==;;i;::::::+iitIIttYRMMMMMRXVVI=;
;=IIIIYYYIIIIttIYItIt;;=VVYXBIVRXVVXI;::::::;+iitttttVMMBRRRVVVI+,
;+++tttIttttiiii+i++==;;RMMMBXXMMMXI+;::::::;+ittttitYVXVYYIYVIi;;
;===iiittiiIitiii++;;;;:IVRVi=iBXVIi;::::::::;==+++++iiittii+++=;;
;;==+iiiiiiiiii+++=;;;;;;VYVIiiiVVt+;::::::::;++++++++++iti++++=;;
;;=++iiii+i+++++iii==;;;::tXYIIYIi+=;:::::,::;+++++++++++++++++=;;
;;;+==+ii+++++iiiiit=;;:::::=====;;;::::::::::+++i+++++++++i+++;;;
;;;==+=+iiiiitttIIII+;;;:,::,;;;;:;=;;;::,::::=++++++++==++++++;;;
:;====+tittiiittttti+;;::::,:=Ytiiiiti=;:::::,:;;==ii+ittItii+==;;
;;+iiittIti+ii;;===;;:;::::;+IVXVVVVVVt;;;;;::::;;===;+IIiiti=;;;;
;=++++iIti+ii+=;;;=;:::;;+VXBMMBBBBBBXY=;=;;:::::;=iYVIIttii++;;;;
;;++iiiItttIi+++=;;:::;=iBMMMMMMMMMMMXI==;;,::;;:;;=+itIttIIti+;;;
;=+++++i+tYIIiii;:,::;itXMMMMMMMMMMMBXti==;:;++=;:::::;=+iittti+;;
;;+ii+ii+iitiIi;::::;iXBMMMMMWWWWWMMBXti+ii=;::::,,,,:::=;==+tI+;;
;;iiiitItttti;:::;::=+itYXXMWWWWWWMBYt+;;::,,,,,,,,,,,,,:==;==;;;;
:;=iIIIttIt+:;:::;;;==;+=+iiittttti+;;:,:,,,,::,,,,,,,,:::;=;==::;
;::=+ittiii=;:::::;;;:;:;=++==;;==;:,,,,,,:;::::,,,,,,,,::;==;;::;
:::;+iiiii=;::::,:;:::::;;:;;::;:::,,,,,,,:::;=;;;:,,,,,:::;;::::;
:;;iIIIIII=;:::,:::::::,::::,:::,,,,,,,,,,,:;;=;:,,,,,,::::;=;:::;
:;==++ii+;;;:::::::::::,,,,,,::,,,,,,,,,,,::::,,,,,,,,,,:,:::::::;
::;;=+=;;;:::;;::,,,,,,,,,,,,,,,,,,,,,,,,,:,,,,,,,,,,,,,,,,,:::::;
::;=;;;:;:::;;;;::,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,::,,::::;
:;;:;::::::,::,,:,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,:::;
:::::::::::;;;:,,,,,,,,,,,,,...,...,,,.,,,,,,,,,,,,.,,,,,,,,,,,,:;
::::::::;=;;;;;::,,,,,,,,,,,.......,...,,,,,,,,,,,,.,,,,,,,,,,,,,;
:::::,,:;=;;;;;;;iVXXXVt+:,,....,,,,....,.,,,,,,,.,.....,,,,,,,,:;
:,,::,,:::;;;;;;=IVVVXXXXVXVt:,,,,,..,..,,,,.,,,,,..,.,,,,,,,,,,,;
::,::,,,:,:::::,::;=iIYVXVVVVIYIi;,,.,.,,,::,,,,,,,,,,,,,,,,,,,,,.
:,,,,,,,,,,,,,,,,::;+itIIIIIIi:;;i++=;;;;;;;;;::,,,...,,..,,,,,,,.
:,,,,,,,,,,,,,,=iitVYi++iitt==it;;:;;;;::;;::::,,,......,,,,,,,::.
::,,,,,,,,,,,,,++iiIVIi=;;=;+i;:;+:::,,,,,,,,,,,,,.....,,,,,,,,::,
,,,,,,,,,,,,,,,;=+it=:::,,,,,,,,,,.,......,,.,..........,,,,,,,,::
:,,,,,,,,,,,,,,,,:=:,,,,,,,,,,,,,,......................,.,,.,.,,:
:,,,,,,,,,,,,,,,,,:,,,,,,,,,,..,........................,..,...,,:
,,,,,,,,,,,,,,,,,,,.....................................,.......,,
,,,,,,,,,.,,,,,,,...............................................,,
itittiiiii+=++=;;=iiiiiiittiiiiii+iii===;++iiitiiiiiii+=====+ii=+i
*/