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

    static pathLength(pts) {
        let length = 0;

        for(let i = 0; i < pts.length - 1; i++) {
            length += Point.dist(pts[i], pts[i+1]);
        }

        return length;
    }

    static cycleLength(pts) {
        let length = 0;

        for(let i = 0; i < pts.length; i++) {
            length += Point.dist(pts[i], pts[(i+1)%(pts.length)]);
        }

        return length;
    }


    static fromJSON(obj) {
        return new Point(obj.x, obj.y);
    }

    static convertToText(pts) {
        let text = ''
        pts.forEach(pt => {
            text += String(pt.x) + " " + String(pt.y) + "\n";
        });
        return text;
    }

    static fromText(text) {
        const pts = text
            .split("\n")
            .map(line => line.trim())
            .filter(line => line)
            .map(line => {
                const coords = line.split(/\s+/);

                if(coords.length != 2) {
                    throw new Error("All lines must contain two elements");
                }

                const [x, y] = coords.map(parseFloat);

                if(isNaN(x) || isNaN(y) || x < 0 || x > LOGICAL_SPACE.width || y < 0 || x > LOGICAL_SPACE.height) {
                    throw new Error("Unable to parse points values");
                }

                return new Point(x, y);
            });
        return pts;
    }

    copy() {
        return new Point(this.x, this.y);
    }
}