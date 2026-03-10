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

    let testedSwaps = 0;
    let goodSwaps = 0;

    // two opt exchange
    function test_swap(l, r) {
        const path = progress.currentSolution;
        const currentLength = Point.cycleLength(path);
        
        for(let i=l, j=r; i<j; i++, j--) {
            [path[i], path[j]] = [path[j], path[i]];
        }

        testedSwaps++;

        if(Point.cycleLength(path) < currentLength) {
            goodSwaps++;
            return true;
        }

        for(let i=l, j=r; i<j; i++, j--) {
            [path[i], path[j]] = [path[j], path[i]];
        }
        return false;
    }

    stop = false;
    while(!stop) {
        stop = true;

        for(let i=0; i<N; i++) {
            for(let j=i+1; j<N; j++) {
                if(test_swap(i, j)) {
                    yield progress;
                    stop = false;
                }
            }
        }
    }

    progress.currentSolution.push(progress.currentSolution[0]);
    yield progress;
}