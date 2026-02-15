import Point from "../point.js"

export default function* run(pts) {
    const progress = {
        points: pts,
        current_solution: []
    }

    const N = pts.length;
    const visited = new Array(N).fill(0);

    let current_node = pts[0];
    visited[0] = 1;
    progress.current_solution.push(current_node);

    while(visited.some(x => x === 0)) {
        let next_node = null;
        for(let i=0; i<N; i++) {
            if(visited[i] === 1) continue;
            if(next_node === null || Point.dist(current_node, pts[i]) < Point.dist(current_node, pts[next_node]))
                next_node = i;
        }

        current_node = pts[next_node];
        visited[next_node] = 1;
        progress.current_solution.push(pts[next_node]);
        yield progress;

    }

    progress.current_solution.push(pts[0]);
    yield progress;
}