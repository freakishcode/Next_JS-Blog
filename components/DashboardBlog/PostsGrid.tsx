"use client";

import { Box, Typography } from "@mui/material";

import PostCard from "@/components/DashboardBlog/PostCard";

// Props Type
import { PostsGridPropsType } from "@/lib/validators";

import { motion } from "motion/react";

// Motion Box
const MotionPostsGrid = motion.create(Box);

export default function PostsGrid(props: PostsGridPropsType) {
  const { posts, onRead, onEdit, onDelete, deletePending = false } = props;

  // No Posts Found
  if (!posts || posts.length === 0) {
    return (
      <Typography
        align='center'
        sx={{ color: "text.secondary", fontStyle: "italic", mt: 8 }}
      >
        No posts found. Create a new post to get started.
      </Typography>
    );
  }
  return (
    <MotionPostsGrid
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        },
      }}
    >
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onRead={onRead}
          onEdit={onEdit}
          onDelete={onDelete}
          deletePending={deletePending}
        />
      ))}
    </MotionPostsGrid>
  );
}
