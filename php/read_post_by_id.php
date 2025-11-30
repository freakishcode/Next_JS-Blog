<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');


// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../config/database.php';

try {
    if (!isset($_GET["id"]) || empty($_GET["id"])) {
        echo json_encode(["error" => "Post ID is required"]);
        exit;
    }

    $id = intval($_GET["id"]);

    $stmt = $pdo->prepare("SELECT id, title, content, image_url, created_at
                           FROM posts WHERE id = :id LIMIT 1");
    $stmt->execute(["id" => $id]);

    $post = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$post) {
        echo json_encode(["error" => "Post not found"]);
        exit;
    }

    echo json_encode($post);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
