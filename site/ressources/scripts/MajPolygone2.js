function updatePolygon() {
    const conteneurSVG = document.getElementById('conteneurSVG2');
    const svg = document.getElementById('SVG2');
    if (!conteneurSVG || !svg) return;

    const width = conteneurSVG.clientWidth;
    const height = conteneurSVG.clientHeight;
    if (!width || !height) return;

    const departCourbe = [{x: Math.round(width * 0), y:Math.round(height * 0,25)}];
    const pointsCourbe = [
        { x: Math.round(width * 0.5), y: Math.round(height * 0.25) },
        { x: Math.round(width * 0.9), y: Math.round(height * 0.285) },
        { x: Math.round(width * 0.9), y: Math.round(height * 0.5) },
        { x: Math.round(width * 0.9), y: Math.round(height * 0.65) },
        { x: Math.round(width * 0.5), y: Math.round(height * 0.75) },
        { x: Math.round(width * 0), y: Math.round(height * 0.75) }
    ];
    const coordonneesChemin = points.map(point => `${point.x},${point.y}`).join(' ');

    const polygon = svg.querySelector('polygon');
    if (!polygon) return;

    svg.setAttribute('height', String(height));
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', String(width));
    polygon.setAttribute('points', Coordonnees);
}

window.onload = updatePolygon;
window.onresize = updatePolygon;