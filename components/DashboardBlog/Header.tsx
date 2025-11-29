"use client";

import { Box, Button, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

type Props = {
  onCreate: () => void;
};

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
      <Typography
        variant='h4'
        fontWeight='bold'
        sx={{
          background: "linear-gradient(to right, #2196f3, #4caf50)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        🧭 Blog Dashboard
      </Typography>

      <Button
        variant='contained'
        color='success'
        startIcon={<AddIcon />}
        onClick={onCreate}
        sx={{ textTransform: "none", fontWeight: "bold", px: 3 }}
      >
        Create Post
      </Button>
    </Box>
  );
}
