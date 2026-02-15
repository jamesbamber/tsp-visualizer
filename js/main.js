import TSP from "./tsp.js";
import Point from "./point.js"
import UserDashboard from "./context/userDashboard.js"

import Algorithms from "./algorithms/util.js"

document.addEventListener("DOMContentLoaded", init);
let problem;

function init() {
    const canvas = document.getElementById("canvas");
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    problem = new TSP(canvas, update_path_length);
    const userDashboard = new UserDashboard();
    
    add_algorithm_to_select();
    
    const points_slider = document.getElementById("number-of-points");
    points_slider.addEventListener("input", update_number_of_points);
    update_number_of_points();
    
    const generate_points = document.getElementById("generate-points");
    generate_points.addEventListener("click", generate_random_points);
    
    const load_points = document.getElementById('load-points');
    load_points.addEventListener('click', load_points_from_list);
    
    const save_points = document.getElementById('save-points');
    save_points.addEventListener('click', save_points_from_list);
    
    const delay_slider = document.getElementById("delay-time");
    delay_slider.addEventListener("input", update_delay_time);
    update_delay_time();
    
    const run_algorithm = document.getElementById("run-algorithm");
    run_algorithm.addEventListener("click", run_selected_algorithm);
    
    const stop_algorithm = document.getElementById("stop-algorithm");
    stop_algorithm.style.display = "none";
    stop_algorithm.addEventListener("click", stop_execution);
    
}

function resizeCanvas() {
    const canvas = document.getElementById("canvas");
    const container = document.getElementById("canvas-container");
    const padding = parseFloat(window.getComputedStyle(container).padding);

    canvas.width = container.clientWidth - 2*padding;
    canvas.height = container.clientHeight - 2*padding;
}

function add_algorithm_to_select() {
    const algo_select = document.getElementById("chosen-algorithm");

    for(const [algorithm, label] of Object.entries(Algorithms.labels)) {
        const option = document.createElement("option");
        option.value = algorithm;
        option.textContent = label;

        algo_select.appendChild(option);
    }
}

function disable_buttons() {
    const run_button = document.getElementById("run-algorithm");
    const stop_button = document.getElementById("stop-algorithm");
    
    run_button.style.display = "none";
    stop_button.style.display = "block";
    
    const generate_button = document.getElementById("generate-points");
    const algo_select = document.getElementById("chosen-algorithm");
    const load_button = document.getElementById('load-points');
    const save_button = document.getElementById('save-points');
    
    generate_button.disabled = true;
    algo_select.disabled = true;
    load_button.disabled = true;
    save_button.disabled = true;
}

function enable_buttons() {
    const run_button = document.getElementById("run-algorithm");
    const stop_button = document.getElementById("stop-algorithm");
    
    run_button.style.display = "block";
    stop_button.style.display = "none";
    
    const generate_button = document.getElementById("generate-points");
    const algo_select = document.getElementById("chosen-algorithm");
    const load_button = document.getElementById('load-points');
    const save_button = document.getElementById('save-points');

    generate_button.disabled = false;
    algo_select.disabled = false;
    load_button.disabled = false;
    save_button.disabled = false;
}

function stop_execution() {
    problem.stop();
}

function update_path_length(current_path_length, best_path_length) {
    const current_path = document.getElementById("current-path");
    const best_path = document.getElementById("best-path");

    current_path.textContent = current_path_length?.toFixed(3);
    best_path.textContent = best_path_length?.toFixed(3);
}

async function run_selected_algorithm() {
    if(!problem.pts) {
        alert("Ran empty problem");
        return;
    }

    disable_buttons();

    try {
        const chosen_algorithm = Algorithms.functions[document.getElementById("chosen-algorithm").value];
        await problem.run_algorithm(chosen_algorithm);
    } finally {
        enable_buttons();
    }
}


function update_number_of_points() {
    const points_slider = document.getElementById("number-of-points");
    const points_label = document.getElementById("number-of-points-label");

    points_label.textContent = points_slider.value;
}

function update_delay_time() {
    const delay_slider = document.getElementById("delay-time");
    const delay_label = document.getElementById("delay-time-label");

    problem.set_delay(delay_slider.value);
    delay_label.textContent = delay_slider.value;
}

function generate_random_points() {
    const points_slider = document.getElementById("number-of-points");
    const pts = problem.generate_random_points(points_slider.value);

    problem.new_problem(pts);
    update_points_list(pts)
}

function update_points_list(pts) {
    const points_list = document.getElementById("points-list");
    points_list.value = Point.convert_to_text(pts);
}

function load_points_from_list() {
    const points_list = document.getElementById("points-list");

    try {
        const pts = Point.from_text(points_list.value);
        problem.new_problem(pts);
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}

function save_points_from_list() {
    const points_list = document.getElementById("points-list");

    alert("ERROR: this button is unimplemented");
}
