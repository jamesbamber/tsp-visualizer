import NearestNeighbor from "./nearest_neighbor.js"
import FarthestNeighbor from "./farthest_neighbor.js"

const chosen_algorithm = {
    functions : {
        nearest_neighbor: NearestNeighbor,
        farthest_neighbor: FarthestNeighbor
    },
    labels: {
        nearest_neighbor: "Nearest Neighbor",
        farthest_neighbor: "Farthest Neighbor"
    }
}

export default chosen_algorithm;