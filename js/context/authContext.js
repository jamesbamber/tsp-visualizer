import ApiContext from "./apiContext.js"

export default class AuthContext {
    constructor() {
        this.user = null;
        this.token = null;
        this.loggedIn = false;
    }

    async handleSignup(e) {
        e.preventDefault();

        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        const { user, token, loggedIn } = await ApiContext.signup(
            username,
            email,
            password,
        );

        this.user = user;
        this.token = token;
        this.loggedIn = loggedIn;
    }

    async handleLogin(e) {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;

        const { user, token, loggedIn } = await ApiContext.login(
            username,
            password,
        );

        this.user = user;
        this.token = token;
        this.loggedIn = loggedIn;
    }
}