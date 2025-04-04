import React from "react";
import SimpleTabs from "../components/communityTabs";

const Community: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl pb-2 font-semibold" style={{color: '#7ac59b'}}>Community</h1>
      <SimpleTabs />
    </div>
  );
};

export default Community;
