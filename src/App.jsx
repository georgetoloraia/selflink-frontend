import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import SoulMatch from "./pages/SoulMatch.jsx";
import Mentor from "./pages/Mentor.jsx";
import GrowthPath from "./pages/GrowthPath.jsx";
import Courses from "./pages/Courses.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";

const App = () => (
  <Routes>
    <Route element={<AppLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/soul-match" element={<SoulMatch />} />
      <Route path="/mentor" element={<Mentor />} />
      <Route path="/growth-path" element={<GrowthPath />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/privacy" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default App;
