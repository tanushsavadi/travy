import React from "react";
import SimpleTabs from "../components/communityTabs";
import { useNavigate } from "react-router-dom";
import { DummyProfile } from "../data/dummyUserProfile";

const Community: React.FC = () => {

  const currentUser: DummyProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const navigate = useNavigate();
  
    if (!currentUser) {
      navigate('/login');
    }

  return (
    <div>
      <h1 className="text-3xl pb-2 font-semibold" style={{color: '#7ac59b'}}>Community</h1>
      <SimpleTabs />
    </div>
  );
};

export default Community;
