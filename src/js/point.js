export default class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static dist(pt1, pt2) {
        return (pt1.x - pt2.x) ** 2 + (pt1.y - pt2.y) ** 2;
    }

    static path_length(pts) {
        let length = 0;

        for(let i = 0; i < pts.length - 1; i++) {
            length += Point.dist(pts[i], pts[i+1]);
        }

        return length;
    }
}