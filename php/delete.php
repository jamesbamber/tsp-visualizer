<?php
require_once "dbaccess.php";
session_start();

$connection = mysqli_connect(DBHOST, DBUSER, DBPASS, DBNAME);

if($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

if($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if(!isset($_SESSION["user_id"]) || !isset($_SESSION["token"])) {
        echo json_encode([
            "status" => "error",
            "message" => "You must log in to save a board",
        ]);
        $connection->close();  
        exit();
    }
        
    if($_SESSION["token"] !== $_COOKIE["session_token"]) {
        echo json_encode([
            "status" => "error",
            "message" => "You must log in to save a board",
        ]);
        $connection->close();  
        exit();
    }
    
    $user_id = $_SESSION["user_id"];
    $point_set_id = $data["point_set_id"];

    $query = $connection->prepare(
        "DELETE FROM point_sets WHERE user_id = ? AND id = ?"
    );
    $query->bind_param("ii", $user_id, $point_set_id);
    $query->execute();

    if($query->affected_rows > 0) {
        echo json_encode([
            "status" => "success",
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Failed to delete board",
        ]);
    }

    $connection->close();
}


?>
