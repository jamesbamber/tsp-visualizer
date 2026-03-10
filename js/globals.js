import TSP from "./tsp.js";
import UserDashboard from "./context/userDashboard.js"
import ApiContext from "./context/apiContext.js"
import AuthContext from "./context/authContext.js"

export const globals = {
    problem: null,
    userDashboard: null,
    authContext: null,
    apiContext: null,
}

export function init_globals(canvas, updatePathLength) {
    globals.problem = new TSP(canvas, updatePathLength);
    globals.userDashboard = new UserDashboard;
    globals.authContext = new AuthContext;
    globals.apiContext = new ApiContext;

    if(globals.authContext.loggedIn) {
        globals.userDashboard.displayUserPointSets();
    }
}
