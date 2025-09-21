import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../api/axios";
import { useMutation } from "@tanstack/react-query";
import { TextField, Button, Stack, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  email: yup.string().email().required(),
});

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const mutation = useMutation({
    mutationFn: (data) => api.post("/auth/forgot-password", data),
    onSuccess: () => {
      toast.success("OTP sent to email.");
      navigate("/reset-password");
    },
    onError: (err) => toast.error(err.response?.data?.message || "Error sending OTP"),
  });

  return (
    <Stack spacing={2} sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5">Forgot Password</Typography>
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        <Stack spacing={2}>
          <TextField label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message}/>
          <Button type="submit" variant="contained" disabled={mutation.isPending}>
            {mutation.isPending ? "Sending..." : "Send OTP"}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
