import TSP from "./tsp.js";
import Point from "./point.js"
import Algorithms from "./algorithms/util.js"
import { globals, init_globals } from "./globals.js"

document.addEventListener("DOMContentLoaded", init);

function init() {
    const canvas = document.getElementById("canvas");
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    init_globals(canvas, updatePathLength);

    addAlgorithmToSelect();
    
    const pointsSlider = document.getElementById("number-of-points");
    pointsSlider.addEventListener("input", updateNumberOfPoints);
    updateNumberOfPoints();
    
    const generatePoints = document.getElementById("generate-points");
    generatePoints.addEventListener("click", generateRandomPoints);
    
    const loadPoints = document.getElementById('load-points');
    loadPoints.addEventListener('click', loadPointsFromList);
    
    const delaySlider = document.getElementById("delay-time");
    delaySlider.addEventListener("input", updateDelayTime);
    updateDelayTime();
    
    const runAlgorithm = document.getElementById("run-algorithm");
    runAlgorithm.addEventListener("click", runSelectedAlgorithm);
    
    const stopAlgorithm = document.getElementById("stop-algorithm");
    stopAlgorithm.style.display = "none";
    stopAlgorithm.addEventListener("click", stopExecution);
    
}

function resizeCanvas() {
    const canvas = document.getElementById("canvas");
    const container = document.getElementById("canvas-container");
    const padding = parseFloat(window.getComputedStyle(container).padding);

    canvas.width = container.clientWidth - 2*padding;
    canvas.height = container.clientHeight - 2*padding;
}

function addAlgorithmToSelect() {
    const algoSelect = document.getElementById("chosen-algorithm");

    for(const [algorithm, label] of Object.entries(Algorithms.labels)) {
        const option = document.createElement("option");
        option.value = algorithm;
        option.textContent = label;

        algoSelect.appendChild(option);
    }
}

function disableButtons() {
    for(const button of document.querySelectorAll("button")) {
        if(button.id == "run-algorithm") 
            button.style.display = "none";
        else if(button.id == "stop-algorithm") 
            button.style.display = "block";
        else 
            button.disabled = true;    
    }
}

function enableButtons() {
    for(const button of document.querySelectorAll("button")) {
        if(button.id == "run-algorithm") 
            button.style.display = "block";
        else if(button.id == "stop-algorithm") 
            button.style.display = "none";
        else 
            button.disabled = false;    
    }
}

function stopExecution() {
    globals.problem.stop();
}

function updatePathLength(currentPathLength, bestPathLength) {
    const currentPath = document.getElementById("current-path");
    const bestPath = document.getElementById("best-path");

    currentPath.textContent = currentPathLength?.toFixed(3);
    bestPath.textContent = bestPathLength?.toFixed(3);
}

async function runSelectedAlgorithm() {
    if(!globals.problem.pts) {
        alert("Ran empty problem");
        return;
    }

    disableButtons();

    try {
        const chosenAlgorithm = Algorithms.functions[document.getElementById("chosen-algorithm").value];
        await globals.problem.runAlgorithm(chosenAlgorithm);
    } finally {
        enableButtons();
    }
}

function updateNumberOfPoints() {
    const pointsSlider = document.getElementById("number-of-points");
    const pointsLabel = document.getElementById("number-of-points-label");

    pointsLabel.textContent = pointsSlider.value;
}

function updateDelayTime() {
    const delaySlider = document.getElementById("delay-time");
    const delayLabel = document.getElementById("delay-time-label");

    globals.problem.setDelay(delaySlider.value);
    delayLabel.textContent = delaySlider.value;
}

function generateRandomPoints() {
    const pointsSlider = document.getElementById("number-of-points");
    const pts = globals.problem.generateRandomPoints(pointsSlider.value);

    globals.problem.newProblem(pts);
    updatePointsList(pts)
}

function updatePointsList(pts) {
    const pointsList = document.getElementById("points-list");
    pointsList.value = Point.convertToText(pts);
}

function loadPointsFromList() {
    const pointsList = document.getElementById("points-list");

    try {
        const pts = Point.fromText(pointsList.value);
        globals.problem.newProblem(pts);
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}
