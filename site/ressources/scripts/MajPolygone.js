function updatePolygon() {
	// Premier svg (gauche)
		const conteuneurSVG1 = document.getElementById('conteuneurSVG');
		const svg1 = document.getElementById('SVG');
		const width1 = conteuneurSVG.clientWidth;
		const height1 = conteuneurSVG.clientHeight;

		const points = [
			{ x: Math.round(width1 * 0.3), y: Math.round(height1 * 0.5) },
			{ x: Math.round(width1 * 1), y: Math.round(height1 * 0.2) },
			{ x: Math.round(width1 * 1), y: Math.round(height1 * 0.35) },
			{ x: Math.round(width1 * 0.3), y: Math.round(height1 * 0.5) },
			{ x: Math.round(width1 * 1), y: Math.round(height1 * 0.65) },
			{ x: Math.round(width1 * 1), y: Math.round(height1 * 0.8) }
		];

		const Coordonnees1 = points.map(point => `${point.x},${point.y}`).join(' ');

        // Mettre à jour la taille du svg
        svg1.setAttribute('height', height1);
        svg1.setAttribute('viewBox', `0 0 ${width1} ${height1}`);
        svg1.setAttribute('width', width1);

        // Mettre à jour les coordonnées du polygone    
        const polygon = svg1.querySelector('polygon');
        polygon.setAttribute('points', Coordonnees1);

	// Deuxième svg (droite)
	    const conteneurSVG2 = document.getElementById('conteuneurSVG2');
        const svg2 = document.getElementById('SVG2');
        const width2 = conteneurSVG2.clientWidth;
        const height2 = conteneurSVG2.clientHeight;
	}

	// Mettre à jour le polygone lors du chargement de la page
	window.onload = updatePolygon;

	// Recalculer le polygone lors du redimensionnement de la fenêtre
	window.onresize = updatePolygon;