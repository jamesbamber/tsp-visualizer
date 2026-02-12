import { clear_canvas, draw_points_from_array, draw_path_from_array } from "./canvas.js"
import Point from "./point.js"
import { LOGICAL_SPACE } from "./config.js";

export default class TSP {
    constructor(canvas, update_ui) {
        this.canvas = canvas;
        this.update_ui = update_ui;

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

    generate_random_points(number_of_points) {
        return Array.from({ length: number_of_points}, () => {
            const x = Math.floor(Math.random() * LOGICAL_SPACE.width);
            const y = Math.floor(Math.random() * LOGICAL_SPACE.height);
            return new Point(x, y);
        });
    }

    new_problem(pts) {
        this.paused = false;
        this.cancelled = false;

        this.current_path = undefined;
        this.best_path = undefined;
        this.update_ui();

        this.pts = pts

        this.display_points(this.pts);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async run_algorithm(algorithm) {
        let final_state = null;

        for await (const step of algorithm(this.pts)) {
            if(this.cancelled) break;

            this.current_path = Point.path_length(step.current_solution);
            final_state = step;

            await this.render_step(step);
            await this.sleep(this.delay);
        }

        await this.end_of_run(final_state);
    }

    end_of_run(final_state) {
        if(this.best_path == undefined || this.current_path < this.best_path) this.best_path = this.current_path;

        this.render_step(final_state);

        this.paused = false;
        this.cancelled = false;
    }

    render_step(step) {
        clear_canvas(this.canvas);
        draw_points_from_array(step.points, this.canvas);
        draw_path_from_array(step.current_solution, this.canvas);

        this.update_ui(this.current_path, this.best_path);
    }

    display_points(pts) {
        clear_canvas(this.canvas);
        draw_points_from_array(pts, this.canvas);
    }
}