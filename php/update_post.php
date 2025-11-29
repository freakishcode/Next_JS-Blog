<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method');
    }

    require_once __DIR__ . '/../config/database.php';
    require_once __DIR__ . '/../config/upload-handler.php';
    $pdo = getPDO();

    // Form fields
    $id      = isset($_POST['id']) ? (int)$_POST['id'] : null;
    $title   = trim($_POST['title'] ?? '');
    $content = trim($_POST['content'] ?? '');
    $image   = $_FILES['image'] ?? null;

    // Basic validation
    if (!$id) throw new Exception('Post ID is required');
    if (strlen($title) < 3) throw new Exception('Title must be at least 3 characters');
    if (strlen($content) < 10) throw new Exception('Content must be at least 10 characters');

    // Check post existence
    $check = $pdo->prepare("SELECT image_url FROM posts WHERE id = :id LIMIT 1");
    $check->execute([':id' => $id]);
    $existingPost = $check->fetch(PDO::FETCH_ASSOC);

    if (!$existingPost) {
        throw new Exception('Post not found');
    }

    $imageUrl = $existingPost['image_url'];

    // Handle image update
    if ($image && $image['error'] === UPLOAD_ERR_OK) {

        // delete old image if exists
        if ($imageUrl) {
            deleteImage($imageUrl, __DIR__ . '/..');
        }

        // save new
        $stored = saveUploadedImage($image, getUploadsDir());

        // Ensure leading slash for Next.js
        if ($stored && !str_starts_with($stored, "/")) {
            $stored = "/" . $stored;
        }

        $imageUrl = $stored;
    }

    // Update DB record
    $stmt = $pdo->prepare("
        UPDATE posts 
        SET title = :title, 
            content = :content, 
            image_url = :image_url, 
            updated_at = NOW()
        WHERE id = :id
    ");

    $stmt->execute([
        ':title'     => $title,
        ':content'   => $content,
        ':image_url' => $imageUrl,
        ':id'        => $id
    ]);

    // Response
    echo json_encode([
        'success' => true,
        'message' => 'Post updated successfully',
        'data' => [
            'id'         => $id,
            'title'      => $title,
            'content'    => $content,
            'image_url'  => $imageUrl,
            'updated_at' => date('Y-m-d H:i:s')
        ]
    ]);

} catch (Exception $e) {
    error_log("Update error: " . $e->getMessage());

    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
