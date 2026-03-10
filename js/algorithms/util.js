import NearestNeighbor from "./nearestNeighbor.js"
import NearestNeighborTwoOpt from "./nearestNeighborTwoOpt.js"
import FarthestNeighbor from "./farthestNeighbor.js"
import Random from "./random.js"

const chosenAlgorithm = {
    functions : {
        nearestNeighbor: NearestNeighbor,
        nearestNeighborTwoOpt: NearestNeighborTwoOpt,
        farthestNeighbor: FarthestNeighbor,
        random: Random
    },
    labels: {
        nearestNeighbor: "Nearest Neighbor",
        nearestNeighborTwoOpt: "Nearest Neighbor with Two Opt exchange",
        farthestNeighbor: "Farthest Neighbor",
        random: "Random"
    }
}

export default chosenAlgorithm;