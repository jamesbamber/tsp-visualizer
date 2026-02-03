export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function draw_point(pt, ctx) {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2, true);
    ctx.fill();
}

function draw_line(pt1, pt2, ctx) {
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(pt1.x, pt1.y);
    ctx.lineTo(pt2.x, pt2.y);
    ctx.stroke();
}

export function draw_path_from_array(pts, ctx) {
    pts.forEach(pt => {
        draw_point(pt, ctx);
    })

    for(let i=1; i<pts.length; i++) {
        draw_line(pts[i-1], pts[i], ctx);
    }
}

