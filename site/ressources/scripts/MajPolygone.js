function updatePolygon() {
		const conteuneurSVG = document.getElementById('conteuneurSVG');
		const svg = document.getElementById('SVG');
		const width = conteuneurSVG.clientWidth;
		const height = conteuneurSVG.clientHeight;

		const points = [
			{ x: Math.round(width * 0.4), y: Math.round(height * 0.5) },
			{ x: Math.round(width * 1), y: Math.round(height * 0.25) },
			{ x: Math.round(width * 1), y: Math.round(height * 0.7) },
			{ x: Math.round(width * 0.4), y: Math.round(height * 0.5) },
			{ x: Math.round(width * 1), y: Math.round(height * 0.65) },
			{ x: Math.round(width * 1), y: Math.round(height * 0.75) }
		];

		const Coordonnees = points.map(point => `${point.x},${point.y}`).join(' ');

        // Mettre à jour la viewbox
        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

        // Mettre à jour les coordonnées du polygone    
        const polygon = svg.querySelector('polygon');
        polygon.setAttribute('points', coordinates);
	}

	// Mettre à jour le polygone lors du chargement de la page
	window.onload = updatePolygon;

	// Recalculer le polygone lors du redimensionnement de la fenêtre
	window.onresize = updatePolygon;