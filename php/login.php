<?php
require_once "dbaccess.php";
session_start();

$connection = mysqli_connect(DBHOST, DBUSER, DBPASS, DBNAME);

if($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

if($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    // check if user exists
    $query = $connection->prepare("SELECT user_id, email, username, password FROM users WHERE username = ?");
    $query->bind_param("s", $username);
    $query->execute();
    $result = $query->get_result();

    if($result->num_rows == 0) {
        echo json_encode([
            "status" => "error",
            "message" => "User not found."
        ]);

        $query->close();
        $connection->close();   
        exit();
    }

    $user = $result->fetch_assoc();
    if(!password_verify($password, $user["password"])) {
        echo json_encode([
            "status" => "error",
            "message" => "Password is incorrect."
        ]);

        $query->close();
        $connection->close();   
        exit();
    }

    $point_sets_query = $connection->prepare(
        "SELECT id, name, points, point_count, created_at FROM point_sets WHERE user_id = ?"
    );
    $point_sets_query->bind_param("i", $user["user_id"]);
    $point_sets_query->execute();
    $point_sets_result = $point_sets_query->get_result();

    $point_sets = [];
    while($point_set = $point_sets_result->fetch_assoc()) {
        $point_sets[] = [
            "id" => $point_set["id"],
            "name" => $point_set["name"],
            "points" => $point_set["points"],
            "point_count" => $point_set["point_count"],
            "created_at" => $point_set["created_at"],
        ];
    }

    $token = bin2hex(random_bytes(32));
    $_SESSION["user_id"] = $user["user_id"];
    $_SESSION["token"] = $token;

    setcookie("session_token", $token, time() + 3600, "/", "", false, true);

    echo json_encode([
        "status" => "success",
        "message" => "Login successful.",
        "user" => [
            "user_id" => $user["user_id"],
            "username" => $user["username"],
            "email" => $user["email"],
            "point_sets" => $point_sets,
        ],
        "token" => $token,
    ]);

    $query->close();
}

$connection->close();

?>