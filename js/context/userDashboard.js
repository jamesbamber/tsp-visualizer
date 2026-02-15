import AuthContext from "./authContext.js"

export default class UserDashboard {
    constructor() {
        this.authContext = new AuthContext;
    
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
    }

    get_point_set_html(name, id, points) {
        const div = 
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

    remove_point_set() {

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

