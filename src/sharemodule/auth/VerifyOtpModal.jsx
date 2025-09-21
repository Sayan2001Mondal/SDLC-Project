// sharemodule/auth/VerifyOtpModal.jsx
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
});

export default function VerifyOtpModal({ openModal, setOpenModal }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const mutation = useMutation({
    mutationFn: (data) => api.post("/auth/verify", data),
    onSuccess: () => {
      toast.success("Account verified! Please login.");
      setOpenModal("login");
    },
    onError: (err) => toast.error(err.response?.data?.message || "OTP verification failed"),
  });

  return (
    <AuthModalLayout
      open={openModal === "verify"}
      onClose={() => setOpenModal(null)}
      title="Verify OTP"
      subtitle="Enter the OTP sent to your email."
      rightImage="/images/verify-bg.jpg"
    >
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        <Stack spacing={2}>
          <TextField label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message}/>
          <TextField label="OTP" {...register("otp")} error={!!errors.otp} helperText={errors.otp?.message}/>
          <Button type="submit" variant="contained" disabled={mutation.isPending}>
            {mutation.isPending ? "Verifying..." : "Verify"}
          </Button>
        </Stack>
      </form>
    </AuthModalLayout>
  );
}
