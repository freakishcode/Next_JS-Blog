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
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import RefreshIcon from "@mui/icons-material/Refresh";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function DashboardError({
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
      // eslint-disable-next-line no-console
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
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
          }}
        >
          <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
            <Box
              sx={{
                width: 88,
                height: 88,
                borderRadius: "50%",
                background: (theme) => theme.palette.warning.main,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <WarningAmberIcon sx={{ fontSize: 44 }} />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant='h4' component='h1' gutterBottom>
                  Dashboard Error
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
                We encountered an issue loading your dashboard. This might be
                due to a temporary server error or connectivity issue. Please
                try refreshing, or contact support if the problem persists.
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
                      border: (theme) =>
                        `1px solid ${theme.palette.warning.light}`,
                    }}
                  >
                    <Typography variant='caption' color='text.secondary'>
                      <strong>Error details:</strong>
                      <br />
                      {error.message}
                    </Typography>
                  </Paper>
                )}
              </Collapse>

              <Stack direction='row' spacing={2} sx={{ mt: 2 }}>
                <Button
                  variant='contained'
                  color='warning'
                  startIcon={<RefreshIcon />}
                  onClick={onRetry}
                  sx={{ fontWeight: "bold" }}
                >
                  Refresh Dashboard
                </Button>

                <Button
                  variant='outlined'
                  color='inherit'
                  startIcon={<HomeIcon />}
                  onClick={() => router.push("/")}
                >
                  Back to Home
                </Button>
              </Stack>

              <Typography variant='body2' color='text.secondary' sx={{ mt: 3 }}>
                <strong>Common solutions:</strong>
              </Typography>
              <ul
                style={{
                  marginTop: 8,
                  paddingLeft: 20,
                  color: "inherit",
                }}
              >
                <li>
                  <Typography variant='body2' color='text.secondary'>
                    Try clearing your browser cache and refreshing.
                  </Typography>
                </li>
                <li>
                  <Typography variant='body2' color='text.secondary'>
                    Check your internet connection.
                  </Typography>
                </li>
                <li>
                  <Typography variant='body2' color='text.secondary'>
                    Wait a few moments and try again.
                  </Typography>
                </li>
              </ul>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Typography variant='body2' color='text.secondary'>
          Still need help? Contact us at
          <Typography
            component='a'
            href={`mailto:${supportEmail}?subject=Dashboard%20Error`}
            sx={{
              ml: 0.5,
              textDecoration: "underline",
              cursor: "pointer",
              "&:hover": { textDecoration: "none", fontWeight: "bold" },
            }}
          >
            {supportEmail}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}
