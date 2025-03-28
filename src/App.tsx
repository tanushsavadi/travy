import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateProfile from "./pages/CreateProfile";
import Home from "./pages/Home"; // dashboard
import { UserProfileProvider } from "./context/UserProfileContext";
import { AuthProvider } from "./context/AuthContext";
import './App.css';

function App() {
  return (
    <AuthProvider>
      <UserProfileProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile-setup" element={<CreateProfile />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </UserProfileProvider>
    </AuthProvider>
  );
}

export default App;
