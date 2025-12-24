"use client";

import Navigation from "@/components/Navigation";
import { useToast } from "@/UI/ToastMessage/ToastContext";
import { useMutation } from "@tanstack/react-query";

// React Form and Zod Resolver & Validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Validators
import { ContactUSFormData, schema } from "@/lib/validators";

// Api
import { sendContactForm } from "@/lib/api/posts";

//MUI
import {
  TextField,
  InputAdornment,
  Typography,
  Button,
  Stack,
} from "@mui/material";

//MUI ICONS
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Description as DescriptionIcon,
  CloudUpload as CloudUploadIcon,
  RestartAlt as RestartAltIcon,
} from "@mui/icons-material";

// Motion library
import { easeInOut, motion } from "motion/react";

// Motion-enhanced Button and Typography
const MotionButton = motion(Button);
const MotionTypography = motion(Typography);

export default function ContactPage() {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactUSFormData>({
    resolver: zodResolver(schema),
  });

  const sendContact = useMutation({
    mutationFn: async (data: ContactUSFormData) => await sendContactForm(data),

    onSuccess: () => {
      if (toast) {
        toast.open("✅ Message sent successfully!");
      }
      // clear form input after success form submit
      reset();
    },
    onError: (err) => {
      if (toast) {
        toast.open("❌ Oops! Something went wrong.");
      }
      console.error(err);
    },
  });

  return (
    <>
      <Navigation />

      <MotionTypography
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: easeInOut(0.5) }}
        variant='h5'
        align='center'
        gutterBottom
      >
        ✨ Contact Us ✨
      </MotionTypography>

      <motion.form
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='grid gap-4 bg-white p-5 rounded-md max-w-[800px] mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-1'
        onSubmit={handleSubmit((data) => sendContact.mutate(data))}
      >
        {/* name */}
        <TextField
          {...register("name")}
          label='Provide your Name Here'
          type='text'
          fullWidth
          error={!!errors.message}
          helperText={errors.name?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Email */}
        <TextField
          {...register("email")}
          label='Email'
          type='email'
          fullWidth
          error={!!errors.message}
          helperText={errors.email?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Message */}
        <TextField
          {...register("message")}
          label='Leave Your Message'
          variant='filled'
          multiline
          fullWidth
          minRows={5}
          error={!!errors.message}
          helperText={errors.message?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <DescriptionIcon color='action' />
              </InputAdornment>
            ),
          }}
        />

        {/* Action Buttons */}
        <Stack spacing={4} my={2} direction='row' width='100%'>
          <MotionButton
            disabled={false}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            type='submit'
            variant='contained'
            color='primary'
            // disabled={mutation.isLoading}
            startIcon={<CloudUploadIcon />}
            fullWidth
          >
            {sendContact.isPending ? "Sending..." : "Send Message"}
          </MotionButton>

          <MotionButton
            disabled={false}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            variant='contained'
            color='warning'
            startIcon={<RestartAltIcon />}
            fullWidth
            onClick={() => {
              reset();
            }}
          >
            Reset
          </MotionButton>
        </Stack>
      </motion.form>
    </>
  );
}
