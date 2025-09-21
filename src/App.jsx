// src/App.jsx
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./sharemodule/Approutes";

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
