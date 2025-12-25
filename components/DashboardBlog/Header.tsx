"use client";

import { Box, Button, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import { easeInOut, motion } from "motion/react";

type Props = {
  onCreate: () => void;
};

// Motion-enhanced Button and Typography
const MotionButton = motion.create(Button);
const MotionTitle = motion.create(Typography);

export default function Header({ onCreate }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 6,
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <MotionTitle
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: easeInOut(0.5) }}
        variant='h4'
        fontWeight='bold'
        sx={{
          background: "linear-gradient(to right, #2196f3, #4caf50)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        🧭 Blog Dashboard
      </MotionTitle>

      <MotionButton
        disabled={false}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        variant='contained'
        color='success'
        startIcon={<AddIcon />}
        onClick={onCreate}
        sx={{ textTransform: "none", fontWeight: "bold", px: 3 }}
      >
        Create Post
      </MotionButton>
    </Box>
  );
}
