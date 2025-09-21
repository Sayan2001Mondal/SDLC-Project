import SignupModal from "./auth/SignupModal";
import VerifyOtpModal from "./auth/VerifyOtpModal";
import LoginModal from "./auth/LoginModal";
import ForgotPasswordModal from "./auth/ForgotPasswordModal";
import ResetPasswordModal from "./auth/ResetPasswordModal";

export default function AuthModals({ openModal, setOpenModal, setUser }) {
  return (
    <>
      {/* Signup */}
      <SignupModal
        openModal={openModal}
        setOpenModal={setOpenModal}
      />

      {/* Verify OTP */}
      <VerifyOtpModal
        openModal={openModal}
        setOpenModal={setOpenModal}
      />

      {/* Login (needs setUser to update app state) */}
      <LoginModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setUser={setUser}
      />

      {/* Forgot Password */}
      <ForgotPasswordModal
        openModal={openModal}
        setOpenModal={setOpenModal}
      />

      {/* Reset Password */}
      <ResetPasswordModal
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
}
