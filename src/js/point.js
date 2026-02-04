export default class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    dist(pt) {
        return (this.x - pt.x) ** 2 + (this.y - pt.y) ** 2;
    }
}