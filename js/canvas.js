function drawPoint(pt, ctx) {
    ctx.fillStyle = "rgb(217, 217, 217)";

    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2, true);
    ctx.fill();
}

function drawLine(pt1, pt2, ctx) {
    ctx.strokeStyle = "rgb(217, 217, 217)";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(pt1.x, pt1.y);
    ctx.lineTo(pt2.x, pt2.y);
    ctx.stroke();
}

export function clearCanvas(canvas) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function drawPathFromArray(pts, canvas) {
    const ctx = canvas.getContext("2d");

    for(let i=1; i<pts.length; i++) {
        drawLine(pts[i-1].toCanvasCoords(canvas), pts[i].toCanvasCoords(canvas), ctx);
    }
}

export function drawPointsFromArray(pts, canvas) {
    const ctx = canvas.getContext("2d");

    pts.forEach(pt => {
        drawPoint(pt.toCanvasCoords(canvas), ctx);
    })
}
