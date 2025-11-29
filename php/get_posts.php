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
    // Load database configuration
    require_once __DIR__ . '/../config/database.php';
    $pdo = getPDO();

    // Get pagination params
    $page = isset($_GET['page']) ? max(1, (int)$_GET['page']) : 1;
    $pageSize = isset($_GET['pageSize']) ? max(1, (int)$_GET['pageSize']) : 10;
    $offset = ($page - 1) * $pageSize;

    // Get total count
    $countStmt = $pdo->query('SELECT COUNT(*) as total FROM posts');
    $countResult = $countStmt->fetch();
    $total = $countResult['total'];

    // Fetch paginated posts
    $stmt = $pdo->prepare('
        SELECT id, title, content, image_url, author, created_at
        FROM posts
        ORDER BY created_at DESC
        LIMIT :offset, :limit
    ');
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->bindValue(':limit', $pageSize, PDO::PARAM_INT);
    $stmt->execute();
    $posts = $stmt->fetchAll();

    // Response format matching TypeScript expectations
    $response = [
        'success' => true,
        'data' => $posts,
        'nextPage' => ($offset + $pageSize < $total) ? $page + 1 : null,
        'total' => $total,
        'page' => $page,
        'pageSize' => $pageSize
    ];

    http_response_code(200);
    echo json_encode($response);

} catch (PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to fetch posts'
    ]);
} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

