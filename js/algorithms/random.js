import Point from "../point.js"

export default function* run(pts) {
    const progress = {
        points: pts,
        current_solution: []
    }

    const N = pts.length;
 
    const order = new Array(N);
    for(let i=0; i<N; i++) {
        order[i] = i;

        const j = Math.floor(Math.random() * (i+1));
        [order[i], order[j]] = [order[j], order[i]];
    }

    for(const idx of order) {
        progress.current_solution.push(pts[idx]);
        yield progress;
    }

    progress.current_solution.push(pts[order[0]]);
    yield progress;
}