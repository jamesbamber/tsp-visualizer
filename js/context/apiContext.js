export default class ApiContext {
    static async signup(username, email, password) {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);

        try {
            const response = await fetch("../php/signup.php", {
                method: "POST",
                body: formData,
            });
            const responseData = await response.json();
            if(responseData.status === "success") {
                return {
                    user: responseData.user,
                    token: responseData.token,
                    loggedIn: true,
                };
            } else {
                alert(responseData.message);
                return {
                    user: null,
                    token: null,
                    loggedIn: false,
                };
            }
        } catch(error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
            return {
                user: null,
                token: null,
                loggedIn: false,
            };
        }
    }

    static async login(username, password) {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        try {
            const response = await fetch("../php/login.php", {
                method: "POST",
                body: formData,
            });
            const responseData = await response.json();
            if(responseData.status === "success") {
                return {
                    user: responseData.user,
                    token: responseData.token,
                    loggedIn: true,
                };
            } else {
                alert(responseData.message);
                return {
                    user: null,
                    token: null,
                    loggedIn: false,
                };
            }
        } catch(error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
            return {
                user: null,
                token: null,
                loggedIn: false,
            };
        }
    }

    static async add_point_set() {

    }

    static async delete_point_set() {

    }
}