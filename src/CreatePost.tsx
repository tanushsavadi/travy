import React, { useEffect } from "react";
import InputField from "./common/InputField.tsx";
import SelectField from "./common/SelectField.tsx";
import TextAreaField from "./common/TextAreaField.tsx";
import "./CreatePost.css";

interface CreatePostProps {
  onClose: () => void;
  activeTab: "offers" | "requests"; 
}

const maxPassengerOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];


const CreatePost: React.FC<CreatePostProps> = ({ onClose, activeTab }) => {
  const [rideType, setRideType] = React.useState<"offer" | "request">("offer");

  // Update rideType based on activeTab
  useEffect(() => {
    if (activeTab === "offers") {
      setRideType("offer");
    } else if (activeTab === "requests") {
      setRideType("request");
    }
  }, [activeTab]); 

  return (
    <div className="overlay">
      <div className="content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2 style={{ marginTop: "0", marginBottom: "1.25em" }}>Create Post</h2>
        <form className="form">
          <div className="offer-request-container">
            <input
              type="radio"
              id="offer"
              name="ride-type"
              checked={rideType === "offer"}
              onChange={() => setRideType("offer")}
              className="ride-type-input"
            />
            <label className="offer-request-tab" htmlFor="offer">
              Offering a Ride
            </label>
            <input
              type="radio"
              id="request"
              name="ride-type"
              checked={rideType === "request"}
              onChange={() => setRideType("request")}
              className="ride-type-input"
            />
            <label className="offer-request-tab" htmlFor="request">
              Requesting a Ride
            </label>
          </div>

          <InputField label="Title:" type="text" required />

          <div
            style={{
              display: "flex",
              gap: "1em",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <InputField label="Pets Allowed" type="checkbox" required />
            <SelectField
              label="Max Passengers"
              options={maxPassengerOptions}
              required
            />
            <InputField label="Same Gender" type="checkbox" required />
          </div>

          <TextAreaField label="Content:" required />

          <button style={{ marginTop: "1em" }} type="submit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
