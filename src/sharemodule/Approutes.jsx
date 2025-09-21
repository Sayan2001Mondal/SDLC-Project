import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/user/DashBoard"; // (watch spelling "Dashboard")
import Goals from "../pages/user/Goals";
import DailyLogs from "../pages/user/Dailylogs";
import AuthModals from "../sharemodule/AuthModals";

export default function AppRoutes() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [openModal, setOpenModal] = useState(null);

  return (
    <>
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <Home user={user} setUser={setUser} setOpenModal={setOpenModal} />
          }
        />

        {/* Dashboard + nested routes */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard />
            ) : (
              <Home user={user} setUser={setUser} setOpenModal={setOpenModal} />
            )
          }
        >
          {/* Nested children inside Dashboard’s <Outlet /> */}
          <Route path="goals" element={<Goals />} />
          <Route path="logs" element={<DailyLogs />} />
        </Route>
      </Routes>

      {/* Global Modals */}
      <AuthModals
        openModal={openModal}
        setOpenModal={setOpenModal}
        setUser={setUser}
      />
    </>
  );
}
