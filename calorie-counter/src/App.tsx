import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LogFood from "./pages/LogFood";
import Register from "./pages/Register";
import Scan from "./pages/Scan";
import ConfirmFood from "./pages/ConfirmFood";
import Targets from "./pages/Targets";
import ManualFood from "./pages/ManualFood";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logfood" element={<LogFood />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/confirm" element={<ConfirmFood />} />
        <Route path="/targets" element={<Targets />} />
        <Route path="/manual" element={<ManualFood />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
