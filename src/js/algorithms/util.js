import NearestNeighbor from "./nearest_neighbor.js"
import FarthestNeighbor from "./farthest_neighbor.js"
import Random from "./random.js"

const chosen_algorithm = {
    functions : {
        nearest_neighbor: NearestNeighbor,
        farthest_neighbor: FarthestNeighbor,
        random: Random
    },
    labels: {
        nearest_neighbor: "Nearest Neighbor",
        farthest_neighbor: "Farthest Neighbor",
        random: "Random"
    }
}

export default chosen_algorithm;