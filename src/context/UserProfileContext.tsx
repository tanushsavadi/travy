import { createContext, useContext, useState, useEffect } from "react";

type UserProfile = {
  fullName: string;
  university: string;
  transportModes: string[];
  budget: string;
  destinations: string[];
  ridesharePreference: string[];
  email: string;
  password: string;
};

type ProfileContextType = {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  resetProfile: () => void;
};

const defaultProfile: UserProfile = {
  fullName: "",
  university: "",
  transportModes: [],
  budget: "",
  destinations: [""],
  ridesharePreference: [],
  email: "",
  password: "",
};

const UserProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("userProfile");
    return saved ? JSON.parse(saved) : defaultProfile;
  });

  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const resetProfile = () => {
    setProfile(defaultProfile);
    localStorage.setItem("userProfile", JSON.stringify(defaultProfile));
  };

  return (
    <UserProfileContext.Provider value={{ profile, updateProfile, resetProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) throw new Error("useUserProfile must be used within UserProfileProvider");
  return context;
};
