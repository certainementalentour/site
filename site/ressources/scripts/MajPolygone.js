function updatePolygons() {
	// Premier SVG
	const conteneurSVG1 = document.getElementById('conteneurSVG1');
	const svg1 = document.getElementById('SVG1');
	if (conteneurSVG1 && svg1) {
		const width1 = conteneurSVG1.clientWidth;
		const height1 = conteneurSVG1.clientHeight;
		if (width1 && height1) {
			const points1 = [
				{x: Math.round(width1 * 0.3), y: Math.round(height1 * 0.5)},
				{x: Math.round(width1 * 1), y: Math.round(height1 * 0.2)},
				{x: Math.round(width1 * 1), y: Math.round(height1 * 0.35)},
				{x: Math.round(width1 * 0.3), y: Math.round(height1 * 0.5)},
				{x: Math.round(width1 * 1), y: Math.round(height1 * 0.65)},
				{x: Math.round(width1 * 1), y: Math.round(height1 * 0.8)}
			];
			const Coordonnees1 = points1.map(point => `${point.x},${point.y}`).join(' ');
			const polygon1 = svg1.querySelector('polygon');
			if (polygon1) {
				svg1.setAttribute('width', String(width1));
				svg1.setAttribute('height', String(height1));
				svg1.setAttribute('viewBox', `0 0 ${width1} ${height1}`);
				polygon1.setAttribute('points', Coordonnees1);
			}
		}
	}

	// Deuxième SVG
	const conteneurSVG2 = document.getElementById('conteneurSVG2');
	const svg2 = document.getElementById('SVG2');
	if (conteneurSVG2 && svg2) {
		const width2 = conteneurSVG2.clientWidth;
		const height2 = conteneurSVG2.clientHeight;
		if (width2 && height2) {
			svg2.setAttribute('width', String(width2));
			svg2.setAttribute('height', String(height2));
			svg2.setAttribute('viewBox', `0 0 ${width2} ${height2}`);

			// Mise à jour de la courbe
			const path = svg2.querySelector('#Courbe');
			if (path) {
				const newD = `M ${width2 * 0},${height2 * 0.25} 
							  C ${width2 * 0.5},${height2 * 0.25} ${width2 * 0.8},${height2 * 0.35} ${width2 * 0.8},${height2 * 0.5} 
							  ${width2 * 0.8},${height2 * 0.65} ${width2 * 0.5},${height2 * 0.75} 0,${height2 * 0.75}`;
				path.setAttribute('d', newD);
				path.setAttribute('stroke-width', (width2 * 0.2));
			}

			// Mise à jour du polygone (Droite)
			const droite = svg2.querySelector('#Droite');
			if (droite) {
				const droitePoints = [
					{x: Math.round(width2 * 0.7), y: Math.round(height2 * 0.5)},
					{x: Math.round(width2 * 0.9), y: Math.round(height2 * 0.5)},
					{x: Math.round(width2 * 0.85), y: Math.round(height2 * 0.85)},
					{x: Math.round(width2 * 0.65), y: Math.round(height2 * 0.85)}
				];
				droite.setAttribute('points', droitePoints.map(p => `${p.x},${p.y}`).join(' '));
			}

			// Mise à jour du polygone (Flèche)
			const fleche = svg2.querySelector('#Fleche');
			if (fleche) {
				const flechePoints = [
					{x: Math.round(width2 * 0.55), y: Math.round(height2 * 0.8)},
					{x: Math.round(width2 * 0.95), y: Math.round(height2 * 0.845)},
					{x: Math.round(width2 * 0.7), y: Math.round(height2 * 1)}
				];
				fleche.setAttribute('points', flechePoints.map(p => `${p.x},${p.y}`).join(' '));
			}
		}
	}
}

// Exécuter la mise à jour au chargement et au redimensionnement
window.addEventListener("load", updatePolygons);
window.addEventListener("resize", updatePolygons);