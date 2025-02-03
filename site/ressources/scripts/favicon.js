var images1 = [
	'/ressources/favicon/animation/cafe2/frame_00.png',
	'/ressources/favicon/animation/cafe2/frame_01.png',
	'/ressources/favicon/animation/cafe2/frame_02.png',
	'/ressources/favicon/animation/cafe2/frame_03.png',
	'/ressources/favicon/animation/cafe2/frame_04.png',
	'/ressources/favicon/animation/cafe2/frame_05.png',
	'/ressources/favicon/animation/cafe2/frame_06.png',
	'/ressources/favicon/animation/cafe2/frame_07.png',
	'/ressources/favicon/animation/cafe2/frame_08.png',
	'/ressources/favicon/animation/cafe2/frame_09.png',
	'/ressources/favicon/animation/cafe2/frame_10.png',
	'/ressources/favicon/animation/cafe2/frame_11.png',
	'/ressources/favicon/animation/cafe2/frame_12.png',
	'/ressources/favicon/animation/cafe2/frame_13.png',
	'/ressources/favicon/animation/cafe2/frame_14.png',
	'/ressources/favicon/animation/cafe2/frame_15.png',
	'/ressources/favicon/animation/cafe2/frame_16.png',
	'/ressources/favicon/animation/cafe2/frame_17.png',
	'/ressources/favicon/animation/cafe2/frame_18.png',
	'/ressources/favicon/animation/cafe2/frame_19.png',
	'/ressources/favicon/animation/cafe2/frame_20.png',
	'/ressources/favicon/animation/cafe2/frame_21.png',
	'/ressources/favicon/animation/cafe2/frame_22.png',
	'/ressources/favicon/animation/cafe2/frame_23.png',
	'/ressources/favicon/animation/cafe2/frame_24.png',
	'/ressources/favicon/animation/cafe2/frame_25.png',
	'/ressources/favicon/animation/cafe2/frame_26.png',
	'/ressources/favicon/animation/cafe2/frame_27.png',
	'/ressources/favicon/animation/cafe2/frame_28.png',
	'/ressources/favicon/animation/cafe2/frame_29.png',
	'/ressources/favicon/animation/cafe2/frame_30.png',
	'/ressources/favicon/animation/cafe2/frame_31.png',
	'/ressources/favicon/animation/cafe2/frame_32.png',
	'/ressources/favicon/animation/cafe2/frame_33.png',
	'/ressources/favicon/animation/cafe2/frame_34.png',
	'/ressources/favicon/animation/cafe2/frame_35.png',
	'/ressources/favicon/animation/cafe2/frame_36.png',
	'/ressources/favicon/animation/cafe2/frame_37.png',
	'/ressources/favicon/animation/cafe2/frame_38.png',
	'/ressources/favicon/animation/cafe2/frame_39.png',
	'/ressources/favicon/animation/cafe2/frame_40.png',
	'/ressources/favicon/animation/cafe2/frame_41.png',
	'/ressources/favicon/animation/cafe2/frame_42.png',
	'/ressources/favicon/animation/cafe2/frame_43.png',
	'/ressources/favicon/animation/cafe2/frame_44.png',
	'/ressources/favicon/animation/cafe2/frame_45.png',
	'/ressources/favicon/animation/cafe2/frame_46.png',
	'/ressources/favicon/animation/cafe2/frame_47.png',
	'/ressources/favicon/animation/cafe2/frame_48.png',
	'/ressources/favicon/animation/cafe2/frame_49.png',
	'/ressources/favicon/animation/cafe2/frame_50.png',
	'/ressources/favicon/animation/cafe2/frame_51.png',
	'/ressources/favicon/animation/cafe2/frame_52.png',
	'/ressources/favicon/animation/cafe2/frame_53.png',
	'/ressources/favicon/animation/cafe2/frame_54.png',
	'/ressources/favicon/animation/cafe2/frame_55.png',
	'/ressources/favicon/animation/cafe2/frame_56.png',
	'/ressources/favicon/animation/cafe2/frame_57.png',
	'/ressources/favicon/animation/cafe2/frame_58.png',
	'/ressources/favicon/animation/cafe2/frame_59.png',
];
var images2 = [
	'/ressources/favicon/animation/cafe1/frame_00.png',
	'/ressources/favicon/animation/cafe1/frame_01.png',
	'/ressources/favicon/animation/cafe1/frame_02.png',
	'/ressources/favicon/animation/cafe1/frame_03.png',
	'/ressources/favicon/animation/cafe1/frame_04.png',
	'/ressources/favicon/animation/cafe1/frame_05.png',
	'/ressources/favicon/animation/cafe1/frame_06.png',
	'/ressources/favicon/animation/cafe1/frame_07.png',
	'/ressources/favicon/animation/cafe1/frame_08.png',
	'/ressources/favicon/animation/cafe1/frame_09.png',
	'/ressources/favicon/animation/cafe1/frame_10.png',
	'/ressources/favicon/animation/cafe1/frame_11.png',
	'/ressources/favicon/animation/cafe1/frame_12.png',
	'/ressources/favicon/animation/cafe1/frame_13.png',
	'/ressources/favicon/animation/cafe1/frame_14.png',
];
var imagesActives = images1  //set d'icônes utilisées
var image_active = 0; // Image courante


/*
// s'assurer qu'un favicon existe
let link = document.querySelector("link[rel='icon']") || document.querySelector("link[rel='shortcut icon']");
if (!link) {
	// Si aucun favicon n'existe, on crée un lien initialement
	link = document.createElement('link');
	link.rel = 'icon';
	document.head.appendChild(link);
}
// Fonction de mise à jour du favicon
function majFavicon() {
	link.href = imagesActives[image_active];
	image_active = (image_active + 1) % imagesActives.length;
}
// Démarrer l'animation
var interval = setInterval(majFavicon, 200);
// Au cas où il serait nécessaire de changer d'animation
function changerAnimation() {
	imagesActives = (imagesActives === images1) ? images2 : images1;
	image_active = 0; // Prendre l'animation au début
}  setInterval(changerAnimation, 10000);
*/

function majFavicon() {
	let newLink = document.createElement("link");
	newLink.rel = "icon";
	newLink.type = "image/png";
	newLink.sizes = "400x299";
	newLink.href = imagesActives[image_active] + "?t=" + new Date().getTime();
	// Remplace l'ancien favicon
	document.head.querySelectorAll("link[rel='icon']").forEach(e => e.remove());
	document.head.appendChild(newLink);
	image_active = (image_active + 1) % imagesActives.length;

} setInterval(majFavicon, 500);
