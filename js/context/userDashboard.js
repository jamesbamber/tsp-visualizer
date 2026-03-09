import { globals } from "../globals.js"

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
        saveButton.addEventListener("click", () => this.addPointSet);
    }

    getPointSetHtml(name, id, points, pointCount, createdAt) {
        // TODO add sanitization

        const div = document.createElement("div");
        div.classList.add("point-set");
        div.innerHTML = `
            <label>${name}: ${pointCount} points</label>
            <label>Created: ${createdAt}</label>
            <div class="two-button-container"> 
                <button class="load-button"> Load </button> <button class="delete-button"> Delete </button>
            </div>
        `;

        const loadButton = div.querySelector(".load-button");
        loadButton.addEventListener(() => {
            globals.problem.newProblem(points);
        });

        const deleteButton = div.querySelector(".delete-button");
        deleteButton.addEventListener(() => this.removePointSet(id));
        
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

    addPointSet(points) {
        const name = "TODO: add point config name";
        globals.apiContext.addPointSet(name, points);

        // add point set to html
    }

    removePointSet(id) {

    }

    successfulLogin() {

        this.hideElement("login-modal");
        this.hideElement("signup-modal");

        this.displayUserPointSets();
    }

    displayUserPointSets() {
        console.log(this);
    }
}

