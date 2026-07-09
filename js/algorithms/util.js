import NearestNeighbor from "./nearestNeighbor.js"
import NearestNeighborTwoOpt from "./nearestNeighborTwoOpt.js"
import FarthestNeighbor from "./farthestNeighbor.js"
import Random from "./random.js"
import SimulatedAnnealing from "./simulatedAnnealing.js"

const chosenAlgorithm = {
    functions : {
        nearestNeighbor: NearestNeighbor,
        nearestNeighborTwoOpt: NearestNeighborTwoOpt,
        farthestNeighbor: FarthestNeighbor,
        random: Random,
        simulatedAnnealing: SimulatedAnnealing,
    },
    labels: {
        nearestNeighbor: "Nearest Neighbor",
        nearestNeighborTwoOpt: "Nearest Neighbor with Two Opt exchange",
        farthestNeighbor: "Farthest Neighbor",
        random: "Random",
        simulatedAnnealing: "Simulated Annealing",
    }
}

export default chosenAlgorithm;
