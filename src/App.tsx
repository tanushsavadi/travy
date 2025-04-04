import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Suspense, lazy } from "react";

import { UserProfileProvider } from "./context/UserProfileContext";
import { AuthProvider } from "./context/AuthContext";
import './App.css';

// Lazy-load route components
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const CreateProfile = lazy(() => import("./pages/CreateProfile"));
const Community = lazy(() => import("./pages/community"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  return (
    <AuthProvider>
      <UserProfileProvider>
        <Router>
          <nav style={{ height: "50px" }}>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/community">Community</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </nav>

          {/* Suspense fallback UI while components are loading */}
          <Suspense fallback={<div className="text-white text-center mt-10">Loading...</div>}>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile-setup" element={<CreateProfile />} />
              <Route path="/community" element={<Community />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Suspense>
        </Router>
      </UserProfileProvider>
    </AuthProvider>
  );
}

export default App;
