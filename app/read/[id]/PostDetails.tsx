"use client";

import { BASE_URL, ReadPostById } from "@/lib/api/posts";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// MUI
import { Button, Stack, Box, CircularProgress, Divider } from "@mui/material";
import {
  Edit as EditIcon,
  ArrowBack as BackIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";

export default function PostDetails({ id }: { id: string }) {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => ReadPostById(id),
  });

  if (isLoading) {
    return (
      <div className='flex justify-center py-16'>
        <CircularProgress />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className='text-center text-red-500 py-10 text-lg font-semibold'>
        Failed to load post.
      </div>
    );
  }

  return (
    <article className='max-w-4xl mx-auto px-4 py-6'>
      {/* HEADER */}
      <header className='mb-6 space-y-3'>
        <h1 className='text-5xl font-extrabold leading-tight text-gray-900'>
          {data.title}
        </h1>

        {data.created_at && (
          <div className='flex items-center text-gray-600 gap-2'>
            <CalendarIcon fontSize='small' />
            <span className='text-sm'>
              {new Date(data.created_at).toLocaleDateString()}
            </span>
          </div>
        )}
      </header>

      {/* IMAGE BLOCK */}
      <div className='flex justify-center mb-6'>
        <Box
          component='img'
          src={
            data.image_url ? `${BASE_URL}${data.image_url}` : "/placeholder.jpg"
          }
          alt={data.title}
          sx={{
            width: "100%",
            maxWidth: 900,
            height: 380,
            objectFit: "cover",
            borderRadius: 3,
            border: "1px solid #e5e7eb",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        />
      </div>

      <Divider className='my-6' />

      {/* CONTENT */}
      <div className='prose prose-lg max-w-none text-gray-800 leading-relaxed font-[450]'>
        {data.content}
      </div>

      <Divider className='my-8' />

      {/* ACTION BUTTONS */}
      <Stack spacing={2} direction='row' className='mt-4'>
        <Button
          startIcon={<BackIcon />}
          variant='outlined'
          onClick={() => router.back()}
          sx={{
            borderRadius: "10px",
            paddingX: 3,
            textTransform: "none",
          }}
        >
          Back
        </Button>

        <Button
          variant='contained'
          startIcon={<EditIcon />}
          onClick={() => router.push(`/edit/${data.id}`)}
          sx={{
            borderRadius: "10px",
            paddingX: 3,
            bgcolor: "#2563eb !important",
            textTransform: "none",
          }}
        >
          Edit Post
        </Button>
      </Stack>
    </article>
  );
}
