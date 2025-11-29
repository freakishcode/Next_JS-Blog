"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  Collapse,
  IconButton,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function EditError({
  error,
  reset,
}: {
  error?: Error;
  reset?: () => void;
}) {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);

  const supportEmail =
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "ajibolabakare@gmail.com";

  const onRetry = () => {
    try {
      if (typeof reset === "function") {
        reset();
      } else {
        router.refresh();
      }
    } catch (e) {
      console.error("Retry failed:", e);
    }
  };

  return (
    <Box sx={{ pb: 6 }}>
      <Navigation />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
          px: 2,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            maxWidth: 900,
            width: "100%",
            borderRadius: 3,
            p: { xs: 3, md: 5 },
          }}
        >
          <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
            <Box
              sx={{
                width: 88,
                height: 88,
                borderRadius: "50%",
                background: (theme) => theme.palette.error.main,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <ErrorOutlineIcon sx={{ fontSize: 44 }} />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant='h4' component='h1' gutterBottom>
                  Oops — Something went wrong
                </Typography>

                <IconButton
                  aria-label={showDetails ? "Hide details" : "Show details"}
                  onClick={() => setShowDetails((s) => !s)}
                  size='small'
                >
                  <ExpandMoreIcon
                    sx={{
                      transform: showDetails ? "rotate(180deg)" : "rotate(0)",
                    }}
                  />
                </IconButton>
              </Box>

              <Typography color='text.secondary' sx={{ mb: 2 }}>
                We could not load the post you were looking for. It may have
                been removed, or there was a temporary server issue.
              </Typography>

              <Collapse in={showDetails}>
                {error?.message && (
                  <Paper
                    variant='outlined'
                    sx={{
                      p: 2,
                      bgcolor: (theme) => theme.palette.action.hover,
                      maxHeight: 200,
                      overflow: "auto",
                      mb: 2,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    <Typography variant='caption' color='text.secondary'>
                      {error.message}
                    </Typography>
                  </Paper>
                )}
              </Collapse>

              {/* // Action Buttons */}
              <Stack direction='row' spacing={2} sx={{ mt: 1 }}>
                <Button
                  variant='contained'
                  startIcon={<RefreshIcon />}
                  onClick={onRetry}
                >
                  Retry
                </Button>

                <Button
                  variant='outlined'
                  startIcon={<ArrowBackIcon />}
                  onClick={() => router.back()}
                >
                  Go back
                </Button>

                <Button
                  color='inherit'
                  startIcon={<HomeIcon />}
                  onClick={() => router.push("/")}
                >
                  Home
                </Button>
              </Stack>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* //-- Footer with support email -- */}
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Typography variant='body2' color='text.secondary'>
          If the problem persists, please contact support at
          <Typography
            component='a'
            href={`mailto:${supportEmail}?subject=Blog%20Error`}
            sx={{ ml: 0.5 }}
          >
            {supportEmail}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}
