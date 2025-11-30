import axios from "axios";

const instance = axios.create({
  baseURL: "https://blog-article.free.nf/php", // adjust for your PHP host
  withCredentials: false,
  headers: { Accept: "application/json" },
});

// Named export for consistency across the codebase
export const api = instance;

// Default export kept for backward compatibility
export default instance;
