// app/create/preview/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import LivePreview from "@/components/LivePreview";
import { Box, Button, Typography } from "@mui/material";

export default function PreviewPage() {
  const [title, setTitle] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);

  useEffect(() => {
    setTitle(sessionStorage.getItem("preview_title") || "");
    setContent(sessionStorage.getItem("preview_content") || "");
    setImageData(sessionStorage.getItem("preview_image_data") || null);
  }, []);

  return (
    <div>
      <Navigation />
      <Box className='mx-auto max-w-4xl px-6 py-6'>
        <div className='flex items-center justify-between mb-4'>
          <Typography variant='h5' fontWeight='bold'>
            Live Preview
          </Typography>
          <Button
            component={Link}
            href='/create'
            variant='outlined'
            size='small'
          >
            Back to Editor
          </Button>
        </div>

        <LivePreview
          title={title ?? undefined}
          content={content ?? undefined}
          imageSrc={imageData ?? null}
        />

        {!title && !content && !imageData && (
          <div className='mt-4 text-sm text-gray-500'>
            No preview data found. Go back to the editor to generate preview
            data.
          </div>
        )}
      </Box>
    </div>
  );
}
