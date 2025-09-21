// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, children }) {
  if (!user) {
    // Not logged in → redirect to homepage
    return <Navigate to="/" replace />;
  }
  return children;
}
