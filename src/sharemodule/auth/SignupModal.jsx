// sharemodule/auth/SignupModal.jsx
import { TextField, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import api from "../../api/axios";
import toast from "react-hot-toast";
import AuthModalLayout from "./AuthModalLayout";

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

export default function SignupModal({ openModal, setOpenModal }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (data) => api.post("/auth/signup", data),
    onSuccess: () => {
      toast.success("Signup successful! Verify your OTP");
      setOpenModal("verify");
    },
    onError: (err) => toast.error(err.response?.data?.message || "Signup failed"),
  });

  return (
    <AuthModalLayout
      open={openModal === "signup"}
      onClose={() => setOpenModal(null)}
      title="Create Account"
      subtitle="Fill in your details to create an account."
      rightImage="/images/signup-bg.jpg"
    >
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        <Stack spacing={2}>
          <TextField label="Name" {...register("name")} error={!!errors.name} helperText={errors.name?.message} />
          <TextField label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
          <TextField type="password" label="Password" {...register("password")} error={!!errors.password} helperText={errors.password?.message} />
          <TextField label="Gender" {...register("gender")} />
          <TextField label="Age" type="number" {...register("age")} />
          <TextField label="Weight" type="number" {...register("weight")} />
          <TextField label="Height" type="number" {...register("height")} />
          <TextField label="Goal" {...register("goal")} />
          <TextField label="Phone" {...register("phone")} />
          <Button type="submit" variant="contained" disabled={mutation.isPending}>
            {mutation.isPending ? "Submitting..." : "Signup"}
          </Button>
        </Stack>
      </form>
    </AuthModalLayout>
  );
}
