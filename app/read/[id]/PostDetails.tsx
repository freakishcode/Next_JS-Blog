"use client";

import { BASE_URL, ReadPostById } from "@/lib/api/posts";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// MUI
import { Button, Stack, CircularProgress, Divider, Box } from "@mui/material";
import {
  Edit as EditIcon,
  ArrowBack as BackIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";

// Motion
import { easeInOut, motion } from "motion/react";

const MotionArticle = motion.create("article");

export default function PostDetails({ id }: { id: string }) {
  const router = useRouter();

  // Fetch post details using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => ReadPostById(id),
  });

  if (isLoading) {
    return (
      <div className='flex justify-center items-center py-16'>
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

  // Prepare content for improved reading experience
  const paragraphs = data.content
    ? data.content.split(/\n\s*\n/).filter(Boolean)
    : [];
  const readingTime = data.content
    ? Math.max(1, Math.round(data.content.split(/\s+/).length / 200))
    : 1;

  return (
    <MotionArticle
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: easeInOut(0.5) }}
      className='max-w-3xl mx-auto px-4 py-12 bg-white dark:bg-slate-900 rounded-lg shadow-sm text-gray-900 dark:text-gray-100'
    >
      {/* HEADER */}
      <header className='mb-6'>
        <h1 className='text-4xl md:text-5xl font-extrabold leading-tight'>
          {data.title}
        </h1>

        <div className='mt-2 flex items-center text-sm text-gray-600 dark:text-gray-400 gap-4'>
          {data.created_at && (
            <div className='flex items-center gap-2'>
              <CalendarIcon fontSize='small' />
              <span>{new Date(data.created_at).toLocaleDateString()}</span>
            </div>
          )}

          <div className='text-sm'>
            <span className='font-medium'>{data.author ?? "Author"}</span>
            <span className='text-gray-400 px-2'>·</span>
            <span>{readingTime} min read</span>
          </div>
        </div>
      </header>

      {/* IMAGE BLOCK */}
      <div className='flex justify-center mb-8'>
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
      <div className='prose prose-lg max-w-none text-gray-800 dark:text-gray-200 leading-relaxed'>
        {paragraphs.length ? (
          paragraphs.map((p, idx) => (
            <p
              key={idx}
              className={
                idx === 0
                  ? "text-lg md:text-xl leading-relaxed mb-6 first-letter:text-6xl first-letter:font-extrabold first-letter:float-left first-letter:mr-3 first-letter:leading-none"
                  : "mb-6"
              }
            >
              {p}
            </p>
          ))
        ) : (
          <p className='mb-6'>{data.content}</p>
        )}
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
    </MotionArticle>
  );
}
