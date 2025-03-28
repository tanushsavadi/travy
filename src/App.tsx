import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateProfile from "./pages/CreateProfile";
import { UserProfileProvider } from "./context/UserProfileContext";

function App() {
  return (
    <UserProfileProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile-setup" element={<CreateProfile />} />
        </Routes>
      </Router>
    </UserProfileProvider>
  );
}

export default App;
