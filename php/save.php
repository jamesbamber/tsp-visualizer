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
    $name = $data["name"];
    $points = $data["points"];
    $point_count = $data["point_count"];

    $points_json = json_encode($points);

    $query = $connection->prepare(
        "INSERT INTO point_sets (user_id, name, points, point_count) VALUES (?, ?, ?, ?)"
    );
    $query->bind_param("issi", $_SESSION["user_id"], $name, $points_json, $point_count);
    $query->execute();

    if($query->affected_rows > 0) {
        $set_id = $query->insert_id;

        $timestamp_query = $connection->prepare(
            "SELECT created_at FROM point_sets WHERE id = ?"
        );
        $timestamp_query->bind_param("i", $set_id);
        $timestamp_query->execute();

        $timestamp_result = $timestamp_query->get_result();
        $timestamp_row = $timestamp_result->fetch_assoc();

        echo json_encode([
            "status" => "success",
            "data" => [
                "id" => $set_id,
                "name" => $name,
                "points" => $points,
                "point_count" => $point_count,
                "created_at" => $timestamp_row["created_at"],
            ],
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Failed to save board",
        ]);
    }

    $connection->close();
}


?>
