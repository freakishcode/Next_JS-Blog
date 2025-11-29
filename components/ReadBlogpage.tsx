"use client";

import { useRouter, useParams } from "next/navigation";

// ✅ React Query + Axios
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Navigation from "@/components/Navigation";
import { BASE_URL } from "@/lib/api/posts";
import LoadingAnimation from "@/UI/PageLoading-Animation/LoadingAnimation";

// MUI
import { Paper, Avatar, Typography, Button, Stack, Box } from "@mui/material";

// MUI ICONS
import {
  Edit as EditIcon,
  HowToReg as HowToRegIcon,
  KeyboardReturn as KeyboardReturnIcon,
} from "@mui/icons-material";

export default function ReadBlog() {
  const router = useRouter();

  // parameter to target user id
  const { id } = useParams();

  // ✅ Fetch single user with React Query
  const { data, refetch, isLoading, isError, error } = useQuery({
    queryKey: ["userPost", id],
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/${id}`);
      return res.data;
    },
    enabled: !!id, // only run if id exists
  });

  // 🔹 Loading
  if (isLoading) return <LoadingAnimation />;

  if (isError)
    return (
      <Stack
        sx={{
          mt: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color='error' variant='h6'>
          Failed to load posts.{error.message}
        </Typography>

        {/* Retry button */}
        <Button
          onClick={() => {
            void refetch();
          }}
          variant='contained'
          sx={{ mt: 2 }}
          color='primary'
        >
          Retry
        </Button>
      </Stack>
    );

  return (
    <>
      <Navigation />

      {/* Header */}
      <Avatar sx={{ m: "auto", bgcolor: "secondary.main" }}>
        <HowToRegIcon />
        <Typography variant='h5'>Your Post</Typography>
      </Avatar>

      <Paper
        sx={{
          margin: "auto",
          marginTop: "4rem",
          padding: "1rem",
          width: "400px",
          height: "400px",
          background: "#eeee",
        }}
        elevation={4}
      >
        <Box>
          <Typography variant='h6' fontWeight='bold' gutterBottom>
            Title: {data.title}
          </Typography>

          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {data.content}
          </Typography>

          <Typography variant='body1'>Image</Typography>
        </Box>

        <Stack direction='row' spacing={6}>
          {/* Back button*/}
          <Button
            variant='contained'
            color='error'
            size='small'
            startIcon={<KeyboardReturnIcon />}
          >
            Back
          </Button>

          {/* Edit / Update */}
          <Button
            variant='contained'
            color='info'
            startIcon={<EditIcon />}
            onClick={() => {
              router.push(`/edit/${data.id}`);
            }}
            sx={{
              flex: 1,
              mr: 1,
              textTransform: "none",
            }}
          >
            Edit
          </Button>
        </Stack>
      </Paper>
    </>
  );
}
