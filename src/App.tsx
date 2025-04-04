import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Community from "./pages/community"; // Import the Community component
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateProfile from "./pages/CreateProfile";
import Profile from "./pages/Profile";
import Home from "./pages/Home"; // dashboard
import { UserProfileProvider } from "./context/UserProfileContext";
import { AuthProvider } from "./context/AuthContext";

import './App.css';

function App() {

  return (
     <AuthProvider>
      <UserProfileProvider>
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/community">Community</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </ul>
          </nav>
          {/* Define routes */}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile-setup" element={<CreateProfile />} />
            <Route path="/community" element={<Community />} />{" "}
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </UserProfileProvider>
    </AuthProvider>
  );
}

export default App;
