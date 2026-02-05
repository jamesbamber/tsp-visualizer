import { clear_canvas, draw_points_from_array, draw_path_from_array } from "./canvas.js"
import Point from "./point.js"

export default class TSP {
    constructor(canvas) {
        this.canvas = canvas;

        this.paused = false;
        this.cancelled = false;
        this.delay = 50;
    }

    stop() {
        this.cancelled = true;
    }

    set_delay(delay) {
        this.delay = delay;
    }

    new_problem(number_of_points) {
        this.paused = false;
        this.cancelled = false;

        this.pts = Array.from({ length: number_of_points}, () => {
            const x = Math.floor(Math.random() * canvas.width);
            const y = Math.floor(Math.random() * canvas.height);
            return new Point(x, y);
        });

        this.display_points(this.pts);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async run_algorithm(algorithm) {
        let final_state = null;

        for await (const step of algorithm(this.pts)) {
            if(this.cancelled) break;

            final_state = step;
            this.render_step(step);
            await this.sleep(this.delay);
        }

        await this.end_of_run(final_state);
    }

    end_of_run(final_state) {
        alert("distance = " + Point.path_length(final_state.current_solution)/1000 + "km");

        this.paused = false;
        this.cancelled = false;
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