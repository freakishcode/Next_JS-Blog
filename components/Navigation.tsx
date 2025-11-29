"use client";

import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const router = useRouter();

  return (
    <AppBar position='static' sx={{ mb: 4 }}>
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
    </AppBar>
  );
}
