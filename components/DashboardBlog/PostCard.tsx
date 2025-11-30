"use client";

import {
  Card,
  // CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  // Stack,
  Divider,
} from "@mui/material";

import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  ReadMore as ReadMore,
} from "@mui/icons-material";

import { BASE_URL } from "@/lib/api/posts";
import { PostCardPropsType } from "@/lib/validators";

export default function PostListItem(props: PostCardPropsType) {
  const { post, onRead, onEdit, onDelete, deletePending = false } = props;

  return (
    <Card
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
            post.image_url
              ? `${BASE_URL}/${post.image_url}`
              : "/placeholder.jpg"
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
          onClick={() => onDelete(post.id)}
          sx={{ textTransform: "none", fontSize: "0.75rem", px: 2 }}
        >
          {deletePending ? "Deleting..." : "Delete"}
        </Button>
      </CardActions>
    </Card>
  );
}
