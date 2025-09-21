import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../api/axios";
import { useMutation } from "@tanstack/react-query";
import { TextField, Button, Stack, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const mutation = useMutation({
    mutationFn: (data) => api.post("/auth/login", data),
    onSuccess: () => {
      toast.success("Login successful!");
      navigate("/dashboard");
    },
    onError: (err) => toast.error(err.response?.data?.message || "Login failed"),
  });

  return (
    <Stack spacing={2} sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5">Login</Typography>
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        <Stack spacing={2}>
          <TextField label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message}/>
          <TextField type="password" label="Password" {...register("password")} error={!!errors.password} helperText={errors.password?.message}/>
          <Button type="submit" variant="contained" disabled={mutation.isPending}>
            {mutation.isPending ? "Logging in..." : "Login"}
          </Button>
        </Stack>
      </form>
      <Typography variant="body2">
        Forgot password? <Link to="/forgot-password">Reset here</Link>
      </Typography>
      <Typography variant="body2">
        Don’t have an account? <Link to="/signup">Register</Link>
      </Typography>
    </Stack>
  );
}
