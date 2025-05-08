import React, { useState } from "react";
import "../styling/CommunityTabs.css";
import createPostIcon from "../assets/createPost.png";
import CreatePost from "./CreatePost";
import SearchBar from "./SearchBar";
import ListedPost from "./ListedPost";
import { mockPosts } from "../data/mockPosts";

const CommunityTabs: React.FC = () => {

  const [activeTab, setActiveTab] = useState<"offer" | "request">("offer");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleShowCreatePost = () => {
    setShowCreatePost(!showCreatePost);
  };

  // Filter posts based on active tab and search query
  const filteredPosts = mockPosts
    .filter((post) =>
      activeTab === "offer" ? post.type === "offer" : post.type === "request"
    )
    .filter(
      (post) =>
        post.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.user.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        <div
          className={`tab ${activeTab === "offer" ? "active" : ""}`}
          onClick={() => setActiveTab("offer")}
        >
          <span>Offers</span>
          <button
            className="create-post-button"
            onClick={(e) => {
              e.stopPropagation();
              handleShowCreatePost();
            }}
            aria-label="Create post"
          >
            <img
              src={createPostIcon}
              alt="Create Post"
              className="create-post-icon"
            />
          </button>
        </div>
        <div
          className={`tab ${activeTab === "request" ? "active" : ""}`}
          onClick={() => setActiveTab("request")}
        >
          <span>Requests</span>
          <button
            className="create-post-button"
            onClick={(e) => {
              e.stopPropagation();
              handleShowCreatePost();
            }}
            aria-label="Create post"
          >
            <img
              src={createPostIcon}
              alt="Create Post"
              className="create-post-icon"
            />
          </button>
        </div>
      </div>

      <SearchBar
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        placeholder={`Search ${activeTab}...`}
      />

      <div className="tab-content">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <ListedPost key={post.id} post={post} />)
        ) : (
          <div
            style={{
              color: "#aaa",
              textAlign: "center",
              padding: "2em",
              fontStyle: "italic",
            }}
          >
            No {activeTab} found
            {mockPosts.length > 0 ? " matching your search" : ""}
          </div>
        )}
      </div>

      {showCreatePost && (
        <CreatePost
          onClose={handleShowCreatePost}
          activeTab={activeTab}
        />
      )}
    </div>
  );
};

export default CommunityTabs;
