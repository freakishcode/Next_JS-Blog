"use client";
import { useState } from "react";
// MUI Components
import {
  Card,
  // CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  // Stack,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useToast } from "@/UI/ToastMessage/ToastContext";

// Icons
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  ReadMore as ReadMore,
} from "@mui/icons-material";

// API base URL for images
import { BASE_URL } from "@/lib/api/posts";
// Props Type
import { PostCardPropsType } from "@/lib/validators";

import { easeInOut, motion } from "motion/react";

// Motion Card
const MotionCard = motion.create(Card);

export default function PostListItem(props: PostCardPropsType) {
  const { post, onRead, onEdit, onDelete, deletePending = false } = props;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const toast = useToast();

  return (
    <MotionCard
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: easeInOut(0.3) }}
      sx={{
        borderRadius: 2,
        boxShadow: 2,
        px: 2,
        py: 1.5,
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        gap: 0.55,
        transition: "all .2s ease",
        "&:hover": {
          boxShadow: 4,
          backgroundColor: "#fafafa",
        },
      }}
    >
      <Box sx={{ flexDirection: "row", display: "flex", gap: 2, flexGrow: 1 }}>
        {/* Thumbnail */}
        <Box
          component='img'
          src={
            post.image_url ? `${BASE_URL}${post.image_url}` : "/placeholder.jpg"
          }
          alt={post.title}
          sx={{
            width: 90,
            height: 90,
            objectFit: "cover",
            borderRadius: 2,
            border: "1px solid #eee",
            flexShrink: 0,
          }}
        />

        {/* Text Block */}

        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography
            variant='subtitle1'
            fontWeight='600'
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              mb: 0.3,
            }}
          >
            {post.title}
          </Typography>

          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              whiteSpace: "wrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {post.content.slice(0, 200)}
            {post.content.length > 100 ? "..." : ""}
          </Typography>
        </Box>
      </Box>

      <Typography
        variant='caption'
        color='text.disabled'
        sx={{ display: "block", mt: 0.6 }}
      >
        ✍️ {post.author || "Anonymous"} •{" "}
        {post.created_at
          ? new Date(post.created_at).toLocaleString()
          : "No date"}
      </Typography>
      <Divider orientation='vertical' flexItem />

      {/* Action Buttons */}
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant='contained'
          color='info'
          size='small'
          fullWidth
          startIcon={<ReadMore />}
          onClick={() => onRead(post.id)}
          sx={{ textTransform: "none", fontSize: "0.75rem", px: 2 }}
        >
          Read
        </Button>

        <Button
          variant='contained'
          color='secondary'
          size='small'
          fullWidth
          startIcon={<EditIcon />}
          onClick={() => onEdit(post.id)}
          sx={{ textTransform: "none", fontSize: "0.75rem", px: 2 }}
        >
          Edit
        </Button>

        <Button
          variant='contained'
          color='error'
          size='small'
          fullWidth
          startIcon={<DeleteIcon />}
          disabled={deletePending}
          onClick={() => setConfirmOpen(true)}
          sx={{ textTransform: "none", fontSize: "0.75rem", px: 2 }}
        >
          {deletePending ? "Deleting..." : "Delete"}
        </Button>
      </CardActions>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setConfirmOpen(false);
              if (toast) toast.open("🗑️ Deleting post...");
              onDelete?.(post.id);
            }}
            color='error'
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </MotionCard>
  );
}
