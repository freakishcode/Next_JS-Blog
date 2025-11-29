# Next.js Blog Form (TypeScript) + react-hook-form + Zod + PHP (PDO) backend

---

This single document contains everything: the Next.js TypeScript page/component, helper hooks, Axios client, Zod schemas, and the PHP PDO backend endpoint plus SQL schema and setup notes.

---

## Files included (all code blocks below)

1. `app/(blog)/create/page.tsx` — Next.js 14+ app-router page (TypeScript) with the form and live preview.
2. `lib/axios.ts` — Axios instance used by the frontend.
3. `lib/validators.ts` — zod schemas and types.
4. `api/create_post.php` — PHP backend using PDO, handles multipart/form-data image upload (stores image in `uploads/`) and inserts into MySQL securely.
5. `.env.example` — example environment variables for PHP backend.
6. `sql/schema.sql` — table schema.

---

```sql
CREATE TABLE `posts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `image_path` VARCHAR(255) DEFAULT NULL,
  `created_at` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## Setup notes & tips (do read)

- **Packages to install (frontend)**

  - `react-hook-form`, `zod`, `@hookform/resolvers`, `axios`, `@mui/material`, `@mui/icons-material`.
  - Example: `pnpm add react-hook-form zod @hookform/resolvers axios @mui/material @mui/icons-material`.

- **Tailwind** for styling (form uses Tailwind + small MUI Buttons & icons). Keep Tailwind configured in your Next.js project.

- **CORS & base URL**: Update `NEXT_PUBLIC_API_BASE` or `lib/axios.ts` baseURL to point to your PHP host (e.g., `https://api.myblog.com`). The PHP snippet includes permissive CORS for demo; tighten in production.

- **Uploads folder**: create `uploads/` next to your PHP files and ensure the webserver can serve it. Set correct permissions and avoid exposing `.env.php`.

- **Server-side validation**: The PHP file performs minimal checks. For production add stronger validation, file size limits, virus scanning, rate limiting, authentication, and CSRF protections.

- **File paths**: The PHP returns a relative `uploads/` path. If your PHP runs on a different host than Next.js, either return full URL or configure your frontend to request image from the PHP host.

- **Security**: Always run prepared statements (done), validate uploads (done basic), and keep DB credentials out of the repo.

---

If you want I can now:

- split the Next.js page into smaller components + unit-testable hooks,
- add optimistic updates and TanStack Query integration,
- convert to API routes in Next.js instead of external PHP (if you prefer a Node API),
- add authentication (JWT/session) and an edit flow,
- or deploy-ready Docker Compose for the PHP + MySQL stack.

Tell me which one and I’ll update the files.
