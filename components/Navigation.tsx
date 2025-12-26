"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/navigation";
import { motion, easeInOut } from "motion/react";

// Motion-enhanced AppBar
const MotionAppBar = motion.create(AppBar);

export default function Navigation() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const pages = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "About", path: "/about" },
    { label: "Contact Us", path: "/contact" },
  ];

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = (path?: string) => {
    setAnchorEl(null);
    if (path) router.push(path);
  };

  return (
    <MotionAppBar
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: easeInOut(0.5) }}
      position='static'
      sx={{ mb: 4, backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/*  Logo / Brand Name (clickable + keyboard accessible) */}
        <Box
          role='button'
          tabIndex={0}
          aria-label='Go to home'
          onClick={() => router.push("/")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") router.push("/");
          }}
          sx={{ fontWeight: "bold", fontSize: "1.5rem", cursor: "pointer" }}
        >
          📝 Blog
        </Box>

        {isMobile ? (
          <>
            <IconButton
              color='inherit'
              onClick={handleOpenMenu}
              aria-controls={open ? "nav-menu" : undefined}
              aria-haspopup='true'
              aria-expanded={open ? "true" : undefined}
              size='large'
              edge='end'
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id='nav-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={() => handleClose()}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {pages.map((p) => (
                <MenuItem key={p.path} onClick={() => handleClose(p.path)}>
                  {p.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: "flex", gap: 2 }}>
            {pages.map((p) => (
              <Button
                key={p.path}
                color='inherit'
                onClick={() => {
                  router.push(p.path);
                }}
                sx={{
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                }}
              >
                {p.label}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </MotionAppBar>
  );
}
