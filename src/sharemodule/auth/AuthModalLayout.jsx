// sharemodule/auth/AuthModalLayout.jsx
import { Modal, Box, Typography, Stack, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function AuthModalLayout({
  open,
  onClose,
  title,
  subtitle,
  children,
  rightImage,
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: "90%",
          maxWidth: 1000,
          mx: "auto",
          my: 4,
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: 24,
          display: "flex",
          bgcolor: "transparent",
        }}
      >
        {/* Left Yellow Panel */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "#f5d630",
            p: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h4" fontWeight="bold">
              {title}
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          {subtitle && (
            <Typography sx={{ mb: 3, color: "rgba(0,0,0,0.7)" }}>
              {subtitle}
            </Typography>
          )}
          {children}
        </Box>

        {/* Right Image */}
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${rightImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Box>
    </Modal>
  );
}
