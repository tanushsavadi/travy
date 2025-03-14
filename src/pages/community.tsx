import React from "react";
import "../styling/community.css"
import SimpleTabs from "../components/communityTabs";
import SearchBar from "../components/searchBar";

const Community = () => {
  return (
    <div>
      <SearchBar />
      <SimpleTabs />
    </div>
  );
};

export default Community;
