<?php
/**
 * Database Configuration File
 * Uses PDO for secure database connections
 * Supports MySQL/MariaDB
 */

// Load environment variables from .env file if it exists
$envFile = __DIR__ . '/../.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos($line, '=') !== false && strpos($line, '#') !== 0) {
            list($key, $value) = explode('=', $line, 2);
            $_ENV[trim($key)] = trim($value);
        }
    }
}

// Database configuration
define('DB_HOST', $_ENV['DB_HOST'] ?? 'localhost');
define('DB_PORT', $_ENV['DB_PORT'] ?? '3306');
define('DB_NAME', $_ENV['DB_NAME'] ?? 'blog_db');
define('DB_USER', $_ENV['DB_USER'] ?? 'blog_user');
define('DB_PASS', $_ENV['DB_PASS'] ?? 'secure_password_here');
define('DB_CHARSET', 'utf8mb4');

// PDO Options
$pdoOptions = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES " . DB_CHARSET
];

/**
 * Create and return PDO connection
 * @return PDO
 * @throws PDOException
 */
function getDatabaseConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        
        $pdo = new PDO(
            $dsn,
            DB_USER,
            DB_PASS,
            $GLOBALS['pdoOptions']
        );
        
        return $pdo;
    } catch (PDOException $e) {
        error_log("Database connection failed: " . $e->getMessage());
        throw new Exception("Database connection failed");
    }
}

// Global PDO instance (lazy loading)
$pdo = null;

/**
 * Get or create PDO instance
 * @return PDO
 */
function getPDO() {
    global $pdo;
    if ($pdo === null) {
        $pdo = getDatabaseConnection();
    }
    return $pdo;
}

// Test connection on include
try {
    $testConnection = getPDO();
} catch (Exception $e) {
    error_log("Failed to initialize database: " . $e->getMessage());
}
