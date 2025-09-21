// sharemodule/auth/ForgotPasswordModal.jsx
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
});

export default function ForgotPasswordModal({ openModal, setOpenModal }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const mutation = useMutation({
    mutationFn: (data) => api.post("/auth/forgot-password", data),
    onSuccess: () => {
      toast.success("OTP sent to email.");
      setOpenModal("reset");
    },
    onError: (err) => toast.error(err.response?.data?.message || "Error sending OTP"),
  });

  return (
    <AuthModalLayout
      open={openModal === "forgot"}
      onClose={() => setOpenModal(null)}
      title="Forgot Password"
      subtitle="Enter your email to receive OTP."
      rightImage="/images/forgot-bg.jpg"
    >
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        <Stack spacing={2}>
          <TextField label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message}/>
          <Button type="submit" variant="contained" disabled={mutation.isPending}>
            {mutation.isPending ? "Sending..." : "Send OTP"}
          </Button>
        </Stack>
      </form>
    </AuthModalLayout>
  );
}
