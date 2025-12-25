"use client";

import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { easeInOut, motion } from "motion/react";

// Motion-enhanced AppBar
const MotionAppBar = motion.create(AppBar);

export default function Navigation() {
  const router = useRouter();

  return (
    <MotionAppBar
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: easeInOut(0.5) }}
      position='static'
      sx={{ mb: 4 }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>📝 Blog</Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            color='inherit'
            onClick={() => {
              router.push("/");
            }}
            sx={{
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}
          >
            Dashboard
          </Button>

          <Button
            color='inherit'
            onClick={() => {
              router.push("/about");
            }}
            sx={{
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}
          >
            About
          </Button>

          <Button
            color='inherit'
            onClick={() => {
              router.push("/contact");
            }}
            sx={{
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}
          >
            Contact Us
          </Button>
        </Box>
      </Toolbar>
    </MotionAppBar>
  );
}
