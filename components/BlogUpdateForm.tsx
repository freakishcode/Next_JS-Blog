"use client";

import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";

// React Hook Form & Zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// MUI
import { Typography, Button, Stack } from "@mui/material";

// 🔹 Icons
import {
  Title as TitleIcon,
  Description as DescriptionIcon,
  Article as ArticleIcon,
  CloudUpload as CloudUploadIcon,
  ArrowBack as ArrowBackIcon,
  Image as ImageIcon,
} from "@mui/icons-material";

// API
import { updatePost, fetchPostByID } from "../lib/api/posts";

// Validators and Types
import {
  blogSchema,
  BlogFormData,
  CreatePostResponse,
  CreatePostError,
} from "@/lib/validators";

import { useToast } from "@/UI/ToastMessage/ToastContext";

export default function EditPostPage({ id: propId }: { id?: string }) {
  const router = useRouter();
  const toast = useToast();

  const searchParams = useSearchParams();
  const id = propId ?? (searchParams ? searchParams.get("id") : null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: { title: "", content: "", image: null },
  });

  // mutation for updating a post
  const updatePostMutation = useMutation<
    CreatePostResponse,
    CreatePostError,
    { id: string | number; data: BlogFormData }
  >({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string | number;
      data: BlogFormData;
    }) => updatePost(id, data),
    onSuccess: (data: CreatePostResponse) => {
      // navigate back to read/view page or show toast
      console.log("Post updated:", data);
      if (toast) {
        toast.open("✅ Post updated Successfully!");
      }
      router.push(`/`);
    },
    onError: (err: CreatePostError) => {
      console.error("Failed to update post:", err);
      if (toast) {
        toast.open("❌ Failed to update post. Please try again.");
      }
    },
  });

  // React Query (loads post)
  const {
    data: postData,
    // isLoading,
    // error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostByID(id as string),
    enabled: !!id,
  });

  // hydrate form when data is ready
  useEffect(() => {
    if (!postData) return;

    setValue("title", postData.title ?? "");
    setValue("content", postData.content ?? "");
  }, [postData, setValue]);

  const onSubmit = (data: BlogFormData) => {
    if (!id) return;
    updatePostMutation.mutate({ id: id as string, data });
  };

  // show server error
  const serverError =
    updatePostMutation.error?.response?.data?.message ||
    updatePostMutation.error?.message;

  return (
    <div className='min-h-screen p-6'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white shadow rounded-2xl p-6 space-y-6'
        noValidate
      >
        <Typography
          variant='h4'
          fontWeight='bold'
          className='text-center flex items-center justify-center gap-2 text-transparent bg-clip-text bg-linear-to-r from-green-500 to-blue-600'
        >
          <ArticleIcon className='text-blue-600' /> Edit Blog Post
        </Typography>

        {serverError && <div className='text-red-600'>{serverError}</div>}

        {/* Title */}
        <div>
          <label className='text-sm font-medium text-gray-700'>
            <TitleIcon color='primary' />
            Title
          </label>
          <input
            {...register("title")}
            className={`mt-2 block w-full border rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? "border-red-400" : "border-gray-200"
            }`}
            placeholder='Post title'
          />
          {errors.title && (
            <p className='text-red-500 text-sm mt-1'>{errors.title.message}</p>
          )}
        </div>

        {/* Content */}
        <div>
          <label className='text-sm font-medium text-gray-700'>
            <DescriptionIcon color='primary' /> Content
          </label>
          <textarea
            {...register("content")}
            className={`mt-2 block w-full h-36 border rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.content ? "border-red-400" : "border-gray-200"
            }`}
            placeholder='Write your post...'
          />
          {errors.content && (
            <p className='text-red-500 text-sm mt-1'>
              {errors.content.message}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className='flex items-center gap-2 text-sm font-medium text-gray-700'>
            <ImageIcon color='primary' /> Featured Image
          </label>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => {
              const file = e.target.files?.[0] ?? (null as File | null);
              setValue("image", file, { shouldValidate: true });
            }}
            className='mt-2 text-black'
          />
          {errors.image && (
            <p className='text-red-500 text-sm mt-1'>
              {String(
                typeof errors.image === "object" && "message" in errors.image
                  ? errors.image.message
                  : "Invalid image"
              )}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <Stack direction='row' spacing={2}>
          <Button
            type='button'
            variant='outlined'
            onClick={() => router.back()}
            startIcon={<ArrowBackIcon />}
            fullWidth
            className='mb-2'
          >
            Go Back
          </Button>

          <Button
            type='submit'
            variant='contained'
            disabled={updatePostMutation.isPending}
            startIcon={<CloudUploadIcon />}
            fullWidth
          >
            {updatePostMutation.isPending ? "Saving..." : "Save Updates"}
          </Button>
        </Stack>
      </form>
    </div>
  );
}
