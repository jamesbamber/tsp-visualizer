import TSP from "./tsp.js";
import Point from "./point.js"

document.addEventListener("DOMContentLoaded", init);
let problem;

function init() {
    const generate_points = document.getElementById("generate-points");
    generate_points.addEventListener("click", generate_random_points);

    const points_slider = document.getElementById("number-of-points");
    points_slider.addEventListener("input", update_number_of_points);
    update_number_of_points();

    const run_algorithm = document.getElementById("run-algorithm");
    run_algorithm.addEventListener("click", run_selected_algorithm);
}

function run_selected_algorithm() {
    if(!problem) {
        alert("Ran empty problem");
        return;
    }

    const chosen_algorithm = document.getElementById("chosen-algorithm");
    switch (chosen_algorithm.value) {
        case "nearest_neighbor" :
            problem.run_nearest_neighbor();
            break;
        default :
            throw new Error("Selected algorithm not implemented");
    }
}

function update_number_of_points() {
    const points_slider = document.getElementById("number-of-points");
    const points_label = document.getElementById("number-of-points-label");

    points_label.textContent = points_slider.value;
}

function generate_random_points() {
    const points_slider = document.getElementById("number-of-points");
    const POINTS = points_slider.value;
    const canvas = document.getElementById("canvas");

    // TODO: this logic should probably be in the TSP class
    const pts = Array.from({ length: POINTS}, () => {
        const x = Math.floor(Math.random() * canvas.width);
        const y = Math.floor(Math.random() * canvas.height);
        return new Point(x, y);
    });

    problem = new TSP(pts, canvas);
}