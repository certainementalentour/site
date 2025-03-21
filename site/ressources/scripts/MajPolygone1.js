function updatePolygon() {
    const conteneurSVG = document.getElementById('conteneurSVG1');
    const svg = document.getElementById('SVG1');
    if (!conteneurSVG || !svg) return;

    const width = conteneurSVG.clientWidth;
    const height = conteneurSVG.clientHeight;
    if (!width || !height) return;

    const points = [
        { x: Math.round(width * 0.3), y: Math.round(height * 0.5) },
        { x: Math.round(width * 1), y: Math.round(height * 0.2) },
        { x: Math.round(width * 1), y: Math.round(height * 0.35) },
        { x: Math.round(width * 0.3), y: Math.round(height * 0.5) },
        { x: Math.round(width * 1), y: Math.round(height * 0.65) },
        { x: Math.round(width * 1), y: Math.round(height * 0.8) }
    ];
    const Coordonnees = points.map(point => `${point.x},${point.y}`).join(' ');

    const polygon = svg.querySelector('polygon');
    if (!polygon) return;

    svg.setAttribute('height', String(height));
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', String(width));
    polygon.setAttribute('points', Coordonnees);
}

window.onload = updatePolygon;
window.onresize = updatePolygon;