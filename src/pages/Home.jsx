import React, {useState} from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Home({ user, setUser, setOpenModal }) {

  const navigate = useNavigate();
const [anchorEl, setAnchorEl] = useState(null);

const handleMenuOpen = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleMenuClose = () => {
  setAnchorEl(null);
};

const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  setUser(null);
  toast.success("Logged out successfully!");

  
};



  return (
    <Box sx={{ fontFamily: "Inter, sans-serif", bgcolor: "#fff" }}>
      {/* Header */}
      <Box component="header" sx={{ bgcolor: "#d7d7d7", py: 2 }}>
        <Container maxWidth="xl">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            {/* Logo */}
            <Box
              component="img"
              src="/logo.png"
              alt="logo"
              sx={{ width: 180, height: 70 }}
            />

            {/* Nav */}
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                bgcolor: "#fff",
                borderRadius: "58px",
                px: 1,
                py: 0.5,
              }}
            >
              {[
                "Home",
                "About us",
                "Plan & Pricing",
                "Trainers",
                "Testimonials",
              ].map((item) => (
                <Typography
                  key={item}
                  component="a"
                  href="#"
                  sx={{
                    px: 3,
                    py: 2,
                    color: "gray",
                    borderRadius: "110px",
                    textDecoration: "none",
                    "&:hover": { bgcolor: "#4e4e4e", color: "#fff" },
                  }}
                >
                  {item}
                </Typography>
              ))}

              {/* Search */}
              <Stack
                direction="row"
                alignItems="center"
                sx={{
                  bgcolor: "#4e4e4e",
                  borderRadius: "74px",
                  px: 2,
                  ml: 2,
                  width: 200,
                }}
              >
                <SearchIcon sx={{ color: "#fff", mr: 1 }} />
                <InputBase
                  placeholder="Search"
                  sx={{ color: "#fff", flex: 1 }}
                />
              </Stack>

              {/* Cart */}
              <IconButton
                sx={{
                  bgcolor: "#4e4e4e",
                  borderRadius: "32px",
                  p: 1.5,
                  ml: 2,
                  "&:hover": { bgcolor: "#333" },
                }}
              >
                <ShoppingBagIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Stack>

            {/* Login/Create Account */}
        
