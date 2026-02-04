import { clear_canvas, draw_points_from_array, draw_path_from_array } from "./canvas.js"
import Point from "./point.js"

import NearestNeighbor from "./algorithms/nearest_neighbor.js"

export default class TSP {
    constructor(pts, canvas) {
        this.pts = pts;
        this.canvas = canvas;
        this.display_points(this.pts);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async run_nearest_neighbor() {
        for await (const step of NearestNeighbor(this.pts)) {
            this.render_step(step);
            await this.sleep(200);
        }
    }

    render_step(step) {
        clear_canvas(this.canvas);
        draw_points_from_array(step.points, this.canvas);
        draw_path_from_array(step.current_solution, this.canvas);
    }

    display_points(pts) {
        clear_canvas(this.canvas);
        draw_points_from_array(pts, this.canvas);
    }
}