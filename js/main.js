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
    
    problem = new TSP(canvas, updatePathLength);
    const userDashboard = new UserDashboard(problem);
    
    addAlgorithmToSelect();
    
    const pointsSlider = document.getElementById("number-of-points");
    pointsSlider.addEventListener("input", updateNumberOfPoints);
    updateNumberOfPoints();
    
    const generatePoints = document.getElementById("generate-points");
    generatePoints.addEventListener("click", generateRandomPoints);
    
    const loadPoints = document.getElementById('load-points');
    loadPoints.addEventListener('click', loadPointsFromList);
    
    const savePoints = document.getElementById('save-points');
    savePoints.addEventListener('click', savePointsFromList);
    
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
    const runButton = document.getElementById("run-algorithm");
    const stopButton = document.getElementById("stop-algorithm");
    
    runButton.style.display = "none";
    stopButton.style.display = "block";
    
    const generateButton = document.getElementById("generate-points");
    const algoSelect = document.getElementById("chosen-algorithm");
    const loadButton = document.getElementById('load-points');
    const saveButton = document.getElementById('save-points');
    
    generateButton.disabled = true;
    algoSelect.disabled = true;
    loadButton.disabled = true;
    saveButton.disabled = true;
}

function enableButtons() {
    const runButton = document.getElementById("run-algorithm");
    const stopButton = document.getElementById("stop-algorithm");
    
    runButton.style.display = "block";
    stopButton.style.display = "none";
    
    const generateButton = document.getElementById("generate-points");
    const algoSelect = document.getElementById("chosen-algorithm");
    const loadButton = document.getElementById('load-points');
    const saveButton = document.getElementById('save-points');

    generateButton.disabled = false;
    algoSelect.disabled = false;
    loadButton.disabled = false;
    saveButton.disabled = false;
}

function stopExecution() {
    problem.stop();
}

function updatePathLength(currentPathLength, bestPathLength) {
    const currentPath = document.getElementById("current-path");
    const bestPath = document.getElementById("best-path");

    currentPath.textContent = currentPathLength?.toFixed(3);
    bestPath.textContent = bestPathLength?.toFixed(3);
}

async function runSelectedAlgorithm() {
    if(!problem.pts) {
        alert("Ran empty problem");
        return;
    }

    disableButtons();

    try {
        const chosenAlgorithm = Algorithms.functions[document.getElementById("chosen-algorithm").value];
        await problem.runAlgorithm(chosenAlgorithm);
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

    problem.setDelay(delaySlider.value);
    delayLabel.textContent = delaySlider.value;
}

function generateRandomPoints() {
    const pointsSlider = document.getElementById("number-of-points");
    const pts = problem.generateRandomPoints(pointsSlider.value);

    problem.newProblem(pts);
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
        problem.newProblem(pts);
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}

function savePointsFromList() {
    const pointsList = document.getElementById("points-list");

    alert("ERROR: this button is unimplemented");
}
