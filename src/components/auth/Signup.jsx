import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../api/axios";
import { useMutation } from "@tanstack/react-query";
import { TextField, Button, Stack, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  gender: yup.string().required(),
  age: yup.number().required(),
  weight: yup.number().required(),
  height: yup.number().required(),
  goal: yup.string().required(),
  phone: yup.string().required(),
});

export default function Signup() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (data) => api.post("/auth/signup", data),
    onSuccess: () => {
      toast.success("Signup successful! Verify your OTP");
      navigate("/verify-otp");
    },
    onError: (err) => toast.error(err.response?.data?.message || "Signup failed"),
  });

  return (
    <Stack spacing={2} sx={{ maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h5">Signup</Typography>
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        <Stack spacing={2}>
          <TextField label="Name" {...register("name")} error={!!errors.name} helperText={errors.name?.message}/>
          <TextField label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message}/>
          <TextField type="password" label="Password" {...register("password")} error={!!errors.password} helperText={errors.password?.message}/>
          <TextField label="Gender" {...register("gender")} error={!!errors.gender} helperText={errors.gender?.message}/>
          <TextField label="Age" type="number" {...register("age")} error={!!errors.age} helperText={errors.age?.message}/>
          <TextField label="Weight" type="number" {...register("weight")} error={!!errors.weight} helperText={errors.weight?.message}/>
          <TextField label="Height" type="number" {...register("height")} error={!!errors.height} helperText={errors.height?.message}/>
          <TextField label="Goal" {...register("goal")} error={!!errors.goal} helperText={errors.goal?.message}/>
          <TextField label="Phone" {...register("phone")} error={!!errors.phone} helperText={errors.phone?.message}/>
          <Button type="submit" variant="contained" disabled={mutation.isPending}>
            {mutation.isPending ? "Submitting..." : "Signup"}
          </Button>
        </Stack>
      </form>
      <Typography variant="body2">
        Already have an account? <Link to="/login">Login</Link>
      </Typography>
    </Stack>
  );
}
