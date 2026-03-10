import { globals } from "../globals.js"

export default class ApiContext {
    async signup(username, email, password) {
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

    async login(username, password) {
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

    async addPointSet(pointsName, points) {
        try {
            const response = await fetch("../php/save.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    points: points,
                    point_count: points.length,
                    name: pointsName,
                })
            });

            const responseData = await response.json();
            
            if(responseData.status === "success") {
                alert("Point set saved successfully!");
            } else {
                throw Error(responseData.message);
            }

            return responseData;

        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        }
    }

    async deletePointSet(id) {
        try {
            const response = await fetch("../php/delete.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    point_set_id: id,
                })
            });

            const responseData = await response.json();
            
            if(responseData.status === "success") {
                alert("Point set deleted successfully!");
            } else {
                throw Error(responseData.message);
            }

        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        }
    }
}