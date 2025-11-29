<?php
/**
 * Upload Handler Utility
 * Handles file uploads, validation, and directory creation
 */

/**
 * Ensure upload directory exists
 * @param string $uploadDir Path to upload directory
 * @return bool True if directory exists or was created
 * @throws Exception
 */
function ensureUploadDir($uploadDir) {
    if (!is_dir($uploadDir)) {
        if (!mkdir($uploadDir, 0755, true)) {
            throw new Exception('Failed to create uploads directory');
        }
        // Create .gitkeep to preserve directory in git
        file_put_contents($uploadDir . '/.gitkeep', '');
    }
    
    // Verify write permissions
    if (!is_writable($uploadDir)) {
        throw new Exception('Uploads directory is not writable');
    }
    
    return true;
}

/**
 * Validate uploaded image file
 * @param array $file $_FILES entry
 * @param int $maxSize Max file size in bytes (default 5MB)
 * @return bool True if valid
 * @throws Exception
 */
function validateImageFile($file, $maxSize = 5242880) {
    // Check for upload errors
    if ($file['error'] !== UPLOAD_ERR_OK) {
        $errors = [
            UPLOAD_ERR_INI_SIZE => 'File exceeds upload_max_filesize',
            UPLOAD_ERR_FORM_SIZE => 'File exceeds MAX_FILE_SIZE',
            UPLOAD_ERR_PARTIAL => 'File was only partially uploaded',
            UPLOAD_ERR_NO_FILE => 'No file was uploaded',
            UPLOAD_ERR_NO_TMP_DIR => 'Missing temporary folder',
            UPLOAD_ERR_CANT_WRITE => 'Failed to write file',
            UPLOAD_ERR_EXTENSION => 'Extension not allowed'
        ];
        throw new Exception($errors[$file['error']] ?? 'Unknown upload error');
    }

    // Check file size
    if ($file['size'] > $maxSize) {
        throw new Exception('File size must not exceed ' . round($maxSize / 1048576) . 'MB');
    }

    // Check if file is a valid image
    $allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);

    if (!in_array($mime, $allowedMimes)) {
        throw new Exception('Invalid image format. Allowed: JPEG, PNG, GIF, WebP');
    }

    return true;
}

/**
 * Save uploaded image to disk
 * @param array $file $_FILES entry
 * @param string $uploadDir Directory to save to
 * @return string Relative path to saved image
 * @throws Exception
 */
function saveUploadedImage($file, $uploadDir) {
    // Validate file
    validateImageFile($file);

    // Ensure directory exists
    ensureUploadDir($uploadDir);

    // Generate unique filename
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $filename = 'post_' . time() . '_' . uniqid() . '.' . $ext;
    $filepath = $uploadDir . $filename;

    // Move uploaded file
    if (!move_uploaded_file($file['tmp_name'], $filepath)) {
        throw new Exception('Failed to save image');
    }

    // Return relative path for storage in database
    return 'uploads/' . $filename;
}

/**
 * Delete image file
 * @param string $imagePath Relative path to image (e.g., 'uploads/image.jpg')
 * @param string $baseDir Base directory (default __DIR__ . '/..')
 * @return bool True if deleted or not found
 */
function deleteImage($imagePath, $baseDir = null) {
    if (!$imagePath) {
        return true;
    }

    if (!$baseDir) {
        $baseDir = __DIR__ . '/..';
    }

    $fullPath = $baseDir . '/' . $imagePath;

    if (file_exists($fullPath)) {
        return @unlink($fullPath);
    }

    return true;
}

/**
 * Get uploads directory path
 * @return string Full path to uploads directory
 */
function getUploadsDir() {
    return __DIR__ . '/../uploads/';
}
