import { api } from "./axios";

import axios from "axios";

// URL for Image
export const BASE_URL =
  process.env.NEXT_IMAGE_URL_BASE_PATH || "http://localhost";

import {
  BlogFormData,
  CreatePostResponse,
  ContactUSFormData,
} from "../validators";

import { PaginatedPostsResponse } from "../validators";

/**
 * Fetch all posts
 * server endpoint expected: GET /get_posts.php?page=1&pageSize=10
 */
export const fetchPosts = async ({
  pageParam = 1,
  pageSize = 10,
} = {}): Promise<PaginatedPostsResponse> => {
  const res = await api.get("/get_posts.php", {
    params: { page: pageParam, pageSize },
  });

  // Handle various backend response shapes
  const payload = res.data;
  if (Array.isArray(payload)) {
    return {
      data: payload,
      nextPage: null,
    };
  }
  return payload as PaginatedPostsResponse;
};

// Create a new blog post
export async function createPost(
  data: BlogFormData
): Promise<CreatePostResponse> {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);
  if (data.image) formData.append("image", data.image as Blob);

  const response = await api.post<CreatePostResponse>(
    "/create_post.php",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data;
}

// Update an existing blog post
export async function updatePost(
  id: string | number,
  data: BlogFormData
): Promise<CreatePostResponse> {
  const formData = new FormData();

  formData.append("id", String(id));
  formData.append("title", data.title);
  formData.append("content", data.content);
  if (data.image) formData.append("image", data.image as Blob);

  const response = await api.post<CreatePostResponse>(
    "/update_post.php",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data;
}

// fetch function for a single post by ID
export const fetchPostByID = async (id: string) => {
  const res = await api.get("/get_post_by_id.php", { params: { id } });

  if (!res.data.success) {
    throw new Error(res.data.message || "Failed to fetch post");
  }

  return res.data.data;
};

// Delete a single Blog by Id
export const deletePost = async (id: number | string) => {
  const res = await api.delete("/delete_post.php", { data: { id } });
  return res.data;
};

// Send Contact Form
export const sendContactForm = async (data: ContactUSFormData) => {
  const res = await axios.post("https://formspree.io/f/xyzpryaa", data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};
