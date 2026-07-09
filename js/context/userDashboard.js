import { globals } from "../globals.js"
import Point from "../point.js"

export default class UserDashboard {
    constructor() {    
        const loginButton = document.getElementById("login");
        loginButton.addEventListener("click", () => this.showElement("login-modal"));
    
        const loginCancelButton = document.getElementById("login-cancel");
        loginCancelButton.addEventListener("click", () => this.hideElement("login-modal"));
    
        const loginForm = document.getElementById("login-form");
        loginForm.addEventListener("submit", (e) => {
            globals.authContext.handleLogin(e).then(() => {
                if(globals.authContext.loggedIn) this.successfulLogin();
            });
        });
    
        const signupButton = document.getElementById("signup");
        signupButton.addEventListener("click", () => this.showElement("signup-modal"));
    
        const signupCancelButton = document.getElementById("signup-cancel");
        signupCancelButton.addEventListener("click", () => this.hideElement("signup-modal"));
    
        const signupForm = document.getElementById("signup-form");
        signupForm.addEventListener("submit", (e) => {
            globals.authContext.handleSignup(e).then(() => {
                if(globals.authContext.loggedIn) this.successfulLogin();
            });
        });

        const saveButton = document.getElementById("save-points");
        saveButton.addEventListener("click", () => this.showElement("save-modal"));
    
        const saveCancelButton = document.getElementById("save-cancel");
        saveCancelButton.addEventListener("click", () => this.hideElement("save-modal"));
    
        const saveForm = document.getElementById("save-form");
        saveForm.addEventListener("submit", (e) => {
            this.addPointSet(e).then(() => this.hideElement("save-modal"));
        });
    }

    getPointSetHtml(point_set) {

        const escapeHTML = (str) =>
            String(str)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");

        // escaping html to prevent XSS
        const safeName = escapeHTML(point_set["name"]);
        const safeCount = escapeHTML(point_set["point_count"]);
        const safeTimestamp = escapeHTML(point_set["created_at"]);

        const div = document.createElement("div");
        div.classList.add("point-set");
        div.innerHTML = `
            <label>${safeName}: ${safeCount} points</label>
            <label>Created: ${safeTimestamp}</label>
            <div class="two-button-container"> 
                <button class="load-button"> Load </button> <button class="delete-button"> Delete </button>
            </div>
        `;

        const loadButton = div.querySelector(".load-button");
        loadButton.addEventListener("click", () => {
            // console.log(point_set["points"]);
            globals.problem.newProblem(point_set["points"].map(p => Point.fromJSON(p)));
        });

        const deleteButton = div.querySelector(".delete-button");
        deleteButton.addEventListener("click", () => this.removePointSet(point_set["id"]));
        
        return div;
    }
    
    showElement(id) {
        const div = document.getElementById(id);
        div.classList.remove("hidden");
    }
    
    hideElement(id) {
        const div = document.getElementById(id);
        div.classList.add("hidden");
    }

    async addPointSet(e) {
        e.preventDefault();

        try {
            if(!globals.authContext.loggedIn) throw Error("You must log in to save a board");

            const name = e.target.name.value;
            const pointsList = document.getElementById("points-list");
            const points = Point.fromText(pointsList.value);

            const { data: pointSet } = await globals.apiContext.addPointSet(name, points);
    
            globals.authContext.user.point_sets.push(pointSet);
            this.displayUserPointSets();
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    async removePointSet(id) {
        try {
            await globals.apiContext.deletePointSet(id);
            const pointSets = globals.authContext.user.point_sets;
            
            const index = pointSets.findIndex(p => p["id"] == id);
            if(index !== -1) {
                pointSets.splice(index, 1);
            }
        } catch(error) {
            console.log(error);
            alert("an error occured");
        }

        this.displayUserPointSets();
    }

    successfulLogin() {

        this.hideElement("login-modal");
        this.hideElement("signup-modal");

        this.hideElement("login");
        this.hideElement("signup");

        const loginInfo = document.getElementById("login-info");
        const label = document.createElement("label");
        label.innerHTML = "Welcome " + globals.authContext.user.username; 

        loginInfo.appendChild(label)

        this.displayUserPointSets();
    }

    displayUserPointSets() {
        const pointSets = globals.authContext.user.point_sets;
        const pointSetList = document.getElementById("user-point-sets");

        pointSetList.innerHTML = "";

        for(const pointSet of pointSets) {
            const div = this.getPointSetHtml(pointSet);
            pointSetList.appendChild(div);
        }
    }
}
