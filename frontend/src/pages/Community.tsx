import React from "react";
import CommunityTabs from "../components/CommunityTabs";
import { useNavigate } from "react-router-dom";
import { DummyProfile } from "../data/dummyUserProfile";

const Community: React.FC = () => {

  const currentUser: DummyProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const navigate = useNavigate();
  
    if (!currentUser) {
      navigate('/login');
    }

  return (
    <>
      <CommunityTabs />
    </>
  );
};

export default Community;
