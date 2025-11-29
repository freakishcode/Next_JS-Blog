<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    // Validate request method
    if ($_SERVER['REQUEST_METHOD'] !== 'DELETE' && $_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method');
    }

    // Load database and upload handler configuration
    require_once __DIR__ . '/../config/database.php';
    require_once __DIR__ . '/../config/upload-handler.php';
    $pdo = getPDO();

    // Get post ID from request
    $input = json_decode(file_get_contents('php://input'), true);
    $id = isset($input['id']) ? (int)$input['id'] : null;

    if (!$id) {
        throw new Exception('Post ID is required');
    }

    // Get the post to find image path
    $stmt = $pdo->prepare('SELECT image_url FROM posts WHERE id = :id');
    $stmt->execute([':id' => $id]);
    $post = $stmt->fetch();

    if (!$post) {
        throw new Exception('Post not found');
    }

    // Delete image if exists using upload handler utility
    if ($post['image_url']) {
        try {
            deleteImage($post['image_url'], __DIR__ . '/..');
        } catch (Exception $e) {
            error_log("Warning: Could not delete image: " . $e->getMessage());
            // Continue with deletion even if image deletion fails
        }
    }

    // Delete from database
    $deleteStmt = $pdo->prepare('DELETE FROM posts WHERE id = :id');
    $deleteStmt->execute([':id' => $id]);

    $response = [
        'success' => true,
        'message' => 'Post deleted successfully',
        'data' => [
            'id' => $id
        ]
    ];

    http_response_code(200);
    echo json_encode($response);

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
