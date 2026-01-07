// components/LivePreview.tsx
"use client";

import Image from "next/image";

import { Typography } from "@mui/material";

type Props = {
  title?: string;
  content?: string;
  imageSrc?: string | null;
};

export default function LivePreview({ title, content, imageSrc }: Props) {
  return (
    <div>
      {/* Image */}
      {imageSrc ? (
        <div className='relative w-full h-48 mb-4'>
          {/* Using <img> here for compatibility with data URLs */}
          <Image
            src={imageSrc}
            alt='preview'
            style={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
              borderRadius: 8,
            }}
          />
        </div>
      ) : (
        <div className='w-full h-48 rounded-lg bg-gray-100 mb-4 flex items-center justify-center text-gray-400'>
          <Typography variant='body2' style={{ marginRight: 8 }}>
            🖼️
          </Typography>{" "}
          No image
        </div>
      )}

      <Typography
        variant='h3'
        sx={{ fontSize: "1.5rem", fontWeight: 700, color: "#6b7280" }}
      >
        {title || "Post title"}
      </Typography>

      <Typography
        variant='body2'
        style={{ color: "#374151", whiteSpace: "pre-wrap", marginTop: 8 }}
      >
        {content || "Start writing to preview"}
      </Typography>
    </div>
  );
}
