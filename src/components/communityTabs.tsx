import React, { useState } from "react";
import "../styling/CommunityTabs.css";
import createPostIcon from "../assets/createPost.png";
import CreatePost from "./CreatePost";
import SearchBar from "./searchBar";
import ListedPost from "./ListedPost";
import { mockPosts } from "../data/mockPosts";

const SimpleTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"offers" | "requests">("offers");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleShowCreatePost = () => {
    setShowCreatePost(!showCreatePost);
  };

  // Filter posts based on active tab and search query
  const filteredPosts = mockPosts
    .filter((post) =>
      activeTab === "offers" ? post.type === "offer" : post.type === "request"
    )
    .filter(
      (post) =>
        post.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.user.university
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        <div
          className={`tab ${activeTab === "offers" ? "active" : ""}`}
          onClick={() => setActiveTab("offers")}
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
          className={`tab ${activeTab === "requests" ? "active" : ""}`}
          onClick={() => setActiveTab("requests")}
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
          onCreate={(newPost) => {
            // In a real app, you would add to your state management here
            console.log("New post created:", newPost);
          }}
        />
      )}
    </div>
  );
};

export default SimpleTabs;
