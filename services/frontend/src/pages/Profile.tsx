import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient"; // adjust path if needed

interface UserProfile {
  id: number;
  email: string;
  name: string;
  university: string;
  transportModes: string[] | null;
  budget: number;
  preferredDests: string[] | null;
  ridesharePreferences: string[] | null;
  user_id: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Get session + fetch profile from backend
  useEffect(() => {
    const getProfile = async () => {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;

      if (!userId) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`/api/profile/${userId}`);
        if (!res.ok) throw new Error("Profile fetch failed");
        const data = await res.json();
        setProfile(data);
      } catch (err: any) {
        console.error("❌ Error fetching profile:", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [navigate]);

  const handleChange = (field: keyof UserProfile, value: any) => {
    setProfile((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSave = async () => {
    if (!profile) return;

    try {
      const res = await fetch(`/api/profile/${profile.user_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (!res.ok) throw new Error("Save failed");
      alert("✅ Profile updated");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update profile");
    }
  };

  if (loading)
    return <p className="text-white text-center mt-10">Loading profile...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="text-white max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <label className="block mb-2">
        Full Name:
        <input
          className="w-full text-black p-2 mt-1 rounded"
          value={profile?.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </label>

      <label className="block mb-2">
        University:
        <input
          className="w-full text-black p-2 mt-1 rounded"
          value={profile?.university || ""}
          onChange={(e) => handleChange("university", e.target.value)}
        />
      </label>

      <label className="block mb-2">
        Budget:
        <input
          type="number"
          className="w-full text-black p-2 mt-1 rounded"
          value={profile?.budget || 0}
          onChange={(e) => handleChange("budget", parseInt(e.target.value))}
        />
      </label>

      <label className="block mb-2">
        Transport Modes:
        <input
          className="w-full text-black p-2 mt-1 rounded"
          placeholder="Comma-separated (e.g., Car,Bus)"
          value={profile?.transportModes?.join(", ") || ""}
          onChange={(e) =>
            handleChange(
              "transportModes",
              e.target.value.split(",").map((v) => v.trim())
            )
          }
        />
      </label>

      <button
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded mt-4"
        onClick={handleSave}
      >
        Save Changes
      </button>
    </div>
  );
};

export default Profile;
