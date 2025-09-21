// sharemodule/auth/ResetPasswordModal.jsx
import { TextField, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import api from "../../api/axios";
import toast from "react-hot-toast";
import AuthModalLayout from "./AuthModalLayout";

const schema = yup.object({
  email: yup.string().email().required(),
  otp: yup.string().required(),
  newPassword: yup.string().min(6).required(),
});

export default function ResetPasswordModal({ openModal, setOpenModal }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const mutation = useMutation({
    mutationFn: (data) => api.post("/auth/reset-password", data),
    onSuccess: () => {
      toast.success("Password reset successful! Please login.");
      setOpenModal("login");
    },
    onError: (err) => toast.error(err.response?.data?.message || "Password reset failed"),
  });

  return (
    <AuthModalLayout
      open={openModal === "reset"}
      onClose={() => setOpenModal(null)}
      title="Reset Password"
      subtitle="Enter OTP and your new password."
      rightImage="/images/reset-bg.jpg"
    >
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        <Stack spacing={2}>
          <TextField label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message}/>
          <TextField label="OTP" {...register("otp")} error={!!errors.otp} helperText={errors.otp?.message}/>
          <TextField type="password" label="New Password" {...register("newPassword")} error={!!errors.newPassword} helperText={errors.newPassword?.message}/>
          <Button type="submit" variant="contained" disabled={mutation.isPending}>
            {mutation.isPending ? "Resetting..." : "Reset Password"}
          </Button>
        </Stack>
      </form>
    </AuthModalLayout>
  );
}
