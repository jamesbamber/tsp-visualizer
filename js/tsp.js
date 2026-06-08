import { clearCanvas, drawPointsFromArray, drawPathFromArray } from "./canvas.js"
import Point from "./point.js"
import { LOGICAL_SPACE } from "./config.js";

export default class TSP {
    constructor(canvas, updateUi) {
        this.canvas = canvas;
        this.updateUi = updateUi;

        this.paused = false;
        this.cancelled = false;
        this.delay = 50;
    }

    stop() {
        this.cancelled = true;
    }

    setDelay(delay) {
        this.delay = delay;
    }

    generateRandomPoints(numberOfPoints) {
        return Array.from({ length: numberOfPoints}, () => {
            const x = Math.floor(Math.random() * LOGICAL_SPACE.width);
            const y = Math.floor(Math.random() * LOGICAL_SPACE.height);
            return new Point(x, y);
        });
    }

    newProblem(pts) {
        this.paused = false;
        this.cancelled = false;

        this.currentPath = undefined;
        this.bestPath = undefined;
        this.updateUi();

        this.pts = pts;

        this.displayPoints(this.pts);
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async runAlgorithm(algorithm) {
        let finalState = null;

        for await (const step of algorithm(this.pts)) {
            if(this.cancelled) break;

            this.currentPath = Point.pathLength(step.currentSolution);
            finalState = step;

            await this.renderStep(step);
            await this.sleep(this.delay);
        }

        await this.endOfRun(finalState);
    }

    endOfRun(finalState) {
        if(!this.cancelled) {
            if(this.bestPath == undefined || this.currentPath < this.bestPath) this.bestPath = this.currentPath;
        }

        this.renderStep(finalState);

        this.paused = false;
        this.cancelled = false;
    }

    renderStep(step) {
        clearCanvas(this.canvas);
        drawPointsFromArray(step.points, this.canvas);
        drawPathFromArray(step.currentSolution, this.canvas);

        this.updateUi(this.currentPath, this.bestPath);
    }

    displayPoints(pts) {
        clearCanvas(this.canvas);
        drawPointsFromArray(pts, this.canvas);
    }
}