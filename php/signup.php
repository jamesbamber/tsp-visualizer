<?php
require_once "dbaccess.php";
session_start();

$connection = mysqli_connect(DBHOST, DBUSER, DBPASS, DBNAME);

if($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

if($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // check if email is unique
    $query = $connection->prepare("SELECT user_id FROM users WHERE email = ?");
    $query->bind_param("s", $email);
    $query->execute();
    $result = $query->get_result();
    if($result->num_rows > 0) {
        echo json_encode([
            "status" => "error",
            "message" => "There is already an account with this email."
        ]);

        $query->close();
        $connection->close();   
        exit();
    }

    // check if username is unique
    $query = $connection->prepare("SELECT user_id FROM users WHERE username = ?");
    $query->bind_param("s", $username);
    $query->execute();
    $result = $query->get_result();
    if($result->num_rows > 0) {
        echo json_encode([
            "status" => "error",
            "message" => "There is already an account with this username."
        ]);

        $query->close();
        $connection->close();   
        exit();
    }

    $query = $connection->prepare("INSERT INTO users (username, email, password) values (?, ?, ?)");
    $query->bind_param("sss", $username, $email, $hashed_password);
    
    if($query->execute()) {
        $user_id = $connection->insert_id;
        $point_sets = [];

        $token = bin2hex(random_bytes(32));
        $_SESSION["user_id"] = $user_id;
        $_SESSION["token"] = $token;

        setcookie("session_token", $token, time() + 3600, "/", "", false, true);

        echo json_encode([
            "status" => "success",
            "message" => "User registered successfully.",
            "user" => [
                "user_id" => $user_id,
                "username" => $username,
                "email" => $email,
                "point_sets" => $point_sets,
            ],
            "token" => $token,
        ]);
        
    } else {
        echo json_encode([
            "status" => "error",
            "message" => $query->error
        ]);
    }

    $query->close();
}

$connection->close();

?>
