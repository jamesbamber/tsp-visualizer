import Point from "../point.js"

class State {
    constructor(points) {
        this.points = points;
    }

    updateCurrentSolution(progress) {
        if(progress.currentSolution.length === 0 || Point.cycleLength(progress.currentSolution) > this.energy()) {
            const cycle = this.points.map(p => p.copy()).concat(this.points[0].copy());
            progress.currentSolution = cycle;
            return true;
        }
        return false;
    }

    generateNextState() {
        const nextS = new State(this.points.map(p => p.copy()));

        // generate random swap
        const N = this.points.length;

        let l = Math.floor(Math.random() * N);
        let r = Math.floor(Math.random() * N);

        if(l > r) [l, r] = [r, l];

        for(let i=l, j=r; i<j; i++, j--) {
            [nextS.points[i], nextS.points[j]] = [nextS.points[j], nextS.points[i]];
        }

        return nextS;
    }

    energy() {
        return Point.cycleLength(this.points);
    }
}

export default function* run(pts) {
    const progress = {
        points: pts,
        currentSolution: [],
    }

    let currentState = new State(pts);
    currentState.updateCurrentSolution(progress);
    yield progress;

    let T = 1000000 // initial temperature
    let u = 0.9999 // decay reate

    while(T > 1) {
        const nextState = currentState.generateNextState();

        // console.log(nextState.energy(), currentState.energy());
        
        const p = Math.exp( - (nextState.energy() - currentState.energy()) / T);

        if(Math.random() <= p) {
            // accept incoming state
            currentState = nextState;
            if(currentState.updateCurrentSolution(progress))
                yield progress;
        }

        T *= u;
    }

    yield progress;
}