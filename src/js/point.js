import { LOGICAL_SPACE } from "./config.js";

export default class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toCanvasCoords(canvas) {
        return new Point(
            this.x * canvas.width / LOGICAL_SPACE.width,
            this.y * canvas.height / LOGICAL_SPACE.height
        )
    }

    static dist(pt1, pt2) {
        return ((pt1.x - pt2.x) ** 2 + (pt1.y - pt2.y) ** 2) ** 0.5;
    }

    static path_length(pts) {
        let length = 0;

        for(let i = 0; i < pts.length - 1; i++) {
            length += Point.dist(pts[i], pts[i+1]);
        }

        return length;
    }
}