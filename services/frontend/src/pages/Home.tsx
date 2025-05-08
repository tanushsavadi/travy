import React, { Suspense, useEffect, useState } from "react";
import Map from "../components/Map";
import Filter from "../components/Filter";
import "../common/InputField.css";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { mockLocations } from "../data/MockLocations";

const TransportOptions = React.lazy(
  () => import("../components/TransportOptions")
);

interface FilterOptions {
  location: string;
  transport: string[];
  price: { min: number; max: number };
  travelTime: { minHours: number; maxHours: number };
}

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [filters, setFilters] = useState<FilterOptions | null>(null);
  const [destination, setDestination] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const locationNames = mockLocations.map((location) => location.name);

  // Load user profile from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCurrentUser(parsed);
      } catch (e) {
        console.error("❌ Failed to parse userProfile:", e);
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Initialize filters based on user preferences
  useEffect(() => {
    if (currentUser) {
      setFilters({
        location: "",
        transport: currentUser.transportModes || [
          "Car",
          "Bus",
          "Train",
          "Flight",
        ],
        price: { min: 0, max: currentUser.budget || 1000 },
        travelTime: { minHours: 0, maxHours: 24 },
      });
    }
  }, [currentUser]);

  const handleSubmit = () => {
    if (!inputValue) {
      alert("Please enter a location.");
      return;
    }

    setDestination(inputValue);
    setFilters((prev) =>
      prev
        ? {
            ...prev,
            location: inputValue,
          }
        : null
    );
    setSubmitted(true);
  };

  if (!currentUser || !filters) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="text-white">
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          width: "60%",
          margin: "auto",
          ...(window.innerWidth <= 768 && { width: "100%", margin: "0" }),
        }}
      >
        <Map destination={destination} setDestination={setDestination} />
      </div>

      <div
        style={{
          overflowY: "auto",
          width: "80%",
          margin: "0 auto",
          textAlign: "center",
          ...(window.innerWidth <= 768 && { width: "100%" }),
        }}
      >
        <h1 className="text-xl sm:text-3xl font-bold mb-1">
          Welcome{currentUser.name ? `, ${currentUser.name}` : ""}
        </h1>

        <p className="mb-4 text-md">Enter your destination to find rides!</p>

        <Autocomplete
          disablePortal
          options={locationNames}
          sx={{
            width: 300,
            margin: "0 auto",
            padding: 0,
            textColor: "white",
            marginBottom: "0.75rem",
            "& label": { color: "white" },
            "& label.Mui-focused": { color: "white" },
            ".MuiAutocomplete-input": { color: "white" },
            ".MuiSvgIcon-root": { color: "#7ac59b" },
          }}
          className="input-field mb-2"
          renderInput={(params) => (
            <TextField {...params} label="Enter Location" />
          )}
          onChange={(_, value) => setInputValue(value || "")}
        />

        <div style={{ margin: "auto", width: "100%", maxWidth: "600px" }}>
          <Filter filters={filters} setFilters={setFilters} />
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>

        {submitted && (
          <div
            style={{ margin: "1rem auto", width: "100%", maxWidth: "600px" }}
          >
            <Suspense fallback={<div className="loading">Loading...</div>}>
              <TransportOptions filters={filters} />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
