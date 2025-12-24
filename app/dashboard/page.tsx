"use client";

import { useRouter } from "next/navigation";
import { Typography, Button, Stack, Box } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// API
import { fetchPosts, deletePost } from "@/lib/api/posts";

// Components
import Navigation from "@/components/Navigation";
import LoadingAnimation from "@/UI/PageLoading-Animation/LoadingAnimation";
import { useToast } from "@/UI/ToastMessage/ToastContext";
import Header from "@/components/DashboardBlog/Header";
import PostsGrid from "@/components/DashboardBlog/PostsGrid";

// Types
import type { AxiosError } from "axios";
import type { PaginatedPostsResponse, DeleteResponse } from "@/lib/validators";

export default function BlogDashboard() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const router = useRouter();

  // 🔹 Fetch Posts
  const {
    data = { data: [], nextPage: null },
    isLoading,
    isError,
    refetch,
  } = useQuery<PaginatedPostsResponse>({
    queryKey: ["posts"],
    queryFn: () => fetchPosts({}),
  });

  // 🔹 Delete Mutation
  const deleteMutation = useMutation<
    DeleteResponse,
    AxiosError,
    number | string
  >({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (toast) {
        toast.open("🗑️ Post deleted successfully");
      }
    },
    onError: (error: AxiosError) => {
      console.error("❌ Failed to delete post:", error);
      if (toast) {
        toast.open("❌ Failed to delete post");
      }
    },
  });

  // 🔹 Loading
  if (isLoading) return <LoadingAnimation />;

  // 🔹 Error
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
          Failed to load posts.
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
    <Box sx={{ p: { xs: 2, md: 6 }, maxWidth: "1200px", mx: "auto" }}>
      <Navigation />

      <Header
        onCreate={() => {
          router.push("/create");
        }}
      />

      <PostsGrid
        posts={data.data}
        onRead={(id) => router.push(`/read/${id}`)}
        onEdit={(id) => router.push(`/edit/${id}`)}
        onDelete={(id) => deleteMutation.mutate(id)}
        deletePending={deleteMutation.isPending}
      />
    </Box>
  );
}
