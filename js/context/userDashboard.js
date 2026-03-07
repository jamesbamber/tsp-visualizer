import AuthContext from "./authContext.js"

export default class UserDashboard {
    constructor(problem) {
        this.authContext = new AuthContext;
        this.problem = problem;
    
        const login_button = document.getElementById("login");
        login_button.addEventListener("click", () => this.show_element("login-modal"));
    
        const login_cancel_button = document.getElementById("login-cancel");
        login_cancel_button.addEventListener("click", () => this.hide_element("login-modal"));
    
        const login_form = document.getElementById("login-form");
        login_form.addEventListener("submit", (e) => {
            this.authContext.handle_login(e).then(() => {
                if(this.authContext.loggedIn) this.successful_login();
            });
        });
    
        const signup_button = document.getElementById("signup");
        signup_button.addEventListener("click", () => this.show_element("signup-modal"));
    
        const signup_cancel_button = document.getElementById("signup-cancel");
        signup_cancel_button.addEventListener("click", () => this.hide_element("signup-modal"));
    
        const signup_form = document.getElementById("signup-form");
        signup_form.addEventListener("submit", (e) => {
            this.authContext.handle_signup(e).then(() => {
                if(this.authContext.loggedIn) this.successful_login();
            });
        });

        const save_button = document.getElementById("save-points");
        save_button.addEventListener("click", () => add_point_set);
    }

    get_point_set_html(name, id, points, point_count, created_at) {
        // TODO add sanitization

        const div = document.createElement("div");
        div.classList.add("point-set");
        div.innerHTML = `
            <label>${name}: ${point_count} points</label>
            <label>Created: ${created_at}</label>
            <div class="two-button-container"> 
                <button class="load-button"> Load </button> <button class="delete-button"> Delete </button>
            </div>
        `;

        const load_button = div.querySelector(".load-button");
        load_button.addEventListener(() => {
            this.problem.new_problem(points);
        });

        const delete_button = div.querySelector(".delete-button");
        delete_button.addEventListener(() => this.remove_point_set(id));
        
        return div;
    }
    
    show_element(id) {
        const div = document.getElementById(id);
        div.classList.remove("hidden");
    }
    
    hide_element(id) {
        const div = document.getElementById(id);
        div.classList.add("hidden");
    }

    add_point_set() {
        
    }

    remove_point_set(id) {

    }

    successful_login() {

        this.hide_element("login-modal");
        this.hide_element("signup-modal");

        this.display_user_point_sets();
    }

    display_user_point_sets() {
        console.log(this);
    }
}

