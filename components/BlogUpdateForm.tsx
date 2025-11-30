"use client";

import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";

// React Hook Form & Zod
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// MUI
import {
  Typography,
  Button,
  Stack,
  FormControl,
  FormHelperText,
  Paper,
  IconButton,
  Avatar,
} from "@mui/material";

// 🔹 Icons
import {
  Title as TitleIcon,
  Description as DescriptionIcon,
  Article as ArticleIcon,
  CloudUpload as CloudUploadIcon,
  ArrowBack as ArrowBackIcon,
  Image as ImageIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

// API
import { BASE_URL, updatePost, fetchPostByID } from "../lib/api/posts";

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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isNewImage, setIsNewImage] = useState(false);

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

    // Set existing image preview if available
    if (postData.image_url) {
      const imageUrl = BASE_URL + postData.image_url;
      setImagePreview(imageUrl);
      setIsNewImage(false);
    }
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
        <FormControl fullWidth error={!!errors.image}>
          <Typography
            variant='subtitle2'
            component='label'
            className='flex items-center gap-2 font-medium text-gray-700 mb-2'
          >
            <ImageIcon color='primary' /> Featured Image
          </Typography>

          <Paper
            component='label'
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 3,
              backgroundColor: "#f5f5f5",
              border: "2px dashed",
              borderColor: errors.image ? "error.main" : "primary.light",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#f0f0f0",
                borderColor: "primary.main",
              },
            }}
          >
            <Stack alignItems='center' spacing={1}>
              <CloudUploadIcon sx={{ fontSize: 32, color: "primary.main" }} />
              <Typography variant='body2' color='textSecondary'>
                Click to upload or drag and drop
              </Typography>
              <Typography variant='caption' color='textSecondary'>
                PNG, JPG, GIF up to 10MB
              </Typography>
            </Stack>
            <input
              type='file'
              accept='image/*'
              onChange={(e) => {
                const file = e.target.files?.[0] ?? (null as File | null);
                setValue("image", file, { shouldValidate: true });
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                    setIsNewImage(true);
                  };
                  reader.readAsDataURL(file);
                } else {
                  setImagePreview(null);
                  setIsNewImage(false);
                }
              }}
              hidden
            />
          </Paper>
          {imagePreview && (
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 2,
                marginTop: 2,
                backgroundColor: "#fafafa",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                width='100%'
                sx={{ marginBottom: 2 }}
              >
                {/* Label */}
                <Typography variant='subtitle2' className='font-medium'>
                  Image Preview: {!isNewImage && postData.image_url}
                </Typography>

                {isNewImage && (
                  <IconButton
                    size='small'
                    onClick={() => {
                      setImagePreview(null);
                      setIsNewImage(false);
                    }}
                    sx={{
                      color: "text.secondary",
                      "&:hover": { backgroundColor: "action.hover" },
                    }}
                  >
                    <CloseIcon fontSize='small' />
                  </IconButton>
                )}
              </Stack>
              <Avatar
                src={imagePreview}
                alt='Preview'
                sx={{
                  width: 300,
                  height: 300,
                  boxShadow: 2,
                  border: "2px solid",
                  borderColor: "primary.light",
                }}
              />
            </Paper>
          )}
          {errors.image && (
            <FormHelperText>
              {String(
                typeof errors.image === "object" && "message" in errors.image
                  ? errors.image.message
                  : "Invalid image"
              )}
            </FormHelperText>
          )}
        </FormControl>

        {/* Action Buttons */}
        <Stack direction='row' spacing={2} mt={2}>
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
