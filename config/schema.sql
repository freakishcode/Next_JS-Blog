-- Blog Database Schema
-- Create this schema in your MySQL database

-- Create posts table
CREATE TABLE IF NOT EXISTS `posts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Post ID',
  `title` VARCHAR(255) NOT NULL COMMENT 'Post title',
  `content` LONGTEXT NOT NULL COMMENT 'Post content',
  `image_url` VARCHAR(500) NULLABLE COMMENT 'Relative path to post image',
  `author` VARCHAR(100) DEFAULT 'Admin' COMMENT 'Post author name',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Creation timestamp',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last update timestamp',
  INDEX idx_created_at (created_at),
  INDEX idx_author (author)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Blog posts table';

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_title ON posts(title);
CREATE INDEX IF NOT EXISTS idx_search ON posts(title, content);

-- Sample data (optional)
INSERT INTO `posts` (`title`, `content`, `author`, `image_url`) VALUES
(
  'Welcome to the Blog',
  'This is a sample blog post to get you started. You can create, edit, and delete posts using this application.',
  'Admin',
  'uploads/sample1.jpg'
),
(
  'Getting Started with Next.js',
  'Next.js is a powerful React framework for building full-stack web applications. In this post, we explore the basics and best practices.',
  'Developer',
  'uploads/sample2.jpg'
);
