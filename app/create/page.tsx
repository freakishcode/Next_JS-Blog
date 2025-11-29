"use client";

import Image from "next/image";

// Nav bar
import Navigation from "@/components/Navigation";

// TanStack Query
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// React hook form & Zod(validation)
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// MUI
import { Typography, Button } from "@mui/material";

// 🔹 Icons
import {
  Title as TitleIcon,
  Description as DescriptionIcon,
  // Person as PersonIcon,
  Article as ArticleIcon,
  CloudUpload as CloudUploadIcon,
  RestartAlt as RestartAltIcon,
  Visibility as VisibilityIcon,
  // PhotoCamera as PhotoCamera,
  Image as ImageIcon,
} from "@mui/icons-material";

// API function
import { createPost } from "@/lib/api/posts";

// 🔹 Toast Message Context
import { useToast } from "../../UI/ToastMessage/ToastContext";

// Zod schema and types
import {
  blogSchema,
  BlogFormData,
  CreatePostResponse,
  CreatePostError,
} from "@/lib/validators";

export default function BlogPostForm() {
  // TanStack Query
  const queryClient = useQueryClient();
  const router = useRouter();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: { title: "", content: "", image: null },
  });

  // Use useWatch for live preview - better React 19 compatibility
  const watchedImage = useWatch({ control, name: "image" });
  const watchedTitle = useWatch({ control, name: "title" });
  const watchedContent = useWatch({ control, name: "content" });

  // TanStack Query mutation for creating blog post
  const createPostMutation = useMutation<
    CreatePostResponse,
    CreatePostError,
    BlogFormData
  >({
    mutationFn: createPost,
    onSuccess: (data) => {
      console.log("Post created successfully:", data);
      // Invalidate posts query to refresh dashboard
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast?.open("✅ Posted successfully!");

      // Reset form
      reset({ title: "", content: "", image: null });
      // Navigate to dashboard
      router.push("/");
    },
    onError: (error) => {
      console.error("Error creating post:", error);
      toast?.open(`❌ Error creating post: ${error}`);
    },
  });

  // Derive preview URL directly from watched image
  const previewURL = (() => {
    if (!watchedImage || !(watchedImage instanceof File)) {
      return null;
    }
    return URL.createObjectURL(watchedImage);
  })();

  const onSubmit = (data: BlogFormData) => {
    createPostMutation.mutate(data);
  };

  const serverError =
    createPostMutation.error?.response?.data?.message ||
    createPostMutation.error?.message;

  return (
    <>
      {/* Nav bar */}
      <Navigation />

      {/* form container */}
      <div className='min-h-screen  p-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* --- BLOG FORM --- */}
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
            <ArticleIcon className='text-blue-600' /> Create Blog Post
          </Typography>

          {serverError && (
            <div className='text-red-600 text-center'>{serverError}</div>
          )}

          {/* Title */}
          <div>
            <label className='text-sm font-medium text-gray-700'>
              <TitleIcon color='primary' />
              Title
            </label>
            <input
              {...register("title")}
              className={`mt-2 block w-full border rounded-lg p-3  text-black focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? "border-red-400" : "border-gray-200"
              }`}
              placeholder='Post title'
            />
            {errors.title && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.title.message}
              </p>
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
          <div className=' flex flex-col gap-2.5'>
            <Button
              type='submit'
              variant='contained'
              disabled={createPostMutation.isPending}
              startIcon={<CloudUploadIcon />}
              fullWidth
            >
              {createPostMutation.isPending ? "Publishing..." : "Publish Post"}
            </Button>

            <Button
              variant='contained'
              color='warning'
              startIcon={<RestartAltIcon />}
              fullWidth
              onClick={() => {
                reset();
              }}
            >
              Reset
            </Button>
          </div>
        </form>

        {/* --- LIVE PREVIEW --- */}
        <aside className='bg-white shadow rounded-2xl p-6'>
          {/* Heading text */}
          <Typography
            variant='h6'
            className='bg-linear-to-r from-yellow-100 to-pink-200 w-full text-gray-800 py-2 flex justify-center items-center gap-2 rounded-md'
          >
            <VisibilityIcon className='text-blue-500' /> Live Preview
          </Typography>

          {previewURL ? (
            <div className='relative w-full h-48 mb-4'>
              <Image
                src={previewURL}
                alt='preview'
                fill
                className='object-contain rounded-lg '
                sizes='(max-width: 768px) 100vw, 50vw'
              />
            </div>
          ) : (
            <div className='w-full h-48 rounded-lg bg-gray-100 mb-4 flex items-center justify-center text-gray-400'>
              <ImageIcon className='text-gray-400 mr-2' /> No image
            </div>
          )}

          <h3 className='text-2xl font-bold text-gray-500 '>
            {watchedTitle || "Post title"}
          </h3>

          <Typography
            variant='body2'
            className='text-gray-700 whitespace-pre-wrap mt-2'
          >
            {watchedContent || "Start writing to preview"}
          </Typography>
        </aside>
      </div>
    </>
  );
}
