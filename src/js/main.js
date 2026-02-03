import { Point, draw_path_from_array } from "./canvas.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
    const generate_points = document.getElementById("generate-points");
    generate_points.addEventListener("click", generate_random_points);

    const points_slider = document.getElementById("number-of-points");
    points_slider.addEventListener("input", update_number_of_points);

}

function update_number_of_points(e) {
    const points_label = document.getElementById("number-of-points-label");
    points_label.textContent = e.target.value;
}

function generate_random_points() {
    const points_slider = document.getElementById("number-of-points");
    const POINTS = points_slider.value;
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.height, canvas.width);

    const pts = Array.from({ length: POINTS}, () => {
        const x = Math.floor(Math.random() * canvas.height);
        const y = Math.floor(Math.random() * canvas.width);
        return new Point(x, y);
    });

    draw_path_from_array(pts, ctx);

}