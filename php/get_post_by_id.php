<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    require_once __DIR__ . '/../config/database.php';
    $pdo = getPDO();

    $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
    if (!$id) {
        throw new Exception('Post id is required');
    }

    $stmt = $pdo->prepare('SELECT id, title, content, image_url, author, created_at FROM posts WHERE id = :id');
    $stmt->execute([':id' => $id]);
    $post = $stmt->fetch();

    if (!$post) {
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'message' => 'Post not found'
        ]);
        exit;
    }

    echo json_encode([
        'success' => true,
        'data' => $post
    ]);

} catch (PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database error occurred'
    ]);
} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
