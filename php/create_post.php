<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    // Validate request method
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method');
    }

    // Load database and upload handler configuration
    require_once __DIR__ . '/../config/database.php';
    require_once __DIR__ . '/../config/upload-handler.php';
    $pdo = getPDO();

    // Get form data
    $title = isset($_POST['title']) ? trim($_POST['title']) : '';
    $content = isset($_POST['content']) ? trim($_POST['content']) : '';
    $image = isset($_FILES['image']) ? $_FILES['image'] : null;

    // Validation
    if (empty($title) || strlen($title) < 3) {
        throw new Exception('Title is required and must be at least 3 characters');
    }
    if (empty($content) || strlen($content) < 10) {
        throw new Exception('Content is required and must be at least 10 characters');
    }

    $imageUrl = null;

    // Handle image upload
    if ($image && $image['error'] === UPLOAD_ERR_OK) {
        try {
            $imageUrl = saveUploadedImage($image, getUploadsDir());
        } catch (Exception $e) {
            throw new Exception('Image upload failed: ' . $e->getMessage());
        }
    }

    // Insert into database
    $stmt = $pdo->prepare('
        INSERT INTO posts (title, content, image_url, author, created_at)
        VALUES (:title, :content, :image_url, :author, NOW())
    ');
    
    $stmt->execute([
        ':title' => $title,
        ':content' => $content,
        ':image_url' => $imageUrl,
        ':author' => 'Admin'
    ]);

    $postId = $pdo->lastInsertId();
    $now = date('Y-m-d H:i:s');

    $response = [
        'success' => true,
        'message' => 'Post created successfully',
        'data' => [
            'id' => (int)$postId,
            'title' => $title,
            'content' => $content,
            'image_url' => $imageUrl,
            'created_at' => $now
        ]
    ];

    http_response_code(201);
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
