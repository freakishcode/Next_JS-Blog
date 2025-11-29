"use client";

import Navigation from "@/components/Navigation";

import { Box, Container, Typography } from "@mui/material";

export default function About() {
  return (
    <>
      <Navigation />

      <Container maxWidth='md' sx={{ py: 4 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant='h3'
            fontWeight='bold'
            gutterBottom
            sx={{
              background: "linear-gradient(to right, #2196f3, #4caf50)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            About Us
          </Typography>

          <Typography variant='body1' sx={{ mt: 4, lineHeight: 1.8 }}>
            Welcome to our blog platform! This is a modern, full-stack blog
            application built with Next.js, React, TypeScript, and a PHP backend
            with MySQL database.
          </Typography>

          <Typography variant='body1' sx={{ mt: 3, lineHeight: 1.8 }}>
            Our mission is to provide a simple yet powerful platform for
            creating, managing, and sharing blog posts with beautiful UI and
            seamless user experience.
          </Typography>

          <Typography variant='body1' sx={{ mt: 3, lineHeight: 1.8 }}>
            Features include post creation with image uploads, real-time
            editing, responsive design, and a clean, intuitive interface.
          </Typography>
        </Box>
      </Container>
    </>
  );
}
