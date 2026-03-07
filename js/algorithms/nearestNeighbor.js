import Point from "../point.js"

export default function* run(pts) {
    const progress = {
        points: pts,
        currentSolution: []
    }

    const N = pts.length;
    const visited = new Array(N).fill(0);

    let currentNode = pts[0];
    visited[0] = 1;
    progress.currentSolution.push(currentNode);

    while(visited.some(x => x === 0)) {
        let nextNode = null;
        for(let i=0; i<N; i++) {
            if(visited[i] === 1) continue;
            if(nextNode === null || Point.dist(currentNode, pts[i]) < Point.dist(currentNode, pts[nextNode]))
                nextNode = i;
        }

        currentNode = pts[nextNode];
        visited[nextNode] = 1;
        progress.currentSolution.push(pts[nextNode]);
        yield progress;

    }

    progress.currentSolution.push(pts[0]);
    yield progress;
}