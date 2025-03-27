import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Community from "./pages/Community"; // Import the Community component

function Home() {
  return (
    <div>
      <h2>Home Page</h2>
      <p>Welcome to the home page!</p>
    </div>
  );
}

function Profile() {
  return (
    <div>
      <h2>Profile Page</h2>
      <p>Welcome to the profile page!</p>
    </div>
  );
}

function App() {

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
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
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<Community />} />{" "}
        {/* Update the route for the Community page */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
