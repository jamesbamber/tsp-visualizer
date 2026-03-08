import NearestNeighbor from "./nearestNeighbor.js"
import FarthestNeighbor from "./farthestNeighbor.js"
import Random from "./random.js"

const chosenAlgorithm = {
    functions : {
        nearestNeighbor: NearestNeighbor,
        farthestNeighbor: FarthestNeighbor,
        random: Random
    },
    labels: {
        nearestNeighbor: "Nearest Neighbor",
        farthestNeighbor: "Farthest Neighbor",
        random: "Random"
    }
}

export default chosenAlgorithm;