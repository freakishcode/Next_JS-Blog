"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";

// MUI
import { Box, Button, Typography, Chip } from "@mui/material";

// Motion
import { motion } from "motion/react";
import { container, item, visual } from "./hero.motion";

export default function Hero() {
  return (
    <Box component='section' className='relative isolate overflow-hidden'>
      {/* Background */}
      <div className='absolute inset-0 -z-10 bg-linear-to-br from-indigo-50 via-white to-sky-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-indigo-950' />

      <Box className='mx-auto max-w-7xl px-6 py-5'>
        <Navigation />

        <motion.div
          variants={container}
          initial='hidden'
          animate='show'
          className='grid gap-16 lg:grid-cols-2 lg:items-center'
        >
          {/* LEFT CONTENT */}
          <Box>
            <motion.div variants={item}>
              <Chip
                label='Built for developers & writers'
                color='primary'
                variant='outlined'
                className='mb-6'
              />
            </motion.div>

            <motion.div variants={item}>
              <Typography
                variant='h2'
                component='h1'
                className='font-extrabold tracking-tight text-zinc-900 dark:text-white'
              >
                Publish content that
                <span className='block text-indigo-600 dark:text-indigo-400'>
                  actually gets read.
                </span>
              </Typography>
            </motion.div>

            <motion.div variants={item}>
              <Typography
                variant='body1'
                className='mt-6 max-w-xl text-lg text-zinc-600 dark:text-zinc-400'
              >
                A modern blogging platform focused on performance, SEO,
                readability, and analytics — designed to help creators grow
                without distractions.
              </Typography>
            </motion.div>

            {/* CTA */}
            <motion.div variants={item} className='mt-10 flex flex-wrap gap-4'>
              <Button
                component={Link}
                href='/create'
                size='large'
                variant='contained'
                color='primary'
                className='h-12 px-8 rounded-xl'
              >
                Start Writing
              </Button>

              <Button
                component={Link}
                href='/dashboard'
                size='large'
                variant='outlined'
                className='h-12 px-8 rounded-xl'
              >
                Explore Articles
              </Button>
            </motion.div>

            {/* Trust Signals */}
            <motion.div
              variants={item}
              className='mt-10 flex gap-6 text-sm text-zinc-500 dark:text-zinc-400'
            >
              <span>⚡ Fast</span>
              <span>🔍 SEO-Optimized</span>
              <span>📊 Analytics</span>
            </motion.div>
          </Box>

          {/* RIGHT VISUAL */}
          <motion.div variants={visual} className='relative hidden lg:block'>
            <Box className='rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900'>
              <Box className='mb-4 flex gap-2'>
                <span className='h-3 w-3 rounded-full bg-red-500' />
                <span className='h-3 w-3 rounded-full bg-yellow-400' />
                <span className='h-3 w-3 rounded-full bg-green-500' />
              </Box>

              <pre className='text-sm leading-relaxed text-zinc-700 dark:text-zinc-300'>
                {`# Why performance matters

Fast blogs retain readers.
Optimized content ranks higher.
Clean UI builds trust.

Start writing today.`}
              </pre>
            </Box>
          </motion.div>
        </motion.div>
      </Box>
    </Box>
  );
}
