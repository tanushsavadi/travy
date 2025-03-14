import React, { useState } from "react";
import "./communityTabs.css";
import createPostIcon from "./assets/createPost.png"; 
import CreatePost from "./CreatePost";

const SimpleTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"offers" | "requests">("offers");
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleShowCreatePost = () => {
    setShowCreatePost(!showCreatePost);
  };

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        <div
          className={`tab ${activeTab === "offers" ? "active" : ""}`}
          onClick={() => setActiveTab("offers")}
        >
          <span>Offers</span>
          <button className="create-post-button" onClick={handleShowCreatePost}>
            <img
              src={createPostIcon}
              alt="Create Post"
              className="create-post-icon"
            />
          </button>
        </div>
        <div
          className={`tab ${activeTab === "requests" ? "active" : ""}`}
          onClick={() => setActiveTab("requests")}
        >
          <span>Requests</span>
          <button className="create-post-button" onClick={handleShowCreatePost}>
            <img
              src={createPostIcon}
              alt="Create Post"
              className="create-post-icon"
            />
          </button>
        </div>
      </div>
      <div className="tab-content"></div>
      {showCreatePost && (
        <CreatePost onClose={handleShowCreatePost} activeTab={activeTab} />
      )}
    </div>
  );
};

export default SimpleTabs;
