import { z } from "zod";

// Blog Post Form Validation
export const blogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  image: z
    .any()
    .nullable()
    .optional()
    .refine((file) => {
      if (file == null) return true; // optional
      return file instanceof File;
    }, "Invalid file"),
});
// type safety for Blog Post Form Validation
export type BlogFormData = z.infer<typeof blogSchema>;

// Contact Form Validation
export const schema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.email("invalid email Format").lowercase(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
// type safety Contact Form Validation
export type ContactUSFormData = z.infer<typeof schema>;

// Response shape from the create post endpoint
export type CreatePostResponse = {
  success: boolean;
  message: string;
  data?: {
    id: string | number;
    title?: string;
    content?: string;
  };
};

// Error type for createPost
export interface CreatePostError {
  response?: {
    data?: {
      message?: string;
    };
    status: number;
  };
  message: string;
}

// Blog Post Type
export type Post = {
  id: number | string;
  title: string;
  content: string;
  author?: string;
  image_url?: string;
  created_at?: string;
};

// Response shape for paginated posts
export type PaginatedPostsResponse = {
  data: Post[];
  nextPage: number | null; // null when no more pages
  total?: number;
  page?: number;
  pageSize?: number;
};

// Props Type for PostsGrid
export type PostsGridPropsType = {
  posts: Post[];
  onRead: (id: number | string) => void;
  onEdit: (id: number | string) => void;
  onDelete: (id: number | string) => void;
  deletePending?: boolean;
};

// Props Type for PostCard
export type PostCardPropsType = {
  post: Post;
  onRead: (id: number | string) => void;
  onEdit: (id: number | string) => void;
  onDelete: (id: number | string) => void;
  deletePending?: boolean;
};

// Delete Response Type
export type DeleteResponse = {
  success: boolean;
  message: string;
};


export const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  image_url: z.string().nullable(),   // <-- Update here,
  created_at: z.string(),
});

export type PostType = z.infer<typeof postSchema>;
