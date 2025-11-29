# Blog Application - Database Setup Guide

## Overview

This guide walks you through setting up the MySQL database and configuring PDO connections for the blog application.

## Prerequisites

- MySQL 5.7+ or MariaDB 10.2+
- PHP 7.4+ with PDO extension
- Access to MySQL command line or phpMyAdmin

## Step 1: Create the Database

### Option A: Using MySQL Command Line

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE blog_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Create a dedicated user (recommended)
CREATE USER 'blog_user'@'localhost' IDENTIFIED BY 'secure_password_here';
GRANT ALL PRIVILEGES ON blog_db.* TO 'blog_user'@'localhost';
FLUSH PRIVILEGES;

# Exit MySQL
EXIT;
```

### Option B: Using phpMyAdmin

1. Login to phpMyAdmin
2. Click "New" to create a new database
3. Database name: `blog_db`
4. Collation: `utf8mb4_unicode_ci`
5. Click "Create"

## Step 2: Create Database Tables

### Option A: Using MySQL Command Line

```bash
mysql -u blog_user -p blog_db < /path/to/blog/config/schema.sql
```

### Option B: Using phpMyAdmin

1. Select the `blog_db` database
2. Go to "SQL" tab
3. Copy and paste the contents of `config/schema.sql`
4. Click "Go"

### Option C: Manual Creation

Log in to MySQL and run:

```sql
CREATE TABLE IF NOT EXISTS `posts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Post ID',
  `title` VARCHAR(255) NOT NULL COMMENT 'Post title',
  `content` LONGTEXT NOT NULL COMMENT 'Post content',
  `image_url` VARCHAR(500) NULLABLE COMMENT 'Relative path to post image',
  `author` VARCHAR(100) DEFAULT 'Admin' COMMENT 'Post author name',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  INDEX idx_created_at (created_at),
  INDEX idx_author (author),
  INDEX idx_title (title),
  INDEX idx_search (title, content)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Blog posts table';
```

## Step 3: Configure Environment Variables

1. **Copy the example file:**

   ```bash
   cp blog/.env.example blog/.env
   ```

2. **Edit `.env` file:**

   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=blog_db
   DB_USER=blog_user
   DB_PASS=secure_password_here

   # Application Settings
   APP_ENV=development
   APP_DEBUG=true
   ```

3. **Ensure `.env` is in `.gitignore`** (already done)

## Step 4: Verify Configuration

Test the database connection:

```bash
php -r "
require_once 'config/database.php';
try {
    \$pdo = getPDO();
    echo 'Connection successful!';
} catch (Exception \$e) {
    echo 'Connection failed: ' . \$e->getMessage();
}
"
```

## Step 5: Create Uploads Directory

```bash
mkdir -p blog/uploads
chmod 755 blog/uploads
```

## Database Schema Overview

### posts table

| Column     | Type         | Notes                      |
| ---------- | ------------ | -------------------------- |
| id         | INT          | Auto-increment primary key |
| title      | VARCHAR(255) | Not nullable, min 3 chars  |
| content    | LONGTEXT     | Not nullable, min 10 chars |
| image_url  | VARCHAR(500) | Optional image path        |
| author     | VARCHAR(100) | Defaults to 'Admin'        |
| created_at | TIMESTAMP    | Auto-set on creation       |
| updated_at | TIMESTAMP    | Auto-updated on edit       |

## How PDO Configuration Works

The `config/database.php` file provides:

1. **Environment Variable Loading:**

   - Reads from `.env` file
   - Falls back to defaults if not found

2. **PDO Connection:**

   - UTF-8 support (utf8mb4)
   - Exception error mode
   - Prepared statement support

3. **Helper Functions:**
   - `getDatabaseConnection()`: Creates new connection
   - `getPDO()`: Gets global singleton instance

## Using PDO in PHP Files

All PHP files automatically use the configuration:

```php
require_once __DIR__ . '/../config/database.php';
$pdo = getPDO();

// Use prepared statements
$stmt = $pdo->prepare('SELECT * FROM posts WHERE id = :id');
$stmt->execute([':id' => 123]);
$result = $stmt->fetch();
```

## Troubleshooting

### Connection Failed

- Verify MySQL is running
- Check DB_HOST, DB_USER, DB_PASS in `.env`
- Ensure user has privileges on the database

### Table Not Found

- Run the schema.sql file
- Check table name matches (lowercase: `posts`)

### Permission Denied

- Verify directory permissions: `chmod 755 blog/uploads`
- Check file permissions on `.env`

### Charset Issues

- Ensure MySQL charset is utf8mb4
- Connection string already specifies charset

## Security Best Practices

1. ✅ **Never commit `.env`** - It's in `.gitignore`
2. ✅ **Use strong passwords** - Change from default
3. ✅ **Use prepared statements** - Prevents SQL injection
4. ✅ **Limited user privileges** - Only grant needed permissions
5. ✅ **Error logging** - Errors go to PHP logs, not response
6. ✅ **File uploads** - Validated and stored outside webroot

## Next Steps

1. Test the PHP files: `get_posts.php`, `create_post.php`, `update_post.php`, `delete_post.php`
2. Verify React frontend can connect
3. Test CRUD operations (Create, Read, Update, Delete)
4. Add production environment configuration

## Support

For issues with PDO or MySQL:

- [PDO Documentation](https://www.php.net/manual/en/book.pdo.php)
- [MySQL Documentation](https://dev.mysql.com/doc/)
