// sharemodule/auth/LoginModal.jsx
import { TextField, Button, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import api from "../../api/axios";
import toast from "react-hot-toast";
import AuthModalLayout from "./AuthModalLayout";
// import { useNavigate } from "react-router-dom";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function LoginModal({ openModal, setOpenModal, setUser }) {
  

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
  mutationFn: (data) => api.post("/auth/login", data),
  onSuccess: (res) => {
    toast.success("Login successful!");

    // Save user + token
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", res.data.token);

    // Update app state
    setUser(res.data.user);

    // Close modal ✅
    setOpenModal(null);
  },
  onError: (err) => {
    toast.error(err.response?.data?.message || "Login failed");
  },
});


  return (
    <AuthModalLayout
      open={openModal === "login"}
      onClose={() => setOpenModal(null)}
      title="Login"
      subtitle="Welcome back! Please login."
      rightImage="/images/login-bg.jpg"
    >
      <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
        <Stack spacing={2}>
          {/* Email */}
          <TextField
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />

          {/* Password */}
          <TextField
            type="password"
            label="Password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
          />

          {/* Submit Button */}
          <Button type="submit" variant="contained" disabled={mutation.isPending}>
            {mutation.isPending ? "Logging in..." : "Login"}
          </Button>

          {/* Links */}
          <Typography
            variant="body2"
            onClick={() => setOpenModal("forgot")}
            sx={{ cursor: "pointer", color: "primary.main" }}
          >
            Forgot password? Reset here
          </Typography>
          <Typography
            variant="body2"
            onClick={() => setOpenModal("signup")}
            sx={{ cursor: "pointer", color: "primary.main" }}
          >
            Don’t have an account? Register
          </Typography>
        </Stack>
      </form>
    </AuthModalLayout>
  );
}