{/* Login/Create Account OR Welcome, User */}
{user ? (
  <>
    <Button
      onClick={handleMenuOpen}
      endIcon={<ArrowForwardIcon />}
      sx={{
        borderRadius: "58px",
        bgcolor: "#fff",
        px: 3,
        py: 1.5,
        color: "#000",
        border: "1px solid black",
        "&:hover": {
          bgcolor: "#000",
          color: "#fff",
        },
      }}
    >
      {`Welcome, ${user.name}`}
    </Button>

    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate("/dashboard");   // ✅ go to dashboard page
        }}
      >
        Dashboard
      </MenuItem>

      <MenuItem
        onClick={() => {
          handleMenuClose();
          toast("Profile page coming soon 🚀");
        }}
      >
        Profile
      </MenuItem>

      <MenuItem
        onClick={() => {
          handleMenuClose();
          handleLogout();
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  </>
) : (
  <Button
    onClick={() => setOpenModal("login")}
    endIcon={<ArrowForwardIcon />}
    sx={{
      borderRadius: "58px",
      bgcolor: "#fff",
      px: 3,
      py: 1.5,
      color: "#000",
      border: "1px solid black",
      "&:hover": {
        bgcolor: "#000",
        color: "#fff",
      },
    }}
  >
    Login / Create Account
  </Button>
)}






          </Stack>
        </Container>
      </Box>

      {/* Banner Section */}
      <Box
        sx={{
          bgcolor: "#d7d7d7",
          minHeight: "100vh",
          pt: { xs: 10, md: 28 },
          pb: 8,
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", md: "5rem", lg: "7rem" },
              textTransform: "capitalize",
              mb: 6,
            }}
          >
            fuel your body,
            <br />
            transform your life.
          </Typography>

          <Button
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderRadius: "58px",
              bgcolor: "#fff",
              px: 3,
              py: 1.5,
              color: "#000",
              mb: 10,
              "&:hover": {
                boxShadow: "0px 0px 20px 10px gray",
                background:
                  "linear-gradient(90deg, rgba(42,123,155,1) 0%, rgba(87,199,133,1) 50%, rgba(237,221,83,1) 100%)",
                color: "#fff",
              },
            }}
          >
            Button Label
          </Button>

          {/* Cards */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            {[1, 2].map((item) => (
              <Box
                key={item}
                sx={{
                  flex: 1,
                  bgcolor: "#fff",
                  borderRadius: "49px",
                  p: 3,
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <Box
                  component="img"
                  src="/frame.png"
                  alt="card"
                  sx={{ width: { xs: "100%", md: "40%" }, borderRadius: 2 }}
                />
                <Box sx={{ ml: { md: 4 }, mt: { xs: 2, md: 0 } }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Smart Food Logging
                  </Typography>
                  <Typography sx={{ color: "gray", mb: 2 }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Mollitia distinctio laborum molestias officia nam!
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: "58px",
                      borderColor: "#000",
                      color: "#000",
                      "&:hover": {
                        background:
                          "linear-gradient(90deg, rgba(42,123,155,1) 0%, rgba(87,199,133,1) 50%, rgba(237,221,83,1) 100%)",
                        color: "#fff",
                      },
                    }}
                  >
                    Explore More
                  </Button>
                </Box>
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* About Section */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth="xl">
          <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
            <Typography
              sx={{
                writingMode: { md: "vertical-rl" },
                transform: { md: "rotate(180deg)" },
                fontWeight: "bold",
              }}
            >
              Digital Agency
            </Typography>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h2" sx={{ mb: 4 }}>
                Who We Are
              </Typography>
              <Typography sx={{ color: "gray" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit...
              </Typography>
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h3">300+</Typography>
              <Typography sx={{ mb: 2 }}>Successful Projects</Typography>
              <Button
                endIcon={<ArrowForwardIcon />}
                sx={{
                  borderRadius: "58px",
                  border: "1px solid black",
                  color: "#000",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, rgba(42,123,155,1) 0%, rgba(87,199,133,1) 50%, rgba(237,221,83,1) 100%)",
                    color: "#fff",
                  },
                }}
              >
                Let’s Discuss
              </Button>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Journey Section */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box component="img" src="/frame12.png" alt="" sx={{ width: 80 }} />
              <Typography variant="h2">Elevates</Typography>
              <Button
                sx={{
                  borderRadius: "58px",
                  border: "1px solid black",
                  color: "#000",
                  ml: "auto",
                  "&:hover": {
                    background:
                      "linear-gradient(90deg, rgba(42,123,155,1) 0%, rgba(87,199,133,1) 50%, rgba(237,221,83,1) 100%)",
                    color: "#fff",
                  },
                }}
              >
                Explore Diet Plans
              </Button>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="h2">your fitness journey</Typography>
              <Box component="img" src="/frame10.png" alt="" sx={{ width: 80 }} />
            </Stack>
            <Typography variant="h2">
              with smart tracking and expert tips
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Expert Section */}
      <Box sx={{ bgcolor: "#ededed", py: 8 }}>
        <Container maxWidth="xl">
          <Stack direction={{ xs: "column", md: "row" }} spacing={6}>
            <Box sx={{ flex: 1 }}>
              <Typography fontWeight="bold" sx={{ mb: 2 }}>
                Why Choose Us
              </Typography>
              <Typography variant="h2" sx={{ mb: 4 }}>
                our experts marketing solutions
              </Typography>
              <Typography sx={{ mb: 4 }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit...
              </Typography>
              {[
                "marketing plans crafted to match your unique goals",
                "creative solutions that set your brand apart",
                "proven methods that deliver results",
              ].map((text, i) => (
                <Stack direction="row" alignItems="center" spacing={2} key={i}>
                  <CheckCircleOutlineIcon />
                  <Typography>{text}</Typography>
                </Stack>
              ))}
            </Box>
              
            <Box
              sx={{
                flex: 1,
                bgcolor: "#fff",
                borderRadius: "40px",
                p: 6,
              }}
            >
              <Box
                sx={{
                  bgcolor: "#d7d7d7",
                  borderRadius: "40px",
                  textAlign: "center",
                  p: 4,
                }}
              >
                <Typography variant="h2">90%</Typography>
                <Typography variant="h4" sx={{ mb: 4 }}>
                  extra growth
                </Typography>
                <Box sx={{ bgcolor: "#fff", borderRadius: "30px", p: 3 }}>
                  <Typography variant="h5">grow revenue</Typography>
                  <Typography>we will grow your business</Typography>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Trainers Section */}
      <Box sx={{ py: 8, px: { xs: 2, md: 10 } }}>
        <Container maxWidth="xl">
          <Typography fontWeight="bold" sx={{ mb: 2 }}>
            Why Choose Us
          </Typography>
          <Typography variant="h2" sx={{ mb: 2 }}>
            most popular trainers
          </Typography>
          <Typography sx={{ mb: 6 }}>
            train with world-class fitness coaches, handpicked to guide you
          </Typography>
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="space-between"
            spacing={4}
          >
            {[1, 2, 3, 4, 5].map((t) => (
              <Box
                key={t}
                sx={{
                  border: "1px solid black",
                  borderRadius: "20px",
                  p: 3,
                  textAlign: "center",
                  width: { xs: "100%", sm: "45%", md: "18%" },
                  "&:hover": {
                    boxShadow: "0 0 30px 3px",
                    transform: "scale(1.1)",
                    transition: "0.3s ease",
                  },
                }}
              >
                <Box
                  component="img"
                  src="/trainer.png"
                  alt="trainer"
                  sx={{ mb: 2 }}
                />
                <Typography variant="h6">Full Name</Typography>
                <Typography color="gray">Designation</Typography>
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
